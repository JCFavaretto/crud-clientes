// components/ClientFilter.tsx
import { useEffect, useState } from "react";

interface ClientFilterProps {
  onFilter: (searchTerm: string, sortBy: string) => void;
  onReset: () => void;
}

const ClientFilter: React.FC<ClientFilterProps> = ({ onFilter, onReset }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc"); // Valor inicial: ordenar por nombre ascendente

  // Llamar a la función de filtro cuando cambia el término de búsqueda o el criterio de orden
  useEffect(() => {
    onFilter(searchTerm, sortBy);
  }, [searchTerm, sortBy, onFilter]);

  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2">Filtrar y Ordenar Clientes</h3>
      <div className="flex items-center space-x-4">
        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Select para ordenar */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
          <option value="email-asc">Email A-Z</option>
          <option value="email-desc">Email Z-A</option>
        </select>

        {/* Botón para reiniciar filtros */}
        <button
          onClick={onReset}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Reiniciar Filtros
        </button>
      </div>
    </div>
  );
};

export default ClientFilter;
