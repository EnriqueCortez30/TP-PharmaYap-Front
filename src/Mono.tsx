
import React from "react";

interface MonoProps {
  setVista: (vista: 'clientes' | 'mono') => void;
}

const Mono: React.FC<MonoProps> = ({ setVista }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Probando vaina</h2>
        <p className="text-sm text-gray-600 mb-4">Terrible Suceso</p>
        <img
          src="https://i.pinimg.com/originals/4a/03/0d/4a030d84698b00cfa5dd36caae14795a.gif"
          alt="Ejemplo"
          className="w-full rounded-md mb-4"
        />
        <button
          onClick={() => setVista('clientes')}
          className="mt-2 px-4 py-2 bg-[#ca5c71] text-white rounded hover:bg-[#b25262] transition"
        >
          ← Volver a Clientes
        </button>
      </div>
    </div>
  );
};

export default Mono;
