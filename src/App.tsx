import { useState } from "react";
import { FiUsers, FiShoppingBag, FiTruck, FiSearch, FiBell, FiUser, FiGrid, FiHome } from "react-icons/fi";
import Producto from './Productos';
import Categoria from './Categoria';
import Trabajadores from './Trabajadores';
import Proveedores from './Proveedores';
import Clientes from "./Clientes";


export default function App() {
  const [pagina, setPagina] = useState<"inicio"|"trabajadores" | "producto"| "categoria" | "proveedores" | "clientes">("inicio");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">

            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/LOGO_PHARMAYAP PNG.png"
                alt="PharmaYap Logo"
                className="h-16 w-auto mr-6"
              />

              {/* Menu */}
              <nav className="hidden md:flex space-x-8">

                <button
                  onClick={() => setPagina("inicio")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pagina === "inicio"
                      ? "border-[#ca5c71] text-[#ca5c71]"
                      : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]"
                  }`}
                >
                  <FiHome className="mr-1" /> Inicio
                </button>



                <button
                  onClick={() => setPagina("trabajadores")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pagina === "trabajadores"
                      ? "border-[#ca5c71] text-[#ca5c71]"
                      : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]"
                  }`}
                >
                  <FiUsers className="mr-1" /> Trabajadores
                </button>


                <button
                  onClick={() => setPagina("producto")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pagina === "producto"
                      ? "border-[#ca5c71] text-[#ca5c71]"
                      : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]"
                  }`}
                >
                  <FiShoppingBag className="mr-1" /> Producto
                </button>


                <button
                  onClick={() => setPagina("categoria")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pagina === "categoria"
                      ? "border-[#ca5c71] text-[#ca5c71]"
                      : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]"
                  }`}
                >
                  <FiGrid className="mr-1" /> Categoria
                </button>


                <button
                  onClick={() => setPagina("proveedores")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pagina === "proveedores"
                      ? "border-[#ca5c71] text-[#ca5c71]"
                      : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]"
                  }`}
                >
                  <FiTruck className="mr-1" /> Proveedores
                </button>


                <button
                  onClick={() => setPagina("clientes")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pagina === "clientes"
                      ? "border-[#ca5c71] text-[#ca5c71]"
                      : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]"
                  }`}
                >
                  <FiUser className="mr-1" /> Usuarios
                </button>
              </nav>
            </div>



            {/* Iconos derecho */}
            <div className="flex items-center space-x-4">
              <FiSearch className="text-gray-500 w-5 h-5 cursor-pointer" />
              <FiBell className="text-gray-500 w-5 h-5 cursor-pointer" />
              <div className="flex items-center">
                <span className="bg-[#f8e1e5] text-[#ca5c71] p-2 rounded-full">
                  <FiUser className="h-5 w-5" />
                </span>
                <span className="ml-2 text-sm font-medium text-gray-700">Bienvenido</span>
              </div>
            </div>
          </div>
        </div>
      </header>




      {/* Contenido dinámico */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {pagina === "inicio" && (
          <div className="text-center text-gray-700 text-xl font-semibold">
            Aquí irá la vista inicio del administrador (pendiente por implementar)
          </div>
        )}

        {pagina === "trabajadores" && <Trabajadores/>}

        {pagina === "producto" &&  <Producto/>}

        {pagina === "categoria" && <Categoria/>}

        {pagina === "proveedores" && <Proveedores/>}

        {pagina === "clientes" && < Clientes />}

      </main>

      {/* Footer */}
      <footer className="bg-[#ca5c71] border-t mt-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-semibold">Online Pharmacy</span>
              <p className="mt-2 text-sm max-w-xs">
                PharmaYap es la solución ideal para farmacias de todos los tamaños.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Enlaces</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="hover:underline">Nosotros</a></li>
                  <li><a href="#" className="hover:underline">Catálogo</a></li>
                  <li><a href="#" className="hover:underline">Trabajadores</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="hover:underline">Políticas</a></li>
                  <li><a href="#" className="hover:underline">Términos</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-pink-300 text-sm text-center">
            © 2025 PharmaYap. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
