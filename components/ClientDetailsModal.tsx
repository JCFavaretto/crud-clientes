// components/ClientDetailsModal.tsx
import React from "react";
import Modal from "./Modal";
import { formatDateFromFirebaseTimestamp } from "@/utils/functions";
import { ClientDetailsModalProps } from "../types/Client";

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  client,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-primary">Detalles del Cliente</h2>
      <div className="flex flex-col gap-4 mt-4 mb-3">
        <p>
          <strong>Nombre:</strong> {client.name}
        </p>
        <p>
          <strong>Teléfono:</strong> {client.phone}
        </p>
        {client.email && (
          <p>
            <strong>Email:</strong> {client.email}
          </p>
        )}
        {client.nacimiento && (
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {formatDateFromFirebaseTimestamp(
              typeof client.nacimiento === "string"
                ? new Date(client.nacimiento)
                : client.nacimiento.toDate()
            )}
          </p>
        )}
        {client.dni && (
          <p>
            <strong>DNI:</strong> {client.dni}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Cerrar
      </button>
    </Modal>
  );
};

export default ClientDetailsModal;
