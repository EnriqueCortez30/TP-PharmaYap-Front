import React from "react";
import { useState } from 'react'
import reactLogo from '.assets/LOGO_PHARMAYAP PNG(1).png'
import viteLogo from '/vite.svg'
import { ShoppingCart, LogIn, Search } from "lucide-react";
import './index.css' 

const categories = [
  "Todos",
  "Cuidado de articulaciones",
  "Cuidado de la diabetes",
  "Cuidado renal",
  "Cuidado del hígado",
  "Cuidado respiratorio",
  "Cuidado de los ojos",
  "Salud digestiva",
  "Cuidado cardiovascular",
  "Suplementos vitamínicos",
];

const allProducts = [
  {
    id: 1,
    name: "Calcium Tablets",
    description: "Ayuda a fortalecer huesos y articulaciones.",
    category: "Cuidado de articulaciones",
    price: 80,
    stock: 12,
    image: "https://i.imgur.com/q3YB3t1.jpg",
  },
  {
    id: 2,
    name: "Joint Cream",
    description: "Alivia rápidamente el dolor articular.",
    category: "Cuidado de articulaciones",
    price: 60,
    stock: 10,
    image: "https://i.imgur.com/t3vbZss.jpg",
  },
  {
    id: 3,
    name: "Glucose Monitor",
    description: "Monitoreo de glucosa preciso en casa.",
    category: "Cuidado de la diabetes",
    price: 150,
    stock: 6,
    image: "https://i.imgur.com/8VR4E1S.jpg",
  },
  {
    id: 4,
    name: "Insulin Pen",
    description: "Inyector de insulina fácil de usar.",
    category: "Cuidado de la diabetes",
    price: 110,
    stock: 8,
    image: "https://i.imgur.com/7J2nUqD.jpg",
  },
  {
    id: 5,
    name: "Kidney Flush",
    description: "Apoya la limpieza renal.",
    category: "Cuidado renal",
    price: 90,
    stock: 5,
    image: "https://i.imgur.com/GkBdS8f.jpg",
  },
  {
    id: 6,
    name: "Liver Detox",
    description: "Favorece el buen funcionamiento del hígado.",
    category: "Cuidado del hígado",
    price: 95,
    stock: 4,
    image: "https://i.imgur.com/OEIk7qH.jpg",
  },
  {
    id: 7,
    name: "Inhaler",
    description: "Alivio rápido para problemas respiratorios.",
    category: "Cuidado respiratorio",
    price: 70,
    stock: 9,
    image: "https://i.imgur.com/6QK3MJS.jpg",
  },
  {
    id: 8,
    name: "Eye Drops",
    description: "Alivia ojos secos e irritados.",
    category: "Cuidado de los ojos",
    price: 30,
    stock: 15,
    image: "https://i.imgur.com/RGepPVy.jpg",
  },
  {
    id: 9,
    name: "Digestive Enzyme",
    description: "Mejora la digestión después de las comidas.",
    category: "Salud digestiva",
    price: 50,
    stock: 11,
    image: "https://i.imgur.com/YoJK1nk.jpg",
  },
  {
    id: 10,
    name: "Probiotic Complex",
    description: "Fortalece la flora intestinal.",
    category: "Salud digestiva",
    price: 65,
    stock: 7,
    image: "https://i.imgur.com/Tlf3nVD.jpg",
  },
  {
    id: 11,
    name: "Omega 3",
    description: "Mejora la salud cardiovascular.",
    category: "Cuidado cardiovascular",
    price: 85,
    stock: 10,
    image: "https://i.imgur.com/0J5x2L3.jpg",
  },
  {
    id: 12,
    name: "Blood Pressure Monitor",
    description: "Mide la presión arterial de forma precisa.",
    category: "Cuidado cardiovascular",
    price: 120,
    stock: 6,
    image: "https://i.imgur.com/SnJiKMS.jpg",
  },
  {
    id: 13,
    name: "Vitamin C 1000mg",
    description: "Apoya el sistema inmunológico.",
    category: "Suplementos vitamínicos",
    price: 40,
    stock: 18,
    image: "https://i.imgur.com/r0jD4BB.jpg",
  },
  {
    id: 14,
    name: "Multivitaminas Diarias",
    description: "Complejo de vitaminas esenciales.",
    category: "Suplementos vitamínicos",
    price: 55,
    stock: 20,
    image: "https://i.imgur.com/4JzqjMn.jpg",
  },
  {
    id: 15,
    name: "Vitamina D3",
    description: "Contribuye a la salud ósea e inmunitaria.",
    category: "Suplementos vitamínicos",
    price: 45,
    stock: 14,
    image: "https://i.imgur.com/xKnmFY3.jpg",
  },
];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<null | typeof allProducts[0]>(null);

  const filteredProducts =
    selectedCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen px-2 md:px-4">
      {/* Header */}
      <header className="flex items-center justify-between py-4 bg-white shadow-md h-24 w-full rounded-2xl">
        <div className="h-full flex items-center gap-6">
          <img src="/logo.png" alt="Company Logo" className="h-16 object-contain rounded-xl" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Medicamentos y artículos sanitarios"
              className="border text-base p-3 pl-10 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>
        </div>
        <div className="flex gap-6 items-center text-base">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
            <ShoppingCart size={20} /> Carrito
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
            <LogIn size={20} /> Login
          </button>
        </div>
      </header>

      <div className="h-4" />

      {/* Hero */}
      <section className="bg-[#FAD1D8] p-10 text-center rounded-2xl mb-6">
        <h1 className="text-6xl font-bold text-[#B73852]">PharmaYap</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-[#6B2C3B]">
          En PharmaYap, hacemos que cuidar tu salud sea más fácil. Con nuestro servicio de envío de medicamentos a domicilio, puedes realizar tu pedido en línea desde nuestra web o app y recibir tus productos de forma rápida, segura y sin complicaciones, directamente en la puerta de tu hogar.
          ¡Olvídate de las filas y gana tiempo para lo que realmente importa!
        </p>
      </section>

    
      {/* Browse by Category Section */}
      <section className="py-10 px-4 bg-white rounded-2xl mb-6">
        <h2 className="text-2xl font-bold text-[#B73852] mb-4">Explorar por categoría</h2>
        <div className="flex gap-3 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-[#E87085] text-white border-transparent"
                  : "bg-gray-100 text-gray-700 hover:bg-[#DC546C] hover:text-white hover:border-[#DC546C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de productos filtrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-36 w-full object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <p className="text-base font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">${product.price}</span>
                  <button className="text-sm border px-3 py-1 rounded-full hover:bg-gray-800 hover:text-white">
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Detalle del producto */}
      {selectedProduct && (
        <section className="py-10 px-4 bg-white rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-[#B73852] mb-4">Detalles del producto</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-64 w-full md:w-1/2 object-cover rounded-xl"
            />
            <div className="flex-1">
              <p><strong>ID:</strong> {selectedProduct.id}</p>
              <p><strong>Nombre:</strong> {selectedProduct.name}</p>
              <p><strong>Descripción:</strong> {selectedProduct.description}</p>
              <p><strong>Precio:</strong> ${selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Volver
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white py-6 mt-10 text-center border-t rounded-2xl">
        <p className="text-sm text-gray-600">&copy; 2025 PharmaYap. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;