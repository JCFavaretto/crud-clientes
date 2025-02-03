// types/Client.ts
import { Timestamp } from "firebase/firestore";

export interface Client {
  id?: string;
  name: string;
  email: string;
  nacimiento: Timestamp | string;
  phone: string;
  dni: string;
}

export interface ClientListProps {
  clients: Client[];
  onDelete: (id: string) => void;
  onEdit: (client: Client) => void;
  onView: (client: Client) => void;
}

export interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void; // Cierra el modal
  onConfirm: () => void; // Ejecuta la acción de confirmación
  message: string; // Mensaje de confirmación
}
