import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Certifique-se de ajustar o caminho conforme seu projeto

export const Navbar: React.FC = () => {

  const { isAuthenticated, logout, user } = useAuth(); // Obtendo o estado de autenticação do contexto



  // Somente renderiza o Navbar se o usuário estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-[#2C2C38] text-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Menu Hambúrguer */}
          <div className="flex items-center">

            <Link to="/" className="ml-2 text-xl font-semibold">
              Arquivo Morto
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/arquivo"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
              >
                Arquivo
              </Link>
              {user?.roles?.includes("ADMIN") && (
                < Link
                  to="/users"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                >
                  Usuários
                </Link>)}
              {user?.roles?.includes("ADMIN") && (
                <Link
                  to="/logs"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                >
                  Logs
                </Link>
              )}
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                onClick={logout}
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}


      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          >
            Usuários
          </Link>
          <Link
            to="/users"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            onClick={logout}
          >
            Sair
          </Link>
        </div>
      </div>


    </nav >
  );
};
