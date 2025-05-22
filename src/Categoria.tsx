import { useState } from 'react';
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus
} from 'react-icons/fi';

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
}

export default function CrudCategoria() {
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);
  const [nuevaCategoria, setNuevaCategoria] = useState<Categoria | null>(null);
  const [categoriaVisualizar, setCategoriaVisualizar] = useState<Categoria | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 'C001', nombre: 'Analgésicos', descripcion: 'Medicamentos para el dolor' },
    { id: 'C002', nombre: 'Antibióticos', descripcion: 'Tratamiento contra infecciones' },
  ]);

  const soloLetras = (valor: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditCategoria(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleNuevaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({
      ...(prev || { id: '', nombre: '', descripcion: '' }),
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    if (
      editCategoria &&
      editCategoria.id &&
      soloLetras(editCategoria.nombre) &&
      soloLetras(editCategoria.descripcion)
    ) {
      setCategorias(prev => prev.map(c => c.id === editCategoria.id ? editCategoria : c));
      setEditCategoria(null);
    } else {
      alert('Todos los campos deben ser válidos. Solo letras para nombre y descripción.');
    }
  };

  const handleAddNueva = () => {
    if (
      nuevaCategoria &&
      nuevaCategoria.id &&
      soloLetras(nuevaCategoria.nombre) &&
      soloLetras(nuevaCategoria.descripcion)
    ) {
      setCategorias(prev => [...prev, nuevaCategoria]);
      setNuevaCategoria(null);
    } else {
      alert('Todos los campos deben ser válidos. Solo letras para nombre y descripción.');
    }
  };

  const eliminarCategoria = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      setCategorias(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Categorías</h1>
        <button
          onClick={() => setNuevaCategoria({ id: '', nombre: '', descripcion: '' })}
          className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
        >
          <FiPlus className="mr-2" /> Nueva Categoría
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8e1e5]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Nombre Categoría</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Descripción</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{categoria.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{categoria.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{categoria.descripcion}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => setEditCategoria(categoria)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"><FiEdit /></button>
                    <button onClick={() => eliminarCategoria(categoria.id)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"><FiTrash2 /></button>
                    <button onClick={() => setCategoriaVisualizar(categoria)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"><FiEye /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edición / Nueva */}
      {(editCategoria || nuevaCategoria) && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">
              {editCategoria ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <form onSubmit={e => { e.preventDefault(); editCategoria ? handleSaveEdit() : handleAddNueva(); }}>
              {['id', 'nombre', 'descripcion'].map(field => (
                <div key={field}>
                  <label className="block mb-2 font-semibold text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={editCategoria ? editCategoria[field as keyof Categoria] : nuevaCategoria?.[field as keyof Categoria] || ''}
                    onChange={editCategoria ? handleEditChange : handleNuevaChange}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => { setEditCategoria(null); setNuevaCategoria(null); }} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700">Guardar</button>
              </div>
            </form>
            <button onClick={() => { setEditCategoria(null); setNuevaCategoria(null); }} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">✕</button>
          </div>
        </div>
      )}

      {/* Modal Visualización */}
      {categoriaVisualizar && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Detalles de Categoría</h2>
            <div className="space-y-4">
              <p><strong>ID:</strong> {categoriaVisualizar.id}</p>
              <p><strong>Nombre:</strong> {categoriaVisualizar.nombre}</p>
              <p><strong>Descripción:</strong> {categoriaVisualizar.descripcion}</p>
            </div>
            <button onClick={() => setCategoriaVisualizar(null)} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
