import React from 'react';
import { useForm } from 'react-hook-form';
import { FilterParams } from '../../types';
import { categories, provinces } from '../../api/mockData';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface LegendFilterProps {
  onFilter: (filters: FilterParams) => void;
}

const LegendFilter: React.FC<LegendFilterProps> = ({ onFilter }) => {
  const { register, handleSubmit, reset } = useForm<FilterParams>();

  const handleFilter = (data: FilterParams) => {
    const filters = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== '')
    );

    onFilter(filters);
  };

  const handleReset = () => {
    reset();
    onFilter({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <form onSubmit={handleSubmit(handleFilter)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Título"
            placeholder="Buscar por título..."
            {...register('title')}
          />

          <Select
            label="Categoría"
            options={categories.map(cat => ({ value: cat, label: cat }))}
            {...register('category')}
          />

          <Select
            label="Provincia"
            options={provinces.map(prov => ({ value: prov, label: prov }))}
            {...register('province')}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
          >
            Limpiar
          </Button>

          <Button
            type="submit"
          >
            Aplicar Filtros
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LegendFilter;