import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Ícono de confirmación

const PurchaseConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-30 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all max-w-lg w-full">
        {/* Encabezado con gradiente e ícono */}
        <div className="relative p-6 bg-gradient-to-r from-[#c85c73] to-pink-500">
          {/* Contenedor circular para el ícono */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <FaCheckCircle className="text-[#c85c73] text-3xl" />
            </div>
          </div>
          <h2 className="mt-10 text-2xl font-bold text-white text-center">
            Compra Confirmada
          </h2>
          <p className="mt-2 text-center text-white">
            Gracias por su compra, su transacción fue exitosa.
          </p>
        </div>
        {/* Contenido inferior con botón */}
        <div className="p-6 bg-white">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Generar Boleta
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
