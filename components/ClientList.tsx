// components/ClientList.tsx
import { FC } from "react";
import { ClientListProps } from "../types/Client";

const ClientList: FC<ClientListProps> = ({
  clients,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-primary">
        Lista de Clientes
      </h2>

      {/* Tabla para pantallas grandes */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-primary">
            <tr>
              <th className="py-3 px-6 text-left text-white font-medium">
                Nombre
              </th>
              <th className="py-3 px-6 text-left text-white font-medium">
                Teléfono
              </th>
              <th className="py-3 px-6 text-left text-white font-medium">
                Email
              </th>
              <th className="py-3 px-6 text-center text-white font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6 text-gray-700">{client.name}</td>
                <td className="py-4 px-6 text-gray-700">{client.phone}</td>
                <td className="py-4 px-6 text-gray-700">{client.email}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(client)}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                    >
                      👀
                    </button>
                    <button
                      onClick={() => onEdit(client)}
                      className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(client.id || "")}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para dispositivos móviles */}
      <div className="md:hidden space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex gap-4 items-center">
                <span className="font-medium text-gray-700">Nombre:</span>
                <span className="text-gray-600">{client.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="font-medium text-gray-700">Teléfono:</span>
                <span className="text-gray-600">{client.phone}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-600">{client.email}</span>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => onView(client)}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
              >
                👀
              </button>
              <button
                onClick={() => onEdit(client)}
                className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(client.id || "")}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
