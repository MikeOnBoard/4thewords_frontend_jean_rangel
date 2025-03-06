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
    const loadLegend = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await fetchLegendById(parseInt(id));
        setLegend(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching legend:', error);
        setError('No se pudo cargar la leyenda. Por favor, intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLegend();
  }, [id]);
  
  const handleSubmit = async (data: LegendFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateLegend(parseInt(id), data);
      navigate('/');
    } catch (error) {
      console.error('Error updating legend:', error);
      setError('No se pudo actualizar la leyenda. Por favor, intenta de nuevo.');
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => navigate('/')}>
              Volver a la lista
            </Button>
          </div>
        ) : legend ? (
          <LegendForm
            initialData={legend}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No se encontró la leyenda.</p>
            <Button onClick={() => navigate('/')}>
              Volver a la lista
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditLegend;