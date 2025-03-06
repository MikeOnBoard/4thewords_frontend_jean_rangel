import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LegendFormData } from '../types';
import { createLegend } from '../api/legends';
import LegendForm from '../components/legends/LegendForm';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const CreateLegend: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LegendFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createLegend(data);
      navigate('/');
    } catch (err) {
      setError('Error al crear la leyenda. Por favor, intente de nuevo.');
      console.error('Error creating legend:', err);
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
        <h1 className="text-2xl font-bold mb-6">Crear Nueva Leyenda</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <LegendForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateLegend;