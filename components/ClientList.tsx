// components/ClientList.tsx
import { FC } from "react";
import { Client, ClientListProps } from "../types/Client";

const ClientList: FC<ClientListProps> = ({
  clients,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-primary">
        Lista de Clientes
      </h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b text-center">
              <td className="py-2 px-4">{client.name}</td>
              <td className="py-2 px-4">{client.email}</td>
              <td className="py-2 px-4">{client.phone}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  onClick={() => onView(client)}
                  className="bg-green-500 text-white p-1 rounded"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(client)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(client.id || "")}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
