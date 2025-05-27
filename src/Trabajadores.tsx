import { useState, useEffect } from "react";                                                                                                                                                                       
import { FiEdit, FiTrash2, FiTruck, FiUser } from "react-icons/fi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Trabajador = {
  id: number;
  nombre: string;
  cargo: string;
  telefono: string;
  correo: string;
  estado: string;
};

const trabajadoresIniciales: Trabajador[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    cargo: "Administrador",
    telefono: "01 234 5678",
    correo: "juan.perez@pharmayap.com",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María García",
    cargo: "Farmacéutica",
    telefono: "01 987 6543",
    correo: "maria.garcia@pharmayap.com",
    estado: "Activo",
  },
];

export default function Trabajadores() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>(trabajadoresIniciales);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const [nuevoTrabajador, setNuevoTrabajador] = useState<Omit<Trabajador, "id">>({
    nombre: "",
    cargo: "",
    telefono: "",
    correo: "",
    estado: "Activo",
  });

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoTrabajador({ ...nuevoTrabajador, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setNuevoTrabajador({
      nombre: "",
      cargo: "",
      telefono: "",
      correo: "",
      estado: "Activo",
    });
    setEditId(null);
  };

  const agregarTrabajador = () => {
    if (
      !nuevoTrabajador.nombre.trim() ||
      !nuevoTrabajador.cargo.trim() ||
      !nuevoTrabajador.telefono.trim() ||
      !nuevoTrabajador.correo.trim()
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (editId !== null) {
      setTrabajadores(
        trabajadores.map((t) =>
          t.id === editId ? { id: editId, ...nuevoTrabajador } : t
        )
      );
      setMensaje("Trabajador actualizado correctamente");
    } else {
      const nuevoId = trabajadores.length
        ? trabajadores[trabajadores.length - 1].id + 1
        : 1;
      setTrabajadores([...trabajadores, { id: nuevoId, ...nuevoTrabajador }]);
      setMensaje("Trabajador agregado correctamente");
    }
    limpiarFormulario();
    setShowForm(false);
  };

  const eliminarTrabajador = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este trabajador?")) {
      setTrabajadores(trabajadores.filter((t) => t.id !== id));
      setMensaje("Trabajador eliminado");
    }
  };

  const editarTrabajador = (t: Trabajador) => {
    setNuevoTrabajador({
      nombre: t.nombre,
      cargo: t.cargo,
      telefono: t.telefono,
      correo: t.correo,
      estado: t.estado,
    });
    setEditId(t.id);
    setShowForm(true);
  };

  function exportarCSV(trabajadoresExport: Trabajador[]) {
    if (trabajadoresExport.length === 0) {
      alert("No hay trabajadores para exportar");
      return;
    }

    const encabezados = [
      "Nombre",
      "Cargo",
      "Teléfono",
      "Correo",
      "Estado",
    ];

    const filas = trabajadoresExport.map((t) => [
      t.nombre,
      t.cargo,
      t.telefono,
      t.correo,
      t.estado,
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
    link.setAttribute("download", "trabajadores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const exportarPDF = () => {
    if (trabajadoresFiltrados.length === 0) {
      alert("No hay trabajadores para exportar");
      return;
    }
    const doc = new jsPDF();
    doc.text("Lista de Trabajadores", 14, 20);
    const columnas = ["Nombre", "Cargo", "Teléfono", "Correo", "Estado"];
    const filas = trabajadoresFiltrados.map(t => [
      t.nombre,
      t.cargo,
      t.telefono,
      t.correo,
      t.estado,
    ]);
    autoTable(doc, {
      startY: 30,
      head: [columnas],
      body: filas,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [202, 92, 113] },
    });
    doc.save("trabajadores.pdf");
  };

  const trabajadoresFiltrados = trabajadores.filter((t) =>
    t.nombre.toLowerCase().includes(search.toLowerCase()) ||
    t.correo.toLowerCase().includes(search.toLowerCase()) ||
    t.cargo.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
        <FiUser className="mr-3" style={{ color: "#ca5c71", fontSize: "1.875rem" }} />
        Gestión de Trabajadores
      </h1>

      {mensaje && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {mensaje}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Buscar por nombre, cargo o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-72"
        />

        <div className="flex space-x-2">
          <button
            onClick={() => exportarCSV(trabajadoresFiltrados)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center text-sm"
          >
            <AiOutlineFileExcel className="mr-2" />
            Exportar a Excel
          </button>

          <button
            onClick={exportarPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center text-sm"
          >
            <AiOutlineFilePdf className="mr-2" />
            Exportar a PDF
          </button>

          <button
            onClick={() => {
              limpiarFormulario();
              setShowForm(true);
            }}
            className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center text-sm"
          >
            <FiUser className="mr-2" />
            Agregar Trabajador
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
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition"
              onClick={() => setShowForm(false)}
              aria-label="Cerrar formulario"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-6" style={{ color: "#ca5c71" }}>
              {editId !== null ? "Editar Trabajador" : "Agregar Trabajador"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                agregarTrabajador();
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
                  value={nuevoTrabajador.nombre}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="cargo" className="block font-semibold mb-1">
                  Cargo
                </label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={nuevoTrabajador.cargo}
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
                  value={nuevoTrabajador.telefono}
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
                  value={nuevoTrabajador.correo}
                  onChange={manejarCambio}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="estado" className="block font-semibold mb-1">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={nuevoTrabajador.estado}
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
          <thead className="bg-[#f8e1e5]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">Cargo</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">Correo</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">Estado</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[#ca5c71] uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trabajadoresFiltrados.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No se encontraron trabajadores
                </td>
              </tr>
            )}
            {trabajadoresFiltrados.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">{t.nombre}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{t.cargo}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{t.telefono}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-[#ca5c71] hover:text-pink-700">
                  <a href={`mailto:${t.correo}`} className="hover:underline">
                    {t.correo}
                  </a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    t.estado === "Activo" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {t.estado}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => editarTrabajador(t)}
                      className="text-gray-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Editar"
                    >
                      <FiEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => eliminarTrabajador(t.id)}
                      className="text-gray-600 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
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
    </div>
  );
}