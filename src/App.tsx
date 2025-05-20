import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react';

import { FiEdit, FiTrash2, FiUser, FiMail, FiBriefcase, FiUsers, FiShoppingBag, FiTruck, FiSearch, FiBell } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const workers = [
    { id: 1, nombre: 'Juan Pérez', cargo: 'Administrador', correo: 'juan@pharmayap.com' },
    { id: 2, nombre: 'Ana López', cargo: 'Farmacéutica', correo: 'ana@pharmayap.com' },
  ];

  const rolesChartData = [
    { cargo: 'Administrador', cantidad: 1 },
    { cargo: 'Farmacéutica', cantidad: 1 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <img src="public/LOGO_PHARMAYAP PNG.png" alt="PharmaYap Logo" className="h-16 w-auto mr-6" />
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-[#ca5c71] text-sm font-medium hover:text-pink-700 hover:border-pink-700">
                  <FiUsers className="mr-1" /> Trabajadores
                </a>
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium">
                  <FiShoppingBag className="mr-1" /> Catálogo
                </a>
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium">
                  <FiTruck className="mr-1" /> Proveedores
                </a>
              </nav>
            </div>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <FiUsers className="text-[#ca5c71] text-2xl mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Trabajadores</h1>
          </div>
          <button className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center">
            <FiUser className="mr-2" /> Nuevo Trabajador
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#f8e1e5]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase tracking-wider">
                  <FiBriefcase className="inline mr-1" /> Cargo
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase tracking-wider">
                  <FiMail className="inline mr-1" /> Correo
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workers.map((worker) => (
                <tr key={worker.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{worker.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{worker.cargo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ca5c71] hover:text-pink-700">
                    <a href={`mailto:${worker.correo}`}>{worker.correo}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5] transition-colors">
                        <FiEdit className="text-lg" />
                      </button>
                      <button className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5] transition-colors">
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-sm text-gray-500">
            <span>Mostrando {workers.length} de {workers.length} registros</span>
            <div className="flex space-x-4">
              <button className="text-[#ca5c71] hover:text-pink-700 disabled:text-gray-300" disabled>Anterior</button>
              <button className="text-[#ca5c71] hover:text-pink-700">Siguiente</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Cargos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rolesChartData}>
              <XAxis dataKey="cargo" stroke="#ca5c71" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#ca5c71" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>

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
            © 2023 PharmaYap. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;