// components/ClientDetailsModal.tsx
import React from "react";
import { ClientDetailsModalProps } from "../types/Client";

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  client,
}) => {
  if (!isOpen) return null;

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-primary">Detalles del Cliente</h2>
        <div className="space-y-2">
          <p>
            <strong>Nombre:</strong> {client.name}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {formatDate(
              typeof client.nacimiento === "string"
                ? new Date(client.nacimiento)
                : client.nacimiento.toDate()
            )}
          </p>
          <p>
            <strong>Teléfono:</strong> {client.phone}
          </p>
          <p>
            <strong>DNI:</strong> {client.dni}
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
