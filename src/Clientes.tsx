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
    { género: 'Femenino', cantidad: clientes.filter(c => c['género'] === 'Femenino').length },
    { género: 'Masculino', cantidad: clientes.filter(c => c['género'] === 'Masculino').length },
    { género: 'Otro', cantidad: clientes.filter(c => c['género'] === 'Otro').length },
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
                  <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-[#ca5c71] uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map((cliente) => {
                const isActive = cliente.estado_cuenta === 'Activo';
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
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ca5c71] relative transition-all">
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
                          </div>
                        </label>

                        <div className={!isActive ? 'pointer-events-none' : ''}>
                          <button onClick={() => setEditCliente(cliente)} className="mr-2 text-gray-600 hover:text-[#ca5c71]">
                            <FiEdit />
                          </button>
                          <button onClick={() => setDeleteCliente(cliente)} className="text-gray-600 hover:text-red-500">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-sm text-gray-500">
            <span>Mostrando {clientes.length} de {clientes.length} registros</span>
            <div className="flex space-x-4">
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Generos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rolesChartData}>
              <XAxis dataKey="género" stroke="#ca5c71" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#ca5c71" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Modal Agregar Cliente */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
              <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Agregar Nuevo Cliente</h2>
              <form onSubmit={e => { e.preventDefault(); handleAgregarCliente(); }}>
                {[
                  ['nombre', 'Nombre'],
                  ['apellido', 'Apellido'],
                  ['correo_electronico', 'Correo Electrónico'],
                  ['contrasena', 'Contraseña'],
                  ['dni', 'DNI'],
                  ['teléfono', 'Teléfono'],
                  ['dirección', 'Dirección'],
                  ['fecha_nacimiento', 'Fecha de Nacimiento'],
                ].map(([key, label]) => (
                  <div key={key} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type={key === 'fecha_nacimiento' ? 'date' : 'text'}
                      name={key}
                      value={nuevoCliente[key]}
                      onChange={handleNuevoClienteChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                ))}

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Género</label>
                  <select
                    name="género"
                    value={nuevoCliente.género}
                    onChange={handleNuevoClienteChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-md border border-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#ca5c71] text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </form>

              <button
                onClick={() => setShowModal(false)}
                className="absolute
 top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
      >
        ✕
      </button>
    </div>
  </div>
)}

        {editCliente && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
              <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Editar Cliente</h2>
           <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }}>
  {[
    ['nombre', 'Nombre'],
    ['apellido', 'Apellido'],
    ['correo_electronico', 'Correo Electrónico'],
    ['contrasena', 'Contraseña'],
    ['dni', 'DNI'],
    ['teléfono', 'Teléfono'],
    ['dirección', 'Dirección'],
    ['fecha_nacimiento', 'Fecha de Nacimiento']
  ].map(([key, label]) => (
    <div key={key} className="mb-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={key}
        value={editCliente[key]}
        onChange={handleEditChange}
        className="w-full border border-gray-300 rounded-md p-2"
        required
      />
    </div>
  ))}

  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700">Género</label>
    <select
      name="género"
      value={editCliente.género}
      onChange={handleEditChange}
      className="w-full border border-gray-300 rounded-md p-2"
    >
      <option value="Masculino">Masculino</option>
      <option value="Femenino">Femenino</option>
      <option value="Otro">Otro</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700">Estado de Cuenta</label>
   <label className="inline-flex items-center cursor-pointer mt-2">
  <input
    type="checkbox"
    name="estado_cuenta"
    className="sr-only peer"
    checked={editCliente.estado_cuenta === 'Activo'}
    onChange={() =>
      setEditCliente({
        ...editCliente,
        estado_cuenta: editCliente.estado_cuenta === 'Activo' ? 'Inactivo' : 'Activo'
      })
    }
  />
  <div className="w-11 h-6 bg-gray-300 rounded-full relative peer-checked:bg-[#ca5c71] transition-colors duration-300">
    <div
      className="
        absolute top-0.5 left-0.5
        w-5 h-5 bg-white rounded-full
        transition-all duration-300
        peer-checked:left-[1.625rem]
      "
    />
  </div>
  <span className="ml-3 text-sm">{editCliente.estado_cuenta}</span>
</label>


  </div>

  <button type="submit" className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700">
    Guardar Cambios
  </button>
</form>



              <button
                onClick={() => setEditCliente(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {deleteCliente && (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
      <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">¿Eliminar Cliente?</h2>
      <p className="text-gray-700 mb-6">
        ¿Estás seguro de que deseas eliminar a <span className="font-semibold">{deleteCliente.nombre}</span>?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setDeleteCliente(null)}
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirmDelete}
          className="px-4 py-2 text-sm font-medium rounded-md bg-[#ca5c71] text-white hover:bg-pink-700"
        >
          Eliminar
        </button>
      </div>
      <button
        onClick={() => setDeleteCliente(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
      >
        ✕
      </button>
    </div>
  </div>
)}

      </main>
    </div>
    
  )
}

export default Clientes
