import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext";
import { CreateEmployee } from "./create-employee";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { api } from "../../lib/axiosConfig";
import { removeMask } from "../../hooks/maskNumbers";
import { useNavigate } from "react-router-dom";
import { FindEmployee } from "./find-employee";
import { Employee } from "../../interfaces";

export const EmployeeRecords: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState<Date | null>(null);
  const [rescisao, setRescisao] = useState<Date | null>(null);
  const [admissao, setAdmissao] = useState<Date | null>(null);
  const [nre, setNre] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [resultado, setResultado] = useState<Employee[]>([]);
  const { user } = useAuth();
  const token = sessionStorage.getItem("accessToken"); // Obtenha o token armazenado
  const adminId = Number(sessionStorage.getItem("userId"))
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const employeeData = {
    name: name,
    birthDate: nascimento,
    cpf: removeMask(cpf),
    admissionDate: admissao,
    terminationDate: rescisao,
    nre: nre,
  };

  const createEmployee = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post<Employee>("/employees", { ...employeeData, userId: adminId }, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar o token no cabeçalho da requisição
        },
      });

      toast.success("Funcionário criado com sucesso!");
      setTimeout(() => {
        navigate(`/arquivo/${response.data.id}`);
      }, 3000);
    } catch (error) {
      toast.error("Erro ao criar funcionário!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } finally {
      setIsModalOpen(false);
    }
  };

  const findEmployee = async () => {
    try {
      if (pesquisa.length > 0) {
        await api
          .get<Employee[]>("/employees", {
            params: {
              name: pesquisa, // Enviando o parâmetro de consulta
            },
          })
          .then((response) => {
            setResultado(response.data); // Tratar a resposta aqui
          });
      } else {
        toast.error("Preencha o campo!");
      }
    } catch (error) {
      console.log(error); // Tratar o erro aqui
    }
  };

  return (
    <div>
      {/* Ajuste de padding-top para compensar o menu fixo */}
      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8 pt-16">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Funcionários Demitidos</h1>
        </header>
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

        <main className="flex gap-16 px-4">
          {/* Área principal para listagem de funcionários */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-medium">
              Lista de Funcionários Demitidos
            </h2>
            {resultado.length > 0 ? (
              <span className="text-zinc-900 text-lg flex-1">
                {resultado.length} registro(s) encontrado(s)
              </span>
            ) : (
              <span className="text-zinc-900 text-lg flex-1">
                nenhum registro encontrado
              </span>
            )}
            <FindEmployee resultado={resultado} />
          </div>

          {/* Barra lateral */}
          <div className="w-80 space-y-6">
            <h3 className="text-xl font-medium">Área de Pesquisa</h3>
            <div className="w-full h-px bg-zinc-800" />
            {/* Outros componentes, como links importantes ou filtros */}
            <div className="flex space-x-2">
              <input
                type="text"
                className="border p-2 rounded-lg w-full "
                placeholder="Digite o nome para busca"
                onChange={(event) => {
                  {
                    setPesquisa(event.target.value);
                  }
                }}
              />
              <button
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={findEmployee}
              >
                Pesquisar
              </button>
            </div>
            <div className="w-full h-px bg-zinc-800" />
            {/* Verifica role para exibir o botão */}
            {(user?.roles?.includes("STAFF") ||
              user?.roles?.includes("ADMIN")) && (
                <button
                  onClick={openModal}
                  className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                >
                  Cadastrar Novo
                </button>
              )}
          </div>
        </main>

        {/* Modal de cadastro */}
        {isModalOpen && (
          <CreateEmployee
            closeModal={closeModal}
            createEmployee={createEmployee}
            setAdmissionDate={setAdmissao}
            setCpf={setCpf}
            setName={setName}
            setBirthDate={setNascimento}
            setNre={setNre}
            setTerminationDate={setRescisao}
            admissionDate={admissao}
            terminationDate={rescisao}
            birthDate={nascimento}
          />
        )}
      </div>
    </div>
  );
};
