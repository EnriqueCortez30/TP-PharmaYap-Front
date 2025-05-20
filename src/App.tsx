import React, { useState } from "react";
import Proveedores from "./Proveedores";

export default function App() {
  const [pagina, setPagina] = useState<"inicio" | "proveedores">("inicio");

  return (
    <div className="flex min-h-screen">
      {/* Menú lateral rojo fuerte */}
      <nav className="w-48 bg-red-700 text-white p-6 flex flex-col space-y-4 shadow-lg">
        <h1
          className="text-2xl font-bold mb-6 cursor-pointer hover:text-red-300"
          onClick={() => setPagina("inicio")}
        >
          PharmaYap
        </h1>
        <button
          onClick={() => setPagina("inicio")}
          className={`text-left px-3 py-2 rounded transition-colors duration-200 ${
            pagina === "inicio"
              ? "bg-red-900 font-semibold"
              : "hover:bg-red-800"
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => setPagina("proveedores")}
          className={`text-left px-3 py-2 rounded transition-colors duration-200 ${
            pagina === "proveedores"
              ? "bg-red-900 font-semibold"
              : "hover:bg-red-800"
          }`}
        >
          Proveedores
        </button>
      </nav>

      {/* Contenido principal con fondo gris */}
      <main className="flex-1 p-8 bg-gray-100">
        {pagina === "inicio" && (
          <div>
            <h2 className="text-3xl font-bold text-red-700 mb-4">
              Bienvenido a PharmaYap
            </h2>
            <p className="text-gray-700">
              Esta es la página de inicio.
            </p>
          </div>
        )}
        {pagina === "proveedores" && <Proveedores />}
      </main>
    </div>
  );
}
