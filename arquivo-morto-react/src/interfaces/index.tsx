import type { FormEvent } from "react";

export interface Employee {
  id: number;
  name: string;
  birthDate: Date;
  cpf: string;
  pis: string;
  ctps: string;
  admissionDate: Date;
  terminationDate: Date;
  nre: string;
}

export interface findEmployeeProps {
  resultado: Employee[];
}

export interface EmployeeFile {
  id: number;
  fileName: string;
  filePath: string;
}

export interface modalProps {
  closeModal: () => void;
  setName: (name: string) => void;
  birthDate: Date | null;
  setBirthDate: (nascimento: Date | null) => void;
  setCpf: (cpf: string) => void;
  admissionDate: Date | null;
  setAdmissionDate: (admissionDate: Date | null) => void;
  terminationDate: Date | null;
  setTerminationDate: (rescisao: Date | null) => void;
  //setCtps: (ctps: string) => void;
  setNre: (nre: string) => void;
  //setPis: (pis: string) => void;
  createEmployee: (event: FormEvent<HTMLFormElement>) => void;
}

export interface UploadProps {
  setSelectedFile: (file: File | null) => void;
  closeModal: () => void;
  handleFileUpload: () => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  hasRole: (role: string) => boolean;
  refreshAccessToken: (token: string) => void;
}
export interface User {
  id: string;
  username: string;
  roles: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}


export interface IUpdateUser {
  id: number;
  password?: string; // Senha opcional, só atualiza se fornecida
  profileType?: 'ADMIN' | 'STAFF' | 'USER'; // Permite atualização do tipo de perfil
}
