// components/ConfirmationModal.tsx
import { ConfirmationModalProps } from "@/types/Client";
import Modal from "./Modal";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-primary my-4">Confirmación</h2>
      <p>{message}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white p-2 rounded"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
