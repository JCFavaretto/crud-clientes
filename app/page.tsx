"use client";
// app/page.tsx
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
import Modal from "../components/Modal";
import ClientDetailsModal from "../components/ClientDetailsModal";
import { Client } from "../types/Client";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewedClient, setViewedClient] = useState<Client | null>(null);

  // Obtener todos los clientes de Firebase
  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Client[];
      setClients(clientsData);
      console.log(clientsData);
      setFilteredClients(clientsData);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filtrar y ordenar clientes
  const handleFilter = async (searchTerm: string, sortBy: string) => {
    let q;

    const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

    if (searchTerm) {
      q = query(
        collection(db, "clients"),
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
        orderBy(field, order)
      );
    } else {
      q = query(collection(db, "clients"), orderBy(field, order));
    }

    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Client[];

    setFilteredClients(filteredData);
  };

  // Reiniciar filtros
  const handleReset = () => {
    setFilteredClients(clients); // Restaurar la lista original
  };

  // Eliminar cliente
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "clients", id));
      fetchClients(); // Actualizar lista
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  // Abrir modal para agregar/editar cliente
  const handleAdd = () => {
    setSelectedClient(null); // Limpiar cliente seleccionado
    setIsModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client); // Establecer cliente seleccionado
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Abrir modal de detalles
  const handleView = (client: Client) => {
    setViewedClient(client); // Establecer cliente seleccionado
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold mb-4">CRUD de Clientes</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Agregar Cliente
        </button>
      </div>
      <ClientFilter onFilter={handleFilter} onReset={handleReset} />
      <ClientList
        clients={filteredClients}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView} // Pasar la función para abrir el modal de detalles
      />
      {/* Modal de Formulario */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ClientForm
            fetchClients={fetchClients}
            onClose={handleCloseModal}
            initialClient={selectedClient || undefined} // Pasar cliente seleccionado
          />
        </Modal>
      )}
      {/* Modal de Detalles */}
      {isDetailsModalOpen && viewedClient && (
        <ClientDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          client={viewedClient}
        />
      )}
    </div>
  );
}
