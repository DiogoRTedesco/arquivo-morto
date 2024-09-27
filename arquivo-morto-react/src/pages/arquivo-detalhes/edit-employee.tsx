import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  maskCpf,
  maskCtps,
  pispasep,
  removeMask,
} from "../../hooks/maskNumbers";

interface EditEmployeeProps {
  employeeData: {
    id: number;
    name: string;
    birthDate: Date;
    cpf: string;
    pis: string;
    ctps: string;
    admissionDate: Date;
    terminationDate: Date;
    nre: string;
  };
  onClose: () => void;
  onUpdateEmployee: (updatedData: any) => void;
}

export const EditEmployee: React.FC<EditEmployeeProps> = ({
  employeeData,
  onClose,
  onUpdateEmployee,
}) => {
  // State para os campos do formulário
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [cpfValue, setCpfValue] = useState("");
  const [ctpsValue, setCtpsValue] = useState("");
  const [nre, setNre] = useState("");
  const [pisValue, setPisValue] = useState("");
  const [admissionDate, setAdmissionDate] = useState<Date | null>(null);
  const [terminationDate, setTerminationDate] = useState<Date | null>(null);

  useEffect(() => {
    if (employeeData) {
      setName(employeeData.name);
      setBirthDate(new Date(employeeData.birthDate));
      setCpfValue(maskCpf(employeeData.cpf));
      setCtpsValue(maskCtps(employeeData.ctps));
      setNre(employeeData.nre);
      setPisValue(pispasep(employeeData.pis));
      setAdmissionDate(new Date(employeeData.admissionDate));
      if (employeeData.terminationDate) {
        setTerminationDate(new Date(employeeData.terminationDate));
      }
    }
  }, [employeeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      birthDate,
      cpf: removeMask(cpfValue),
      ctps: removeMask(ctpsValue),
      nre,
      pis: removeMask(pisValue),
      admissionDate,
      terminationDate,
    };
    onUpdateEmployee(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-xl font-bold mb-4">
          Editar Informações do Funcionário
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Nome Funcionário</label>
              <input
                type="text"
                placeholder="Nome do Funcionário"
                className="border p-2 rounded-lg w-full"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Nascimento</label>
              <div className="w-full">
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  showIcon
                  toggleCalendarOnIconClick
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded-lg w-full cursor-pointer"
                  placeholderText="Data de Nascimento"
                />
              </div>
            </div>
            <div>
              <label className="text-sm">CPF</label>
              <input
                type="text"
                placeholder="CPF"
                className="border p-2 rounded-lg w-full"
                value={cpfValue}
                onChange={(e) => setCpfValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Admissão</label>
              <div className="w-full">
                <DatePicker
                  selected={admissionDate}
                  onChange={(date) => setAdmissionDate(date)}
                  showIcon
                  toggleCalendarOnIconClick
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded-lg w-full cursor-pointer"
                  placeholderText="Data de Admissão"
                />
              </div>
            </div>
            <div>
              <label className="text-sm">Rescisão</label>
              <div className="w-full">
                <DatePicker
                  selected={terminationDate}
                  onChange={(date) => setTerminationDate(date)}
                  showIcon
                  toggleCalendarOnIconClick
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded-lg w-full cursor-pointer"
                  placeholderText="Data de Demissão"
                />
              </div>
            </div>
            <div>
              <label className="text-sm">PIS</label>
              <input
                type="text"
                placeholder="Nº do PIS"
                className="border p-2 rounded-lg w-full"
                value={pisValue}
                onChange={(e) => setPisValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">CTPS</label>
              <input
                type="text"
                placeholder="Nº da CTPS"
                className="border p-2 rounded-lg w-full"
                value={ctpsValue}
                onChange={(e) => setCtpsValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Nº de Registro</label>
              <input
                type="text"
                placeholder="Nº de Registro do Empregado"
                className="border p-2 rounded-lg w-full"
                value={nre}
                onChange={(e) => setNre(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
