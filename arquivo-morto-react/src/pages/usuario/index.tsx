import React, { useEffect, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { Edit, Trash2, Key } from "lucide-react"; // Importando ícones do Lucide
import "react-toastify/dist/ReactToastify.css";
import { CreateUser } from "./create-user";
import { api } from "../../lib/axiosConfig";
import { ChangePasswordModal } from "./change-password";
import { EditUserModal } from "./edit-user";


type AccessLevel = "ADMIN" | "STAFF" | "USER";
interface User {
  id: number;
  username: string;
  accessLevel: AccessLevel;
  createdAt: Date;
  updatedAt: Date;
}

export const UserProfilePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    accessLevel: "",
  });
  const adminId = Number(sessionStorage.getItem("userId"))
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    try {
      api.get("/users").then((response) => {
        setUsers(response.data);
      });
    } catch (error) {
      toast.error("Erro ao carregar usuários!");
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post("/users", { ...newUser, userId: adminId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar usuário!",);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } finally {
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  };

  const handleDeleteUser = (userId: number) => {
    const isConfirmed = window.confirm(
      "Tem certeza de que deseja excluir este usuário?"
    );

    if (isConfirmed) {
      console.log("Usuário confirmado para exclusão:", userId);

      api
        .delete(`/users/${userId}`, {
          data: { userId: adminId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Usuário excluído com sucesso!");

          setUsers(users.filter((user) => user.id !== userId));
        })
        .catch(() => {
          toast.error("Erro ao excluir o usuário!",);
        });
    } else {
      console.log("Ação de exclusão cancelada");
    }
  };

  const handleChangePassword = (userId: number) => {
    setSelectedUserId(userId);
    setIsChangePasswordModalOpen(true);
  };

  const handleEditUser = (userId: number) => {
    setSelectedUserId(userId);
    setIsEditUserModalOpen(true);
  };
  const onPasswordChange = (userId: number, newPassword: string) => {

    if (newPassword) {
      api.put(`/users/password/${userId}`, { password: newPassword, userId: adminId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success("Senha alterada com sucesso!");
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        }).catch(() => {
          toast.error("Erro ao alterar a senha do usuário!");
        })
    }

  };

  const onEditUserSubmit = (userId: number, updatedAccessLevel: string) => {
    if (updatedAccessLevel) {
      api.put(`/users/accessLevel/${userId}`, { accessLevel: updatedAccessLevel, userId: adminId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(() => {
          toast.success("Permissão de usuário alterada com sucesso!");
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        }).catch(() => {
          toast.error("Erro ao alterar a Permissão do usuário!");
        })
    }
  };

  return (
    <div>
      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8 pt-16">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Gerenciamento de Usuários</h1>
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
          {/* Área principal para listagem de usuários */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-medium">Lista de Usuários</h2>
            {filteredUsers.length > 0 ? (
              <span className="text-zinc-900 text-lg flex-1">
                {filteredUsers.length} usuário(s) encontrado(s)
              </span>
            ) : (
              <span className="text-zinc-900 text-lg flex-1">
                Nenhum usuário encontrado
              </span>
            )}

            <ul>
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="border-b py-2 flex justify-between items-center"
                >
                  <div>
                    <span>{user.username}</span> -{" "}
                    <span>{user.accessLevel}</span>
                  </div>
                  <div className="flex space-x-2">
                    {/* Botões de ações */}
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="text-blue-500"
                      title="Editar Permissão"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleChangePassword(user.id)}
                      className="text-yellow-500"
                      title="Alterar Senha"
                    >
                      <Key size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500"
                      title="Deletar Usuário"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Barra lateral */}
          <div className="w-80 space-y-6">
            <h3 className="text-xl font-medium">Área de Pesquisa</h3>
            <div className="w-full h-px bg-zinc-800" />
            {/* Input de pesquisa */}
            <div className="flex space-x-2">
              <input
                type="text"
                className="border p-2 rounded-lg w-full"
                placeholder="Digite o nome para busca"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full h-px bg-zinc-800" />
            {/* Botão para abrir o modal de criação de usuário */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white rounded-lg px-5 py-2 font-medium hover:bg-blue-600"
            >
              Cadastrar Novo Usuário
            </button>
          </div>
        </main>

        {/* Modal de cadastro */}
        {isModalOpen && (
          <CreateUser
            handleCreateUser={handleCreateUser}
            newUser={newUser}
            setIsModalOpen={setIsModalOpen}
            setNewUser={setNewUser}
          />
        )}

        {isChangePasswordModalOpen && selectedUserId !== null && (
          <ChangePasswordModal
            userId={selectedUserId}
            onClose={() => setIsChangePasswordModalOpen(false)}
            onChangePassword={onPasswordChange}
          />
        )}
        {isEditUserModalOpen && selectedUserId !== null && (
          <EditUserModal
            userId={selectedUserId}
            currentAccessLevel={users.find((user) => user.id === selectedUserId)?.accessLevel || "USER"}

            setIsEditUserModalOpen={() => setIsEditUserModalOpen(false)}
            onEditUser={onEditUserSubmit}
          />
        )}
      </div>
    </div>
  );
};
