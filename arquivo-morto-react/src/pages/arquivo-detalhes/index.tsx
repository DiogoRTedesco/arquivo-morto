import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axiosConfig";
import type { Employee, EmployeeFile } from "../../interfaces";
import { maskCpf, maskCtps, pispasep } from "../../hooks/maskNumbers";
import { UploadFile } from "./upload-file";
import { useAuth } from "../../contexts/AuthContext";
import { Edit, Trash } from "lucide-react";
import { EditEmployee } from "./edit-employee";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<EmployeeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionário", error);
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await api.get(`/files/employee/${id}`);
        setFiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar os arquivos:", error);
      }
    };

    fetchFiles();
  }, [id]);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await api.post(`/files/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Após o upload, atualizar a lista de arquivos
      setIsModalOpen(false);
      setSelectedFile(null);
      const response = await api.get(`/files/employee/${id}`);
      setFiles(response.data);
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `${import.meta.env.VITE_BASE_URL}/files/download/${fileName}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  const handleUpdateEmployee = (updatedData: Employee) => {
    api
      .put(`/employees/${id}`, updatedData)
      .then(() => {
        toast.success("Funcionário atualizado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(()=>{
          window.location.reload()
        },4000)
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados", error);
        toast.error("Erro ao atualizar os dados!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        
        
      });
  };
  const handleDeleteFile = async (fileId: number, fileName: string) => {
    if (window.confirm("Tem certeza de que deseja excluir este arquivo?")) {
      try {
        setIsLoading(true);
        await api.delete(`/files/delete/${fileId}/${fileName}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        toast.success("Arquivo removido com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } catch (error) {
        console.error("Erro ao deletar o arquivo:", error);
        toast.error("Erro ao deletar o arquivo!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
    }
  };

  return (
    <div className="max-w-6xl px-6 py-16 mx-auto space-y-8 pt-16 p-6 ">
      {/* Header */}
      <h1 className="text-2xl font-bold text-zinc-900">
        Detalhes do Funcionário
      </h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {employee && (
        <>
          {/* Seção de Dados */}
          <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
            <div>
              <span className="font-semibold">Nome:</span> {employee.name}
            </div>
            <div>
              <span className="font-semibold">CPF:</span>{" "}
              {maskCpf(employee.cpf)}
            </div>
            <div>
              <span className="font-semibold">CTPS:</span>{" "}
              {maskCtps(employee.ctps)}
            </div>
            <div>
              <span className="font-semibold">NRE:</span> {employee.nre}
            </div>
            <div>
              <span className="font-semibold">PIS:</span>{" "}
              {pispasep(employee.pis)}
            </div>
            <div>
              <span className="font-semibold">Data de Admissão:</span>{" "}
              {new Date(employee.admissionDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Data de Nascimento:</span>{" "}
              {new Date(employee.birthDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Data de Rescisão:</span>{" "}
              {employee.terminationDate
                ? new Date(employee.terminationDate).toLocaleDateString()
                : "N/A"}
            </div>
            {/* Ícone de edição */}
            {(user?.roles?.includes("STAFF") ||
              user?.roles?.includes("ADMIN")) && (
              <button
                className=" top-2 right-2 text-blue-500 hover:text-blue-700"
                onClick={() => setIsEditModalOpen(true)}
                title="Editar Informações do Usuário"
              >
                <Edit className="w-6 h-6" />
              </button>
            )}
          </div>
          {/* Modal para Editar funcionário */}
          {/* Modal de edição */}
          {isEditModalOpen && (
            <EditEmployee
              employeeData={employee}
              onClose={() => setIsEditModalOpen(false)}
              onUpdateEmployee={handleUpdateEmployee}
            />
          )}
          {/* Botão para upload de arquivos */}
          {(user?.roles?.includes("STAFF") ||
            user?.roles?.includes("ADMIN")) && (
            <div className="flex justify-end">
              <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Upload de Fichas
              </button>
            </div>
          )}
          {/* Área para exibir arquivos enviados */}
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h2 className="text-lg font-semibold">Fichas Enviadas</h2>
            <ul className="list-disc ml-6">
              {files.map((file) => (
                <li key={file.id}>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleDownload(file.fileName)}
                      className="text-blue-500 hover:underline"
                    >
                      {file.fileName}
                    </button>
                    {(user?.roles?.includes("STAFF") ||
                      user?.roles?.includes("ADMIN")) && (
                      <button
                        className="ml-4"
                        onClick={() => handleDeleteFile(file.id, file.fileName)}
                        title="Remover ficha"
                        disabled={isLoading}
                      >
                        <Trash className="size-4" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Modal para upload de arquivos */}
          {isModalOpen && (
            <UploadFile
              closeModal={closeModal}
              handleFileUpload={handleFileUpload}
              setSelectedFile={setSelectedFile}
            />
          )}
        </>
      )}
    </div>
  );
};
