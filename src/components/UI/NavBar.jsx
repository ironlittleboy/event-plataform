import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';

const Navbar = ({ className = "" }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggin") === "true";
    setIsLoggin(loggedInStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggin");
    localStorage.removeItem("idUsuario");
    setIsLoggin(false);
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`flex flex-wrap items-center justify-between p-3 bg-teal-200/20 ${className}`}>
      <a href="/" className="inline-flex items-center p-2 mr-4">
        <img src={logo} width="48" height="48" alt="Logo" />
        <span className="text-xl font-bold text-teal-900">Eventos</span>
      </a>
      <div className="flex md:hidden">
        <button onClick={toggleMenu} id="hamburger">
          <img className={`toggle ${menuOpen ? "hidden" : "block"}`} src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="48" height="48" alt="Open menu" />
          <img className={`toggle ${menuOpen ? "block" : "hidden"}`} src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="48" height="48" alt="Close menu" />
        </button>
      </div>
      <div className={`toggle ${menuOpen ? "block" : "hidden"} w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-teal-900 md:border-none`}>
        <a href="/" className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none md:mr-4">
          Inicio
        </a>
        <a href="/events-list" className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none md:mr-4">
          Eventos
        </a>
        {isLoggin ? (
          <>
            <a href="/create" className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none md:mr-4">
              Crear Evento
            </a>
            <button onClick={handleLogout} className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none md:mr-4">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <div className={`toggle ${menuOpen ? "block" : "hidden"} w-full md:w-auto md:flex justify-end`}>
            <a href="/register" className="block md:flex w-full md:w-auto px-4 py-2 mt-4 md:mt-0 text-right bg-teal-900 hover:bg-teal-500 text-white md:rounded mb-4 md:mb-0 md:mr-4">
              Crear Cuenta
            </a>
            <a href="/login" className="block md:flex w-full md:w-auto px-4 py-2 mt-4 md:mt-0 text-right bg-indigo-700 hover:bg-indigo-500 text-white md:rounded">
              Iniciar Sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
