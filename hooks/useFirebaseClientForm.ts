// hooks/useForm.ts
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

interface FormFields {
  name: string;
  email?: string;
  nacimiento?: string;
  phone: string;
  dni?: string;
}

export function useFirebaseClientForm(initialValues?: Partial<Client>) {
  // Estado del formulario
  const [formValues, setFormValues] = useState<FormFields>({
    name: "",
    phone: "",
    ...initialValues,
    nacimiento:
      initialValues?.nacimiento instanceof Timestamp
        ? initialValues.nacimiento.toDate().toISOString().split("T")[0]
        : typeof initialValues?.nacimiento === "string"
        ? initialValues.nacimiento
        : "",
  });

  // Estado de errores
  const [errors, setErrors] = useState<Partial<FormFields>>({});

  // Resetear el formulario
  const resetForm = () => {
    setFormValues({
      name: "",
      phone: "",
      email: undefined,
      nacimiento: undefined,
      dni: undefined,
    });
    setErrors({});
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Eliminar el error correspondiente al campo que se está editando
    if (errors[name as keyof FormFields]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }

    // Actualizar el valor del campo
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Validaciones básicas
  const validate = (): boolean => {
    const newErrors: Partial<FormFields> = {};
    if (!formValues.name) newErrors.name = "El nombre es requerido";
    if (!formValues.phone) newErrors.phone = "El teléfono es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Enviar el formulario (guardar o actualizar en Firebase)
  const handleSubmit = async (
    callback: () => void,
    id?: string
  ): Promise<void> => {
    if (!validate()) return; // Detener el envío si hay errores

    try {
      const clientData = {
        ...formValues,
        nacimiento: formValues.nacimiento
          ? Timestamp.fromDate(new Date(formValues.nacimiento))
          : null,
      };

      if (id) {
        // Actualizar cliente existente
        await updateDoc(doc(db, "clients", id), clientData);
      } else {
        // Agregar nuevo cliente
        await addDoc(collection(db, "clients"), clientData);
      }

      resetForm(); // Limpiar el formulario
      callback(); // Ejecutar la función de callback (por ejemplo, cerrar el modal)
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  return {
    formValues,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
