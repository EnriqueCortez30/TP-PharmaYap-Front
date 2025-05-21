import { useState } from 'react';
import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiUsers,
  FiShoppingBag,
  FiTruck,
  FiSearch,
  FiBell,
  FiGrid,
  FiPlus,
  FiEye
} from 'react-icons/fi';

interface Producto {
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  receta: string;
  imagen: string;
}

function App() {
  const [editProducto, setEditProducto] = useState<Producto | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto | null>(null);
  const [productoVisualizar, setProductoVisualizar] = useState<Producto | null>(null);
  const [productos, setProductos] = useState<Producto[]>([
    {
      codigo: 'P001',
      nombre: 'Paracetamol 500mg',
      categoria: 'Analgésicos',
      subcategoria: 'Tabletas',
      receta: 'No',
      imagen: 'https://juntozstgsrvproduction.blob.core.windows.net/default-blob-images/orig_169958385121716995838450921699583846256_112310.jpg',
    },
    {
      codigo: 'P002',
      nombre: 'Amoxicilina 500mg',
      categoria: 'Antibióticos',
      subcategoria: 'Cápsulas',
      receta: 'Sí',
      imagen: 'https://farmaciauniversalpe.vtexassets.com/arquivos/ids/159754/22598_1.jpg?v=638591217736430000',
    },
  ]);

  const soloLetras = (valor: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
  const isURL = (valor: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(valor);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProducto((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleNuevoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...(prev || { codigo: '', nombre: '', categoria: '', subcategoria: '', receta: '', imagen: '' }), [name]: value }));
  };

  const handleSaveEdit = () => {
    if (
      editProducto &&
      editProducto.codigo &&
      editProducto.nombre &&
      soloLetras(editProducto.categoria) &&
      soloLetras(editProducto.subcategoria) &&
      soloLetras(editProducto.receta) &&
      isURL(editProducto.imagen)
    ) {
      setProductos(prev =>
        prev.map(p => (p.codigo === editProducto.codigo ? editProducto : p))
      );
      setEditProducto(null);
    } else {
      alert('Todos los campos deben ser válidos. Solo letras para campos de texto y una URL válida para la imagen.');
    }
  };

  const handleAddNuevo = () => {
    if (
      nuevoProducto &&
      nuevoProducto.codigo &&
      nuevoProducto.nombre &&
      soloLetras(nuevoProducto.categoria) &&
      soloLetras(nuevoProducto.subcategoria) &&
      soloLetras(nuevoProducto.receta) &&
      isURL(nuevoProducto.imagen)
    ) {
      setProductos(prev => [...prev, nuevoProducto]);
      setNuevoProducto(null);
    } else {
      alert('Todos los campos deben ser válidos. Solo letras para campos de texto y una URL válida para la imagen.');
    }
  };

  const eliminarProducto = (codigo: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProductos(productos.filter(producto => producto.codigo !== codigo));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <img
                src="public/LOGO_PHARMAYAP PNG.png"
                alt="PharmaYap Logo"
                className="h-16 w-auto mr-6"
              />
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium"><FiShoppingBag className="mr-1" /> Productos</a>
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium"><FiGrid className="mr-1" /> Categorías</a>
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium"><FiUser className="mr-1" /> Usuarios</a>
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium"><FiTruck className="mr-1" /> Proveedores</a>
                <a href="#" className="text-gray-600 hover:text-[#ca5c71] inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-[#ca5c71] text-sm font-medium"><FiUsers className="mr-1" /> Trabajadores</a>
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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <FiShoppingBag className="text-[#ca5c71] text-2xl mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
          </div>
          <button
            onClick={() => setNuevoProducto({
              codigo: '',
              nombre: '',
              categoria: '',
              subcategoria: '',
              receta: '',
              imagen: ''
            })}
            className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
          >
            <FiPlus className="mr-2" /> Nuevo Producto
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#f8e1e5]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Código</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Categoría</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Subcategoría</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Receta</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Imagen</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map((producto) => (
                <tr key={producto.codigo} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{producto.codigo}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{producto.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{producto.categoria}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{producto.subcategoria}</td>
                  <td className="px-6 py-4 text-sm">{producto.receta}</td>
                  <td className="px-6 py-4">
                    <img src={producto.imagen} alt={producto.nombre} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-3">
                      <button onClick={() => setEditProducto(producto)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                        <FiEdit />
                      </button>
                      <button onClick={() => eliminarProducto(producto.codigo)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                        <FiTrash2 />
                      </button>
                      <button onClick={() => setProductoVisualizar(producto)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Edición o Nuevo */}
        {(editProducto || nuevoProducto) && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
              <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">
                {editProducto ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  editProducto ? handleSaveEdit() : handleAddNuevo();
                }}
              >
                {['codigo', 'nombre', 'categoria', 'subcategoria', 'receta', 'imagen'].map(field => (
                  <div key={field}>
                    <label className="block mb-2 font-semibold text-gray-700 capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      value={editProducto ? editProducto[field as keyof Producto] : nuevoProducto?.[field as keyof Producto] || ''}
                      onChange={editProducto ? handleEditChange : handleNuevoChange}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                      required
                    />
                  </div>
                ))}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditProducto(null);
                      setNuevoProducto(null);
                    }}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
              <button
                onClick={() => {
                  setEditProducto(null);
                  setNuevoProducto(null);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Modal de Visualización */}
        {productoVisualizar && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
              <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Detalles del Producto</h2>
              <div className="space-y-4">
                <p><strong>Código:</strong> {productoVisualizar.codigo}</p>
                <p><strong>Nombre:</strong> {productoVisualizar.nombre}</p>
                <p><strong>Categoría:</strong> {productoVisualizar.categoria}</p>
                <p><strong>Subcategoría:</strong> {productoVisualizar.subcategoria}</p>
                <p><strong>Receta:</strong> {productoVisualizar.receta}</p>
                <div>
                  <strong>Imagen:</strong>
                  <img
                    src={productoVisualizar.imagen}
                    alt={productoVisualizar.nombre}
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                </div>
              </div>
              <button
                onClick={() => setProductoVisualizar(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
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

export default App;
