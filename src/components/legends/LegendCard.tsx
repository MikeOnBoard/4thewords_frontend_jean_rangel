import React from 'react';
import { Legend } from '../../types';
import { formatRelativeDate } from '../../api/mockData';
import Button from '../ui/Button';

interface LegendCardProps {
  legend: Legend;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LegendCard: React.FC<LegendCardProps> = ({ legend, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={legend.imageUrl}
          alt={legend.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{legend.title}</h3>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {legend.category}
          </span>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {legend.province}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {legend.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {legend.createdAt ? formatRelativeDate(legend.createdAt) : 'Fecha desconocida'}
          </span>


          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(legend.id)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(legend.id)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegendCard;