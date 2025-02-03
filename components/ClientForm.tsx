// components/ClientForm.tsx
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Client } from "../types/Client";

interface ClientFormProps {
  fetchClients: () => void;
  onClose: () => void;
  initialClient?: Client; // Cliente inicial para edición
}

export default function ClientForm({
  fetchClients,
  onClose,
  initialClient,
}: ClientFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");

  // Preencher los campos si hay un cliente inicial (edición)
  useEffect(() => {
    if (initialClient) {
      setName(initialClient.name);
      setEmail(initialClient.email);

      // Convertir Timestamp a string en formato YYYY-MM-DD
      const birthDate =
        initialClient.nacimiento instanceof Timestamp
          ? initialClient.nacimiento.toDate().toISOString().split("T")[0]
          : initialClient.nacimiento;

      setNacimiento(birthDate);
      setPhone(initialClient.phone);
      setDni(initialClient.dni);
    } else {
      // Limpiar los campos si no hay cliente inicial (creación)
      setName("");
      setEmail("");
      setNacimiento("");
      setPhone("");
      setDni("");
    }
  }, [initialClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        nacimiento: Timestamp.fromDate(new Date(nacimiento)), // Convertir a Timestamp
        phone,
        dni,
      };

      if (initialClient?.id) {
        // Editar cliente existente
        await updateDoc(doc(db, "clients", initialClient.id), clientData);
      } else {
        // Agregar nuevo cliente
        await addDoc(collection(db, "clients"), clientData);
      }

      // Limpiar el formulario y cerrar el modal
      setName("");
      setEmail("");
      setNacimiento("");
      setPhone("");
      setDni("");
      fetchClients(); // Actualizar lista
      onClose();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2 text-primary">
        {initialClient ? "Editar Cliente" : "Agregar Cliente"}
      </h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={nacimiento}
        onChange={(e) => setNacimiento(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {initialClient ? "Guardar Cambios" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
