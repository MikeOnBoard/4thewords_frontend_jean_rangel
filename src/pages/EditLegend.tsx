import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Legend, LegendFormData } from '../types';
import { fetchLegendById, updateLegend } from '../api/legends';
import LegendForm from '../components/legends/LegendForm';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const EditLegend: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [legend, setLegend] = useState<Legend | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLegend = async () => {
      if (!id || !isMounted) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchLegendById(parseInt(id));
        if (isMounted) {
          setLegend(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar la leyenda. Por favor, intente de nuevo.');
          console.error('Error fetching legend:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLegend();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (data: LegendFormData) => {
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await updateLegend(parseInt(id), data);
      navigate('/');
    } catch (err) {
      setError('Error al actualizar la leyenda. Por favor, intente de nuevo.');
      console.error('Error updating legend:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Volver
      </Button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Editar Leyenda</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !legend ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No se encontró la leyenda.</p>
            <Button onClick={() => navigate('/')}>
              Volver a la lista
            </Button>
          </div>
        ) : (
          <LegendForm
            initialData={legend}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default EditLegend;