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
];

const allProducts = [
  {
    id: 1,
    name: "Calcium Tablets",
    description: "Helps strengthen bones and joints.",
    category: "Cuidado de articulaciones",
    price: 80,
    stock: 12,
    image: "/images/calcium.jpg",
  },
  {
    id: 2,
    name: "Joint Cream",
    description: "Relieves joint pain quickly.",
    category: "Cuidado de articulaciones",
    price: 60,
    stock: 10,
    image: "/images/jointcream.jpg",
  },
  {
    id: 3,
    name: "Glucose Monitor",
    description: "Accurate glucose monitoring at home.",
    category: "Cuidado de la diabetes",
    price: 150,
    stock: 6,
    image: "/images/glucose.jpg",
  },
  {
    id: 4,
    name: "Insulin Pen",
    description: "Easy-to-use insulin injector.",
    category: "Cuidado de la diabetes",
    price: 110,
    stock: 8,
    image: "/images/insulin.jpg",
  },
  {
    id: 5,
    name: "Kidney Flush",
    description: "Supports kidney cleansing.",
    category: "Cuidado renal",
    price: 90,
    stock: 5,
    image: "/images/kidneyflush.jpg",
  },
  {
    id: 6,
    name: "Liver Detox",
    description: "Promotes healthy liver function.",
    category: "Cuidado del hígado",
    price: 95,
    stock: 4,
    image: "/images/liver.jpg",
  },
  {
    id: 7,
    name: "Inhaler",
    description: "Quick relief for respiratory issues.",
    category: "Cuidado respiratorio",
    price: 70,
    stock: 9,
    image: "/images/inhaler.jpg",
  },
  {
    id: 8,
    name: "Eye Drops",
    description: "Soothes dry and irritated eyes.",
    category: "Cuidado de los ojos",
    price: 30,
    stock: 15,
    image: "/images/eyedrops.jpg",
  },
];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<null | typeof allProducts[0]>(null);

  const filteredProducts =
    selectedCategory === "All"
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
          <button className="relative bg-gray-200 px-4 py-2 rounded-xl">
            Ofertas
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
          </button>
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
        <div className="mt-6">
          <button className="bg-[#ED8698] text-white px-4 py-2 rounded hover:bg-[#dc546c] transition">
            Order Via Prescription
          </button>
        </div>
      </section>






      {/* Categories */}
      <section className="py-6 bg-white rounded-2xl mb-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#B73852]">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
          {categories.slice(1).map((cat) => (
            <div
              key={cat}
              className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-xl mb-3" />
              <p className="text-base font-semibold text-center">{cat}</p>
            </div>
          ))}
        </div>
      </section>




      {/* Deals Section */}
      <section className="py-10 px-4 bg-white rounded-2xl mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#B73852]">Today's best deals for you!</h2>
          <a href="#" className="text-sm text-[#B73852] hover:underline">Ver todos los productos →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="h-36 bg-gray-200 rounded-t-xl" />
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <p className="text-base font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  {/* Precio con color del Hero */}
                  <span className="font-bold text-lg text-[#EFAFA2]">${product.price}</span>
                  {/* Botón con hover rojo oscuro */}
                  <button className="text-sm border border-red-600 text-red-700 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white transition">
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <div className="h-36 bg-gray-200 rounded-t-xl" />
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
          <h2 className="text-2xl font-bold text-[#B73852] mb-4">Product Details</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-64 w-full md:w-1/2 bg-gray-200 rounded-xl" />
            <div className="flex-1">
              <p><strong>ID:</strong> {selectedProduct.id}</p>
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
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
        <p className="text-sm text-gray-600">&copy; 2025 PharmaYap. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;