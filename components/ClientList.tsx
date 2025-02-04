// components/ClientList.tsx
import { FC, useState } from "react";
import { ClientListProps } from "../types/Client";

const ClientList: FC<ClientListProps> = ({
  clients,
  onDelete,
  onEdit,
  onView,
}) => {
  // Estado para controlar el modo de vista (tabla o cuadrícula)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  return (
    <div className="p-4">
      {/* Encabezado con botones de cambio de vista */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">Lista de Clientes</h2>
        <div className="flex gap-2">
          {/* Botón Modo Tabla */}
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${
              viewMode === "table"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
            title="Modo Tabla"
          >
            📋
          </button>

          {/* Botón Modo Cuadrícula */}
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
            title="Modo Cuadrícula"
          >
            🧩
          </button>
        </div>
      </div>

      {/* Modo Tabla */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-primary">
              <tr>
                <th className="py-3 px-6 text-left text-white font-medium">
                  Nombre
                </th>
                <th className="py-3 px-6 text-center text-white font-medium ">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  {/* Columna Nombre */}
                  <td className="py-4 px-6 text-gray-700">
                    <div className="flex flex-col">
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <ActionButtonGroup
                      onView={() => onView(client)}
                      onEdit={() => onEdit(client)}
                      onDelete={() => onDelete(client.id || "")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modo Cuadrícula */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <ActionButtonGroup
                  onView={() => onView(client)}
                  onEdit={() => onEdit(client)}
                  onDelete={() => onDelete(client.id || "")}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientList;

// components/ActionButtonGroup.tsx

interface ActionButtonGroupProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtonGroup: FC<ActionButtonGroupProps> = ({
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={onView}
        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
      >
        👀
      </button>
      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
      >
        ✏️
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
      >
        ❌
      </button>
    </div>
  );
};
