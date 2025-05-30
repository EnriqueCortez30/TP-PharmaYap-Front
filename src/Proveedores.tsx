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
  ruc: string;
  estado: string;
  archivos: File[]; // Guardamos archivos completos
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
    archivos: [],
  },
  {
    id: 2,
    nombre: "Farmasupplies Ltda.",
    telefono: "01 987 6543",
    correo: "ventas@farmasupplies.com",
    direccion: "Jr. Medicinas 456, Lima",
    ruc: "20456789123",
    estado: "Activo",
    archivos: [],
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
    archivos: [],
  });

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
      archivos: [],
    });
    setArchivos([]);
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
      archivos: p.archivos || [],
    });
    setArchivos(p.archivos || []);
    setEditId(p.id);
    setShowForm(true);
  };

  const manejarDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const archivosArr = Array.from(e.dataTransfer.files);

    const nuevosArchivos = archivosArr.filter(
      (archivo) => !archivos.some((a) => a.name === archivo.name && a.size === archivo.size)
    );

    const actualizados = [...archivos, ...nuevosArchivos];
    setArchivos(actualizados);
    setNuevoProveedor(prev => ({ ...prev, archivos: actualizados }));
  };

  const manejarDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const eliminarArchivo = (index: number) => {
    const actualizados = archivos.filter((_, i) => i !== index);
    setArchivos(actualizados);
    setNuevoProveedor(prev => ({ ...prev, archivos: actualizados }));
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
      "Archivos",
    ];

    const filas = proveedoresExport.map((p) => [
      p.nombre,
      p.telefono,
      p.correo,
      p.direccion,
      p.ruc,
      p.estado,
      p.archivos.map(a => a.name).join(", "),
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
    const columnas = ["Nombre", "Teléfono", "Correo", "Dirección", "RUC", "Estado", "Archivos"];
    const filas = proveedoresFiltrados.map(p => [
      p.nombre,
      p.telefono,
      p.correo,
      p.direccion,
      p.ruc,
      p.estado,
      p.archivos.map(a => a.name).join(", "),
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

            {/* Drag & Drop area */}
            <div
              onDrop={manejarDrop}
              onDragOver={manejarDragOver}
              className="mt-8 p-6 border-2 border-dashed border-[#ca5c71] rounded-lg text-center cursor-pointer hover:bg-[#fce9eb] transition-colors"
            >
              <p className="text-[#ca5c71] font-semibold mb-1">Arrastra y suelta archivos aquí</p>
              <p className="text-gray-600 text-sm">o selecciónalos desde tu explorador</p>
              <input
                type="file"
                multiple
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  if (!e.target.files) return;
                  const nuevos = Array.from(e.target.files);
                  const actualizados = [...archivos, ...nuevos];
                  setArchivos(actualizados);
                  setNuevoProveedor(prev => ({ ...prev, archivos: actualizados }));
                }}
              />
              <label
                htmlFor="fileInput"
                className="mt-2 inline-block bg-[#ca5c71] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#a6535c]"
              >
                Seleccionar archivos
              </label>
            </div>

            {/* Tabla archivos en modal */}
            {archivos.length > 0 && (
              <table className="w-full mt-6 text-left border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-[#f8e1e5]">
                  <tr>
                    <th className="px-4 py-2 text-sm font-semibold text-[#ca5c71]">Nombre</th>
                    <th className="px-4 py-2 text-sm font-semibold text-[#ca5c71]">Tipo</th>
                    <th className="px-4 py-2 text-sm font-semibold text-[#ca5c71] text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {archivos.map((archivo, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-300 hover:bg-[#fce9eb] transition-colors"
                    >
                      <td className="px-4 py-2 text-sm">{archivo.name}</td>
                      <td className="px-4 py-2 text-sm">{archivo.type || "Desconocido"}</td>
                      <td className="px-4 py-2 text-sm text-center">
                        <button
                          onClick={() => eliminarArchivo(index)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                          title="Eliminar archivo"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#ca5c71] uppercase tracking-wider">RUC</th>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.ruc}</td>
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
