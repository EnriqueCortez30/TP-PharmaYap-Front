import React, { useState, useEffect } from "react";

type Proveedor = {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  tipoProveedor: string;
  estado: string;
};

const proveedoresIniciales: Proveedor[] = [
  {
    id: 1,
    nombre: "Distribuidora Salud S.A.",
    telefono: "01 234 5678",
    email: "contacto@saludsa.com",
    direccion: "Av. Salud 123, Lima",
    tipoProveedor: "Local",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Farmasupplies Ltda.",
    telefono: "01 987 6543",
    email: "ventas@farmasupplies.com",
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
    email: "",
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
      email: "",
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
      !nuevoProveedor.email.trim() ||
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
      email: p.email,
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
      "Email",
      "Dirección",
      "Tipo de Proveedor",
      "Estado",
    ];

    const filas = proveedoresExport.map((p) => [
      p.nombre,
      p.telefono,
      p.email,
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

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-red-700">Gestión de Proveedores</h1>

      {mensaje && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {mensaje}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <button
          onClick={() => {
            limpiarFormulario();
            setShowForm(!showForm);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {showForm ? "Cancelar" : editId !== null ? "Editar Proveedor" : "Agregar Proveedor"}
        </button>

        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 max-w-sm w-full"
        />

        <button
          onClick={() => exportarCSV(proveedoresFiltrados)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar a CSV
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 bg-white rounded shadow">
        <thead>
          <tr className="bg-red-100 text-red-900">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Teléfono</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Dirección</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresFiltrados.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No se encontraron proveedores
              </td>
            </tr>
          )}
          {proveedoresFiltrados.map((p) => (
            <tr key={p.id} className="hover:bg-red-50">
              <td className="border border-gray-300 px-4 py-2">{p.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{p.telefono}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(p.email)}`}
                  className="text-blue-600 hover:underline flex items-center space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Enviar correo a ${p.email} via Gmail`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12H8m8 0a4 4 0 00-8 0m8 0v4m0-4v-4a4 4 0 10-8 0v4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l9 6 9-6"
                    />
                  </svg>
                  <span>{p.email}</span>
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{p.direccion}</td>
              <td className="border border-gray-300 px-4 py-2">{p.tipoProveedor}</td>
              <td className="border border-gray-300 px-4 py-2">{p.estado}</td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => editarProveedor(p)}
                  className="bg-yellow-400 text-red-700 px-3 py-1 rounded hover:bg-yellow-300"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => eliminarProveedor(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
