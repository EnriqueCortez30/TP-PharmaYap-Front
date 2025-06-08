import { useState } from 'react'
import { FiEdit, FiTrash2, FiUser, FiUsers } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import toast, { Toaster } from 'react-hot-toast'

function Clientes() {
  const [showModal, setShowModal] = useState(false)

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    contrasena: '',
    dni: '',
    teléfono: '',
    dirección: '',
    fecha_nacimiento: '',
    género: 'Masculino',
    fecha_registro: new Date().toISOString().slice(0, 10),
    estado_cuenta: 'Activo',
  })

  const [clientes, setClientes] = useState([
    {
      id_usuario: 1,
      nombre: 'Mono',
      apellido: 'Tolstoi',
      correo_electronico: 'Mono@pharmayap.com',
      contrasena: 'asdfa',
      dni: '22222222',
      teléfono: '92222222',
      dirección: 'Av. Jungla 123',
      fecha_nacimiento: '1990-01-01',
      género: 'Masculino',
      fecha_registro: '2023-01-10',
      estado_cuenta: 'Activo'
    },
    {
      id_usuario: 2,
      nombre: 'Mona',
      apellido: 'López',
      correo_electronico: 'Mona@pharmayap.com',
      contrasena: 'asdf',
      dni: '33333333',
      teléfono: '933333333',
      dirección: 'Calle Sabana 456',
      fecha_nacimiento: '1995-06-15',
      género: 'Femenino',
      fecha_registro: '2023-03-22',
      estado_cuenta: 'Activo'
    },
  ])

  const [editCliente, setEditCliente] = useState(null)
  const [deleteCliente, setDeleteCliente] = useState(null)

  const rolesChartData = [
    { género: 'Femenino', cantidad: clientes.filter(c => c.género === 'Femenino').length },
    { género: 'Masculino', cantidad: clientes.filter(c => c.género === 'Masculino').length },
    { género: 'Otro', cantidad: clientes.filter(c => c.género === 'Otro').length },
  ]

  const handleNuevoClienteChange = (e) => {
    const { name, value } = e.target
    setNuevoCliente(prev => ({ ...prev, [name]: value }))
  }

  const validarCliente = (cliente) => {
    const errores = []

    // Validación de correo
    if (!cliente.correo_electronico.includes('@')) {
      errores.push('El correo debe contener "@"')
    }

    // Validación de DNI (solo números)
    if (!/^\d+$/.test(cliente.dni)) {
      errores.push('El DNI debe contener solo números')
    }

    // Validación de teléfono (solo números)
    if (!/^\d+$/.test(cliente.teléfono)) {
      errores.push('El teléfono debe contener solo números')
    }

    if (errores.length > 0) {
      toast.error(errores.join('\n'))
      return false
    }

    return true
  }

  const handleAgregarCliente = () => {
    if (!validarCliente(nuevoCliente)) return

    const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id_usuario)) + 1 : 1
    setClientes(prev => [...prev, { ...nuevoCliente, id_usuario: nuevoId }])
    setNuevoCliente({
      nombre: '',
      apellido: '',
      correo_electronico: '',
      contrasena: '',
      dni: '',
      teléfono: '',
      dirección: '',
      fecha_nacimiento: '',
      género: 'Masculino',
      fecha_registro: new Date().toISOString().slice(0, 10),
      estado_cuenta: 'Activo',
    })
    setShowModal(false)
    toast.success('Cliente agregado con éxito 🎉')
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditCliente(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveEdit = () => {
    if (!validarCliente(editCliente)) return

    setClientes(prev =>
      prev.map(c => (c.id_usuario === editCliente.id_usuario ? editCliente : c))
    )
    setEditCliente(null)
    toast.success('Cliente actualizado correctamente ✨')
  }

  const toggleEstado = (id_usuario) => {
    setClientes(prev =>
      prev.map(c =>
        c.id_usuario === id_usuario
          ? { ...c, estado_cuenta: c.estado_cuenta === 'Activo' ? 'Inactivo' : 'Activo' }
          : c
      )
    )
  }

  const handleConfirmDelete = () => {
    setClientes(prev => prev.filter(c => c.id_usuario !== deleteCliente.id_usuario))
    toast.success(`Cliente "${deleteCliente.nombre}" eliminado 😢`)
    setDeleteCliente(null)
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" reverseOrder={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <FiUsers className="text-[#ca5c71] text-2xl mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Clientes</h1>
          </div>
          <button
            className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
            onClick={() => setShowModal(true)}
          >
            <FiUser className="mr-2" /> Agregar Cliente
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#f8e1e5]">
              <tr>
                {[
                  'Nombre', 'Apellido', 'Correo Electrónico', 'DNI', 'Teléfono',
                  'Dirección', 'Fecha Nacimiento', 'Género', 'Fecha Registro', 'Acciones'
                ].map(header => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-sm font-semibold text-[#ca5c71] uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map((cliente) => {
                const isActive = cliente.estado_cuenta === 'Activo'
                return (
                  <tr
                    key={cliente.id_usuario}
                    className={`transition-colors ${isActive ? 'bg-white' : 'bg-gray-100 opacity-50'}`}
                  >
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.nombre}</div></td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.apellido}</div></td>
                    <td className="px-4 py-3">
                      <div className={!isActive ? 'pointer-events-none' : ''}>
                        <a href={`mailto:${cliente.correo_electronico}`} className="text-[#ca5c71] hover:text-pink-700">
                          {cliente.correo_electronico}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.dni}</div></td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.teléfono}</div></td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.dirección}</div></td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.fecha_nacimiento}</div></td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.género}</div></td>
                    <td className="px-4 py-3"><div className={!isActive ? 'pointer-events-none' : ''}>{cliente.fecha_registro}</div></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isActive}
                            onChange={() => toggleEstado(cliente.id_usuario)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-pink-700 relative transition-colors"></div>
                        </label>

                        <button
                          onClick={() => setEditCliente(cliente)}
                          title="Editar Cliente"
                          className="text-[#ca5c71] hover:text-pink-700"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => setDeleteCliente(cliente)}
                          title="Eliminar Cliente"
                          className="text-[#ca5c71] hover:text-pink-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Gráfico de barras */}
        <div className="w-full h-64 bg-white rounded-lg shadow-lg p-4 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Cantidad de clientes por género</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rolesChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="género" stroke="#ca5c71" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#ca5c71" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* Modal para agregar cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-[#ca5c71]">Agregar Nuevo Cliente</h2>

            <form
              onSubmit={e => {
                e.preventDefault()
                handleAgregarCliente()
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto"
            >
              <input
                name="nombre"
                type="text"
                placeholder="Nombre"
                value={nuevoCliente.nombre}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="apellido"
                type="text"
                placeholder="Apellido"
                value={nuevoCliente.apellido}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="correo_electronico"
                type="email"
                placeholder="Correo electrónico"
                value={nuevoCliente.correo_electronico}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                value={nuevoCliente.contrasena}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="dni"
                type="text"
                placeholder="DNI"
                value={nuevoCliente.dni}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="teléfono"
                type="text"
                placeholder="Teléfono"
                value={nuevoCliente.teléfono}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="dirección"
                type="text"
                placeholder="Dirección"
                value={nuevoCliente.dirección}
                onChange={handleNuevoClienteChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="fecha_nacimiento"
                type="date"
                placeholder="Fecha de nacimiento"
                value={nuevoCliente.fecha_nacimiento}
                onChange={handleNuevoClienteChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <select
                name="género"
                value={nuevoCliente.género}
                onChange={handleNuevoClienteChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>

              <select
                name="estado_cuenta"
                value={nuevoCliente.estado_cuenta}
                onChange={handleNuevoClienteChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>

              <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
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
          </div>
        </div>
      )}

      {/* Modal para editar cliente */}
      {editCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-[#ca5c71]">Editar Cliente</h2>

            <form
              onSubmit={e => {
                e.preventDefault()
                handleSaveEdit()
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto"
            >
              <input
                name="nombre"
                type="text"
                placeholder="Nombre"
                value={editCliente.nombre}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="apellido"
                type="text"
                placeholder="Apellido"
                value={editCliente.apellido}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="correo_electronico"
                type="email"
                placeholder="Correo electrónico"
                value={editCliente.correo_electronico}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                value={editCliente.contrasena}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="dni"
                type="text"
                placeholder="DNI"
                value={editCliente.dni}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="teléfono"
                type="text"
                placeholder="Teléfono"
                value={editCliente.teléfono}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="dirección"
                type="text"
                placeholder="Dirección"
                value={editCliente.dirección}
                onChange={handleEditChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                name="fecha_nacimiento"
                type="date"
                placeholder="Fecha de nacimiento"
                value={editCliente.fecha_nacimiento}
                onChange={handleEditChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <select
                name="género"
                value={editCliente.género}
                onChange={handleEditChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>

              <select
                name="estado_cuenta"
                value={editCliente.estado_cuenta}
                onChange={handleEditChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>

              <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setEditCliente(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {deleteCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-[#ca5c71]">
              Confirmar eliminación
            </h2>
            <p>¿Estás seguro que deseas eliminar al cliente <strong>{deleteCliente.nombre} {deleteCliente.apellido}</strong>?</p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setDeleteCliente(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clientes
