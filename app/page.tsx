"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";
import ClientFilter from "../components/ClientFilter";
import ClientDetailsModal from "../components/ClientDetailsModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { Client } from "../types/Client";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewedClient, setViewedClient] = useState<Client | null>(null);
  const [clientIdToDelete, setClientIdToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState({
    isAddEditModalOpen: false,
    isDetailsModalOpen: false,
    isDeleteModalOpen: false,
  });

  // Obtener todos los clientes de Firebase
  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Client[];
      setClients(clientsData);
      setFilteredClients(clientsData);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
      handleError("No se pudieron cargar los clientes.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filtrar y ordenar clientes localmente
  const handleFilter = (searchTerm: string, sortBy: string) => {
    const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];
    let filtered = [...clients];

    if (searchTerm) {
      filtered = filtered.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (order === "asc") {
        return (a[field as keyof Client] ?? "") >
          (b[field as keyof Client] ?? "")
          ? 1
          : -1;
      } else {
        return (a[field as keyof Client] ?? "") <
          (b[field as keyof Client] ?? "")
          ? 1
          : -1;
      }
    });

    setFilteredClients(filtered);
  };

  // Reiniciar filtros
  const handleReset = () => {
    setFilteredClients(clients);
  };

  // Manejar errores
  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  // Abrir modal para agregar/editar cliente
  const handleAdd = () => {
    setSelectedClient(null);
    setModalState({ ...modalState, isAddEditModalOpen: true });
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setModalState({ ...modalState, isAddEditModalOpen: true });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isAddEditModalOpen: false });
  };

  // Abrir modal de detalles
  const handleView = (client: Client) => {
    setViewedClient(client);
    setModalState({ ...modalState, isDetailsModalOpen: true });
  };

  const handleCloseDetailsModal = () => {
    setModalState({ ...modalState, isDetailsModalOpen: false });
  };

  // Abrir modal de confirmación para eliminar
  const handleDelete = (id: string) => {
    setClientIdToDelete(id);
    setModalState({ ...modalState, isDeleteModalOpen: true });
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (clientIdToDelete) {
      try {
        await deleteDoc(doc(db, "clients", clientIdToDelete));
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== clientIdToDelete)
        );
        setFilteredClients((prevFiltered) =>
          prevFiltered.filter((client) => client.id !== clientIdToDelete)
        );
      } catch (err) {
        console.error("Error al eliminar cliente:", err);
        handleError("No se pudo eliminar el cliente.");
      } finally {
        setModalState({ ...modalState, isDeleteModalOpen: false });
        setClientIdToDelete(null);
      }
    }
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setModalState({ ...modalState, isDeleteModalOpen: false });
    setClientIdToDelete(null);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Mensaje de Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">CRUD de Clientes</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded mt-4 md:mt-0"
        >
          Agregar Cliente
        </button>
      </div>

      {/* Filtro */}
      <ClientFilter onFilter={handleFilter} onReset={handleReset} />

      {/* Lista de Clientes */}
      <ClientList
        clients={filteredClients}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />

      {/* Modal de Formulario */}
      {modalState.isAddEditModalOpen && (
        <ClientForm
          isOpen={modalState.isAddEditModalOpen}
          onClose={handleCloseModal}
          fetchClients={fetchClients}
          initialClient={selectedClient || undefined}
        />
      )}

      {/* Modal de Detalles */}
      {modalState.isDetailsModalOpen && viewedClient && (
        <ClientDetailsModal
          isOpen={modalState.isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          client={viewedClient}
        />
      )}

      {/* Modal de Confirmación */}
      {modalState.isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={modalState.isDeleteModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          message="¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer."
        />
      )}
    </div>
  );
}
