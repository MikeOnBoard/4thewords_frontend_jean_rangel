import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Legend, FilterParams } from '../types';
import { fetchLegends, deleteLegend } from '../api/legends';
import LegendCard from '../components/legends/LegendCard';
import LegendFilter from '../components/legends/LegendFilter';
import DeleteConfirmationModal from '../components/legends/DeleteConfirmationModal';
import Button from '../components/ui/Button';
import { PlusCircle } from 'lucide-react';

const LegendList: React.FC = () => {
  const navigate = useNavigate();
  const [legends, setLegends] = useState<Legend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; legendId: number | null; legendTitle: string }>({
    isOpen: false,
    legendId: null,
    legendTitle: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLegends = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchLegends(filters);
        if (isMounted) {
          setLegends(data);
        }
      } catch {
        if (isMounted) {
          setError('Error al cargar las leyendas. Por favor, intente de nuevo.');
          setLegends([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLegends();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleFilter = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    const legend = legends.find(l => l.id === id);
    if (legend) {
      setDeleteModal({
        isOpen: true,
        legendId: id,
        legendTitle: legend.title
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.legendId) return;

    setIsDeleting(true);
    try {
      await deleteLegend(deleteModal.legendId);
      setLegends(prevLegends =>
        prevLegends.filter(legend => legend.id !== deleteModal.legendId)
      );
      setDeleteModal({ isOpen: false, legendId: null, legendTitle: '' });
    } catch {
      setError('Error al eliminar la leyenda. Por favor, intente de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Leyendas Costarricenses</h1>
        <Button onClick={() => navigate('/create')}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Nueva Leyenda
        </Button>
      </div>

      <LegendFilter onFilter={handleFilter} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : legends.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No se encontraron leyendas</h2>
          <p className="text-gray-600 mb-4">
            {error ? 'Ocurrió un error al cargar las leyendas.' : 'No hay leyendas que coincidan con los filtros aplicados o aún no se han agregado leyendas.'}
          </p>
          <Button onClick={() => navigate('/create')}>
            Crear Nueva Leyenda
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legends.map(legend => (
            <LegendCard
              key={legend.id}
              legend={legend}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, legendId: null, legendTitle: '' })}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        legendTitle={deleteModal.legendTitle}
      />
    </div>
  );
};

export default LegendList;