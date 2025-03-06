import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LegendFormData, Legend } from '../../types';
import { categories, provinces } from '../../api/mockData';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import FileInput from '../ui/FileInput';
import Button from '../ui/Button';

interface LegendFormProps {
  initialData?: Legend;
  onSubmit: (data: LegendFormData) => Promise<void>;
  isSubmitting: boolean;
}

const LegendForm: React.FC<LegendFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting
}) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [cantons, setCantons] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LegendFormData>({
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      category: initialData.category,
      province: initialData.province,
      canton: initialData.canton,
      district: initialData.district,
      imageUrl: initialData.imageUrl
    } : {}
  });

  const selectedProvince = watch('province');
  const selectedCanton = watch('canton');

  // Simulate fetching cantons based on province
  useEffect(() => {
    if (selectedProvince) {
      // In a real app, this would be an API call
      const mockCantons = [
        `${selectedProvince} Central`,
        `${selectedProvince} Norte`,
        `${selectedProvince} Sur`,
        `${selectedProvince} Este`,
        `${selectedProvince} Oeste`
      ];
      setCantons(mockCantons);

      // Reset canton and district when province changes
      if (!initialData || initialData.province !== selectedProvince) {
        setValue('canton', '');
        setValue('district', '');
      }
    } else {
      setCantons([]);
    }
  }, [selectedProvince, setValue, initialData]);

  // Simulate fetching districts based on canton
  useEffect(() => {
    if (selectedCanton) {
      // In a real app, this would be an API call
      const mockDistricts = [
        `${selectedCanton} 1`,
        `${selectedCanton} 2`,
        `${selectedCanton} 3`
      ];
      setDistricts(mockDistricts);

      // Reset district when canton changes
      if (!initialData || initialData.canton !== selectedCanton) {
        setValue('district', '');
      }
    } else {
      setDistricts([]);
    }
  }, [selectedCanton, setValue, initialData]);

  const handleFormSubmit = async (data: LegendFormData) => {
    const formData = {
      ...data,
      image: selectedImage
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Título"
        fullWidth
        {...register('title', { required: 'El título es requerido' })}
        error={errors.title?.message}
      />

      <TextArea
        label="Descripción"
        fullWidth
        {...register('description', { required: 'La descripción es requerida' })}
        error={errors.description?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Categoría"
          options={categories.map(cat => ({ value: cat, label: cat }))}
          fullWidth
          {...register('category', { required: 'La categoría es requerida' })}
          error={errors.category?.message}
        />

        <Select
          label="Provincia"
          options={provinces.map(prov => ({ value: prov, label: prov }))}
          fullWidth
          {...register('province', { required: 'La provincia es requerida' })}
          error={errors.province?.message}
        />

        <Select
          label="Cantón"
          options={cantons.map(canton => ({ value: canton, label: canton }))}
          fullWidth
          disabled={!selectedProvince}
          {...register('canton', { required: 'El cantón es requerido' })}
          error={errors.canton?.message}
        />

        <Select
          label="Distrito"
          options={districts.map(district => ({ value: district, label: district }))}
          fullWidth
          disabled={!selectedCanton}
          {...register('district', { required: 'El distrito es requerido' })}
          error={errors.district?.message}
        />
      </div>

      <FileInput
        label="Imagen"
        onChange={(file) => setSelectedImage(file ?? undefined)}
        previewUrl={initialData?.imageUrl}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {initialData ? 'Actualizar Leyenda' : 'Crear Leyenda'}
        </Button>
      </div>
    </form>
  );
};

export default LegendForm;