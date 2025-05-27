import React, { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash2, FiTruck, FiUpload } from "react-icons/fi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Proveedor = {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  ruc: string;
  estado: string;
};

const proveedoresIniciales: Proveedor[] = [
  {
    id: 1,
    nombre: "Distribuidora Salud S.A.",
    telefono: "01 234 5678",
    correo: "contacto@saludsa.com",
    direccion: "Av. Salud 123, Lima",
    ruc: "20123456789",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Farmasupplies Ltda.",
    telefono: "01 987 6543",
    correo: "ventas@farmasupplies.com",
    direccion: "Jr. Medicinas 456, Lima",
    ruc: "20456789123",
    estado: "Activo",
  },
];

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIniciales);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [nuevoProveedor, setNuevoProveedor] = useState<Omit<Proveedor, "id">>({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    ruc: "",
    estado: "Activo",
  });

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNuevoProveedor({ ...nuevoProveedor, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setNuevoProveedor({
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      ruc: "",
      estado: "Activo",
    });
    setEditId(null);
  };

  const agregarProveedor = () => {
    if (
      !nuevoProveedor.nombre.trim() ||
      !nuevoProveedor.telefono.trim() ||
      !nuevoProveedor.correo.trim() ||
      !nuevoProveedor.direccion.trim() ||
      !nuevoProveedor.ruc.trim()
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
      ruc: p.ruc,
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
      "RUC",
      "Estado",
    ];

    const filas = proveedoresExport.map((p) => [
      p.nombre,
      p.telefono,
      p.correo,
      p.direccion,
      p.ruc,
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

  const exportarPDF = () => {
    if (proveedoresFiltrados.length === 0) {
      alert("No hay proveedores para exportar");
      return;
    }
    const doc = new jsPDF();
    doc.text("Lista de Proveedores", 14, 20);
    const columnas = ["Nombre", "Teléfono", "Correo", "Dirección", "RUC", "Estado"];
    const filas = proveedoresFiltrados.map(p => [
      p.nombre,
      p.telefono,
      p.correo,
      p.direccion,
      p.ruc,
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
    p.correo.toLowerCase().includes(search.toLowerCase()) ||
    p.ruc.includes(search)
  );

  // --- Funciones Drag & Drop ---

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      procesarArchivo(e.dataTransfer.files[0]);
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      procesarArchivo(e.target.files[0]);
    }
  };

  const procesarArchivo = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF");
      return;
    }
    // Aquí puedes hacer lo que necesites con el archivo PDF, ejemplo: subirlo a un servidor
    setMensaje(`Archivo "${file.name}" cargado correctamente.`);
  };

  const abrirSelectorArchivo = () => {
    inputFileRef.current?.click();
  };

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
          placeholder="Buscar por nombre, correo o RUC..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 max-w-sm w-full"
        />

        <div className="flex space-x-4 flex-wrap">
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
            Nuevo Proveedor
          </button>
        </div>
      </div>

      {/* Zona Drag & Drop */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer mb-6
          ${dragActive ? "border-pink-600 bg-pink-50" : "border-gray-300 bg-white"}
        `}
        onClick={abrirSelectorArchivo}
        aria-label="Zona para subir archivo PDF"
      >
        <FiUpload className="mx-auto mb-2" style={{ fontSize: "2rem", color: "#ca5c71" }} />
        <p className="text-gray-600">
          Arrastra y suelta un archivo PDF aquí o haz clic para seleccionar.
        </p>
        <input
          ref={inputFileRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChangeFile}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Cerrar formulario"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
              {editId ? "Editar Proveedor" : "Agregar Proveedor"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                agregarProveedor();
              }}
              className="space-y-4"
            >
              <input
                name="nombre"
                type="text"
                value={nuevoProveedor.nombre}
                onChange={manejarCambio}
                placeholder="Nombre del proveedor"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
              <input
                name="telefono"
                type="text"
                value={nuevoProveedor.telefono}
                onChange={manejarCambio}
                placeholder="Teléfono"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
              <input
                name="correo"
                type="email"
                value={nuevoProveedor.correo}
                onChange={manejarCambio}
                placeholder="Correo electrónico"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
              <input
                name="direccion"
                type="text"
                value={nuevoProveedor.direccion}
                onChange={manejarCambio}
                placeholder="Dirección"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
              <input
                name="ruc"
                type="text"
                value={nuevoProveedor.ruc}
                onChange={manejarCambio}
                placeholder="RUC"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
              <select
                name="estado"
                value={nuevoProveedor.estado}
                onChange={manejarCambio}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    limpiarFormulario();
                    setShowForm(false);
                  }}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700 transition-colors"
                >
                  {editId ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de proveedores */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#ca5c71] text-white">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Correo
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Dirección
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                RUC
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Estado
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {proveedoresFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No hay proveedores que mostrar.
                </td>
              </tr>
            ) : (
              proveedoresFiltrados.map((proveedor) => (
                <tr key={proveedor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {proveedor.nombre}
                  </td>
                  <td className="px-6 py-4">{proveedor.telefono}</td>
                  <td className="px-6 py-4">{proveedor.correo}</td>
                  <td className="px-6 py-4">{proveedor.direccion}</td>
                  <td className="px-6 py-4">{proveedor.ruc}</td>
                  <td className="px-6 py-4">{proveedor.estado}</td>
                  <td className="px-6 py-4 flex justify-center space-x-4">
                    <button
                      onClick={() => editarProveedor(proveedor)}
                      aria-label={`Editar proveedor ${proveedor.nombre}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => eliminarProveedor(proveedor.id)}
                      aria-label={`Eliminar proveedor ${proveedor.nombre}`}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
