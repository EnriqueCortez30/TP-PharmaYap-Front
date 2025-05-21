import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiTruck } from "react-icons/fi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Proveedor = {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  tipoProveedor: string;
  estado: string;
};

const proveedoresIniciales: Proveedor[] = [
  {
    id: 1,
    nombre: "Distribuidora Salud S.A.",
    telefono: "01 234 5678",
    correo: "contacto@saludsa.com",
    direccion: "Av. Salud 123, Lima",
    tipoProveedor: "Local",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Farmasupplies Ltda.",
    telefono: "01 987 6543",
    correo: "ventas@farmasupplies.com",
    direccion: "Jr. Medicinas 456, Lima",
    tipoProveedor: "Internacional",
    estado: "Activo",
  },
];

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIniciales);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const [nuevoProveedor, setNuevoProveedor] = useState<Omit<Proveedor, "id">>({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    tipoProveedor: "Local",
    estado: "Activo",
  });

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoProveedor({ ...nuevoProveedor, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setNuevoProveedor({
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      tipoProveedor: "Local",
      estado: "Activo",
    });
    setEditId(null);
  };

  const agregarProveedor = () => {
    if (
      !nuevoProveedor.nombre.trim() ||
      !nuevoProveedor.telefono.trim() ||
      !nuevoProveedor.correo.trim() ||
      !nuevoProveedor.direccion.trim()
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (editId !== null) {
      setProveedores(
        proveedores.map((p) =>
          p.id === editId ? { id: editId, ...nuevoProveedor } : p
        )
      );
      setMensaje("Proveedor actualizado correctamente");
    } else {
      const nuevoId = proveedores.length
        ? proveedores[proveedores.length - 1].id + 1
        : 1;
      setProveedores([...proveedores, { id: nuevoId, ...nuevoProveedor }]);
      setMensaje("Proveedor agregado correctamente");
    }
    limpiarFormulario();
    setShowForm(false);
  };

  const eliminarProveedor = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id));
      setMensaje("Proveedor eliminado");
    }
  };

  const editarProveedor = (p: Proveedor) => {
    setNuevoProveedor({
      nombre: p.nombre,
      telefono: p.telefono,
      correo: p.correo,
      direccion: p.direccion,
      tipoProveedor: p.tipoProveedor,
      estado: p.estado,
    });
    setEditId(p.id);
    setShowForm(true);
  };

  function exportarCSV(proveedoresExport: Proveedor[]) {
    if (proveedoresExport.length === 0) {
      alert("No hay proveedores para exportar");
      return;
    }

    const encabezados = [
      "Nombre",
      "Teléfono",
      "Correo",
      "Dirección",
      "Tipo de Proveedor",
      "Estado",
    ];

    const filas = proveedoresExport.map((p) => [
      p.nombre,
      p.telefono,
      p.correo,
      p.direccion,
      p.tipoProveedor,
      p.estado,
    ]);

    const separador = ";";

    const escapeCampo = (campo: string) => {
      if (campo.includes(separador) || campo.includes("\n")) {
        return `"${campo.replace(/"/g, '""')}"`;
      }
      return campo;
    };

    const contenidoCSV =
      encabezados.join(separador) +
      "\r\n" +
      filas
        .map((fila) =>
          fila
            .map(escapeCampo)
            .join(separador)
        )
        .join("\r\n");

    const blob = new Blob(["\uFEFF" + contenidoCSV], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "proveedores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Nueva función para exportar PDF
  const exportarPDF = () => {
    if (proveedoresFiltrados.length === 0) {
      alert("No hay proveedores para exportar");
      return;
    }
    const doc = new jsPDF();
    doc.text("Lista de Proveedores", 14, 20);
    const columnas = ["Nombre", "Teléfono", "Correo", "Dirección", "Tipo", "Estado"];
    const filas = proveedoresFiltrados.map(p => [
      p.nombre,
      p.telefono,
      p.correo,
      p.direccion,
      p.tipoProveedor,
      p.estado,
    ]);
    autoTable(doc, {
      startY: 30,
      head: [columnas],
      body: filas,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [202, 92, 113] },
    });
    doc.save("proveedores.pdf");
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.correo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
        <FiTruck className="mr-3" style={{ color: "#ca5c71", fontSize: "1.875rem" }} />
        Gestión de Proveedores
      </h1>

      {mensaje && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {mensaje}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 max-w-sm w-full"
        />

        <div className="flex space-x-4">
          <button
            onClick={() => exportarCSV(proveedoresFiltrados)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center"
          >
            <AiOutlineFileExcel className="mr-2" />
            Exportar a Excel
          </button>

          <button
            onClick={exportarPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center"
          >
            <AiOutlineFilePdf className="mr-2" />
            Exportar a PDF
          </button>

          <button
            onClick={() => {
              limpiarFormulario();
              setShowForm(true);
            }}
            className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
          >
            <FiTruck className="mr-2" />
            Agregar Proveedor
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="fixed inset-0 bg-transparent bg-black bg-opacity-20 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md mx-4">
            {/* Botón cerrar "X" gris claro y texto gris oscuro */}
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition"
              onClick={() => setShowForm(false)}
              aria-label="Cerrar formulario"
            >
              &times;
            </button>

            {/* Título con color #ca5c71 */}
            <h2 className="text-3xl font-bold mb-6" style={{ color: "#ca5c71" }}>
              {editId !== null ? "Editar Proveedor" : "Agregar Proveedor"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                agregarProveedor();
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="nombre" className="block font-semibold mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nuevoProveedor.nombre}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block font-semibold mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={nuevoProveedor.telefono}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="correo" className="block font-semibold mb-1">
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={nuevoProveedor.correo}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block font-semibold mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={nuevoProveedor.direccion}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="tipoProveedor" className="block font-semibold mb-1">
                  Tipo de Proveedor
                </label>
                <select
                  id="tipoProveedor"
                  name="tipoProveedor"
                  value={nuevoProveedor.tipoProveedor}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Local">Local</option>
                  <option value="Internacional">Internacional</option>
                </select>
              </div>

              <div>
                <label htmlFor="estado" className="block font-semibold mb-1">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={nuevoProveedor.estado}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-full border border-[#ca5c71] text-[#ca5c71] font-semibold hover:bg-[#ca5c71] hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#ca5c71] text-white font-semibold hover:bg-[#a6535c] transition"
                >
                  {editId !== null ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-[#f8e1e5]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Teléfono</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Correo</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Dirección</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Estado</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {proveedoresFiltrados.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                No se encontraron proveedores
              </td>
            </tr>
          )}
          {proveedoresFiltrados.map((p) => (
            <tr key={p.id} className="hover:bg-[#fce9eb] transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{p.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.telefono}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ca5c71] hover:text-pink-700">
                <a href={`mailto:${p.correo}`} title={`Enviar correo a ${p.correo}`}>
                  {p.correo}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.direccion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.tipoProveedor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.estado}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => editarProveedor(p)}
                    className="text-black hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5] transition-colors"
                    title="Editar"
                  >
                    <FiEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => eliminarProveedor(p.id)}
                    className="text-black hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5] transition-colors"
                    title="Eliminar"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
