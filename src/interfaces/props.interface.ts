import { ReactNode } from "react";

export interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: { name: string; email: string; password: string; phone: string; phone2: string, citycode: string; }) => void;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  userName: string;
}