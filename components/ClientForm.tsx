// components/ClientForm.tsx
import React from "react";
import FloatingInput from "./FloatingInput";
import Modal from "./Modal";
import { useFirebaseClientForm } from "../hooks/useFirebaseClientForm";
import { ClientFormProps } from "../types/Client";

export default function ClientForm({
  fetchClients,
  onClose,
  initialClient,
}: ClientFormProps) {
  const { formValues, errors, handleChange, handleSubmit } =
    useFirebaseClientForm(initialClient);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(() => {
            fetchClients();
            onClose();
          }, initialClient?.id);
        }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold mb-2 text-primary">
          {initialClient ? "Editar Cliente" : "Agregar Cliente"}
        </h2>

        {/* Nombre */}
        <FloatingInput
          label="Nombre"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Teléfono */}
        <FloatingInput
          label="Teléfono"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        {/* Email */}
        <FloatingInput
          label="Email"
          name="email"
          value={formValues.email || ""}
          onChange={handleChange}
          type="email"
          error={errors.email}
        />

        {/* Fecha de Nacimiento */}
        <FloatingInput
          label="Fecha de Nacimiento"
          name="nacimiento"
          value={formValues.nacimiento || ""}
          onChange={handleChange}
          type="date"
          error={errors.nacimiento}
        />

        {/* DNI */}
        <FloatingInput
          label="DNI"
          name="dni"
          value={formValues.dni || ""}
          onChange={handleChange}
          error={errors.dni}
        />

        {/* Botones */}
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
    </Modal>
  );
}
