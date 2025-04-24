import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { maskCpf } from "../../hooks/maskNumbers";
import type { modalProps } from "../../interfaces";



export const CreateEmployee: React.FC<modalProps> = ({
  closeModal,
  setName,
  createEmployee,
  birthDate,
  setBirthDate,
  setCpf,
  admissionDate,
  setAdmissionDate,
  terminationDate,
  setTerminationDate,

  setNre,

}) => {

  const [cpfValue, setCpfValue] = useState("");

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = maskCpf(event.target.value);
    setCpfValue(formattedCpf);
    setCpf(formattedCpf);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-xl font-semibold mb-4">
          Cadastrar Novo Funcionário
        </h2>
        <form onSubmit={createEmployee}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome do Funcionário"
              className="border p-2 rounded-lg w-full"
              onChange={(event) => setName(event.target.value)}
            />
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
            <input
              type="text"
              placeholder="CPF"
              className="border p-2 rounded-lg w-full"
              value={cpfValue}
              onChange={handleCpfChange}
            />
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

            <input
              type="text"
              placeholder="Nº de Registro do Empregado"
              className="border p-2 rounded-lg w-full"
              onChange={(event) => setNre(event.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Cadastrar

            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
