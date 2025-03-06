import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  legendTitle: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  legendTitle
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      footer={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Eliminar
          </Button>
        </>
      }
    >
      <div className="text-center py-4">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <p className="mt-4 text-lg font-semibold">
          ¿Estás seguro de eliminar esta leyenda?
        </p>
        <p className="mt-2 text-gray-600">
          <span className="font-medium">"{legendTitle}"</span> será eliminada permanentemente.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Esta acción no se puede deshacer.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;