import { useState } from 'react';
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus
} from 'react-icons/fi';

interface Delivery {
  id_entrega: string;
  id_pedido: string;
  direccion_entrega: string;
  fecha: string;
  estado_entrega: 'pendiente' | 'en ruta' | 'entregado' | 'cancelado';
}

export default function CrudDelivery() {
  const [editDelivery, setEditDelivery] = useState<Delivery | null>(null);
  const [nuevaDelivery, setNuevaDelivery] = useState<Delivery | null>(null);
  const [deliveryVisualizar, setDeliveryVisualizar] = useState<Delivery | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([{
    id_entrega: 'D001',
    id_pedido: 'P001',
    direccion_entrega: 'Av. Salud 123',
    fecha: '2025-06-08',
    estado_entrega: 'pendiente'
  }]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updater = (prev: Delivery | null) => prev ? { ...prev, [name]: value } as Delivery : null;
    if (editDelivery) setEditDelivery(updater);
    if (nuevaDelivery) setNuevaDelivery(prev => updater(prev));
  };

  const handleSaveEdit = () => {
    if (editDelivery && editDelivery.id_entrega && editDelivery.id_pedido && editDelivery.direccion_entrega && editDelivery.fecha) {
      setDeliveries(prev => prev.map(d => d.id_entrega === editDelivery.id_entrega ? editDelivery : d));
      setEditDelivery(null);
    } else {
      alert('Todos los campos deben estar completos.');
    }
  };

  const handleAddNueva = () => {
    if (nuevaDelivery && nuevaDelivery.id_entrega && nuevaDelivery.id_pedido && nuevaDelivery.direccion_entrega && nuevaDelivery.fecha) {
      setDeliveries(prev => [...prev, nuevaDelivery]);
      setNuevaDelivery(null);
    } else {
      alert('Todos los campos deben estar completos.');
    }
  };

  const eliminarDelivery = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta entrega?')) {
      setDeliveries(prev => prev.filter(d => d.id_entrega !== id));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#4E1F00]">Gestión de Delivery</h1>
        <button
          onClick={() => setNuevaDelivery({ id_entrega: '', id_pedido: '', direccion_entrega: '', fecha: '', estado_entrega: 'pendiente' })}
          className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
        >
          <FiPlus className="mr-2" /> Nueva Entrega
        </button>
      </div>

      <div className="bg-[#f9f6f4] rounded-xl shadow-lg overflow-hidden mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8e1e5]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">ID Entrega</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">ID Pedido</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Dirección</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
            {deliveries.map((d) => (
              <tr key={d.id_entrega} className="hover:bg-[#f4efed] transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{d.id_entrega}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{d.id_pedido}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{d.direccion_entrega}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{d.fecha}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{d.estado_entrega}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => setEditDelivery(d)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                      <FiEdit /></button>
                    <button onClick={() => eliminarDelivery(d.id_entrega)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                      <FiTrash2 /></button>
                    <button onClick={() => setDeliveryVisualizar(d)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                      <FiEye /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edición / Nueva */}
      {(editDelivery || nuevaDelivery) && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">
              {editDelivery ? 'Editar Entrega' : 'Nueva Entrega'}
            </h2>
            <form onSubmit={e => { e.preventDefault(); editDelivery ? handleSaveEdit() : handleAddNueva(); }}>
              {['id_entrega', 'id_pedido', 'direccion_entrega', 'fecha'].map(field => (
                <div key={field}>
                  <label className="block mb-2 font-semibold text-gray-700 capitalize">{field.replace('_', ' ')}</label>
                  <input
                    type={field === 'fecha' ? 'date' : 'text'}
                    name={field}
                    value={editDelivery ? editDelivery[field as keyof Delivery] : nuevaDelivery?.[field as keyof Delivery] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Estado de Entrega</label>
                <select
                  name="estado_entrega"
                  value={editDelivery ? editDelivery.estado_entrega : nuevaDelivery?.estado_entrega || 'pendiente'}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en ruta">En ruta</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => { setEditDelivery(null); setNuevaDelivery(null); }} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700">Guardar</button>
              </div>
            </form>
            <button onClick={() => { setEditDelivery(null); setNuevaDelivery(null); }} className="absolute top-2 right-2 text-gray-500 hover:text-[#4E1F00] text-lg">✕</button>
          </div>
        </div>
      )}

      {/* Modal Visualización */}
      {deliveryVisualizar && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-[#4E1F00]">Detalles de la Entrega</h2>
            <div className="space-y-4">
              <p><strong>ID Entrega:</strong> {deliveryVisualizar.id_entrega}</p>
              <p><strong>ID Pedido:</strong> {deliveryVisualizar.id_pedido}</p>
              <p><strong>Dirección:</strong> {deliveryVisualizar.direccion_entrega}</p>
              <p><strong>Fecha:</strong> {deliveryVisualizar.fecha}</p>
              <p><strong>Estado:</strong> {deliveryVisualizar.estado_entrega}</p>
            </div>
            <button onClick={() => setDeliveryVisualizar(null)} className="absolute top-2 right-2 text-gray-500 hover:text-[#4E1F00] text-lg">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
