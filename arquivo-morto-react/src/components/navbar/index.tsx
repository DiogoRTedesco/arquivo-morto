import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Certifique-se de ajustar o caminho conforme seu projeto

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated , logout} = useAuth(); // Obtendo o estado de autenticação do contexto

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
           { <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-gray-300"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>}
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
              <Link
                to="/users"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
              >
                Usuários
              </Link>
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
      {menuOpen && (
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
      )}
    </nav>
  );
};
