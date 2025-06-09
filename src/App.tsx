import React from "react";
import { useState, useRef } from 'react'
import { ShoppingCart, LogIn, Search, Menu } from "lucide-react";
import './index.css'
import { FiPackage, FiHome, FiShoppingBag, FiX } from 'react-icons/fi';

// IMPORTACIÓN CORREGIDA DEL COMPONENTE MAPASIMPLE
// Asegúrate de que la ruta sea correcta según donde hayas guardado MapaSimple.jsx
// Si HomePage.jsx y MapaSimple.jsx están ambos en la carpeta 'src', esta es la correcta:
import MapaSimple from './Mapa'; // <-- Asegúrate de que esta ruta sea correcta. Si Mapa.jsx está en la misma carpeta que HomePage.jsx

// Si MapaSimple.jsx está en 'src/components', sería:
// import MapaSimple from './components/MapaSimple';
// Ajusta esta línea según la ubicación real de tu archivo MapaSimple.jsx

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
    name: "Flekosteel ",
    description: "Es un producto que atenua el espasmo muscular y la inflamación, reduce el proceso de degeneración del tejido cartilaginoso y mejora su metabolismo.",
    category: "Cuidado de articulaciones",
    price: 80,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/seller/1686676142018L.jpg",
  },
  {
    id: 2,
    name: "Carticolagen",
    description: "",
    category: "Cuidado de articulaciones",
    price: 60,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/seller/1681698059935L.jpg",
  },
  {
    id: 3,
    name: "Glyconorm",
    description: "Indicado para aliviar y controlar los síntomas de la diabetes para de esta manera mejorar su salud de manera natural. Los ingredientes activos de Glyconorm regulan los niveles de azúr",
    category: "Cuidado de la diabetes",
    price: 150,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/seller/1698082744009L.jpg",
  },
  {
    id: 4,
    name: "Vital vitaminado",
    description: "Es una mezcla de alimentos,libre de azúcar y que puede ser consumido como parte de una alimentación saludable",
    category: "Cuidado de la diabetes",
    price: 110,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/066780L.jpg",
  },
  {
    id: 5,
    name: "Losartán",
    description: "Se utiliza en pacientes con nefropatía diabética o hipertensión para proteger el riñón y reducir la proteinuria.",
    category: "Cuidado renal",
    price: 90,
    image: "https://farmaciaslider.pe/my-assets/image/product/8d78e3c19f109aea7d6ee5c56991b89e.jpg",
  },
  {
    id: 6,
    name: "Silimarina",
    description: "Protector hepático natural. Derivado del cardo mariano, ayuda a regenerar células hepáticas y reducir la inflamación.",
    category: "Cuidado del hígado",
    price: 95,
    image: "https://res.cloudinary.com/riqra/image/upload/w_656,h_656,c_limit,q_auto,f_auto/v1643152268/sellers/salud-farma/products/igiuithhusw8dpjolzjm.png",
  },
  {
    id: 7,
    name: "Ambroxol ",
    description: "Actúa sobre las secreciones bronquiales haciendo que las flemas sean más fluidas, facilitando su expulsión mediante la tos.",
    category: "Cuidado respiratorio",
    price: 70,
    image: "https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/75110-C2.jpg",
  },
  {
    id: 8,
    name: "Cloranfenicol",
    description: "Elimina bacterias causantes de infecciones oculares.",
    category: "Cuidado de los ojos",
    price: 30,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/205052L.jpg",
  },
  {
    id: 9,
    name: "Omeprazol",
    description: "Bloquea la secreción ácida gástrica hasta 24 h.",
    category: "Salud digestiva",
    price: 50,
    image: "https://farmaciauniversalpe.vtexassets.com/arquivos/ids/158088/01984_1.jpg?v=638428792795700000",
  },
  {
    id: 10,
    name: "Sucralfato",
    description: "Forma una barrera gel protectora sobre úlceras.",
    category: "Salud digestiva",
    price: 65,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/034190L.jpg",
  },
  {
    id: 11,
    name: " Enalapril",
    description: "Relaja vasos y baja presión arterial, protege el corazón.",
    category: "Cuidado cardiovascular",
    price: 85,
    image: "https://farmaciauniversalpe.vtexassets.com/arquivos/ids/159455-800-auto?v=638591216595200000&width=800&height=auto&aspect=true",
  },
  {
    id: 12,
    name: "Metoprolol",
    description: "Controla frecuencia y presión.",
    category: "Cuidado cardiovascular",
    price: 120,
    image: "https://farmaciaslider.pe/my-assets/image/product/8518f2c912d69b86e8f6dd754a198c48.jpg",
  },
  {
    id: 13,
    name: "Centrum",
    description: "Complejo multivitamínico con 26 nutrientes esenciales: vitaminas A–E, B1–B12, hierro, zinc, magnesio, etc.",
    category: "Suplementos vitamínicos",
    price: 40,
    image: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/1735/PMP20000174890/full_image-1.webp",
  },
  {
    id: 14,
    name: "Neurobion",
    description: "Contiene vitaminas B1, B6 y B12.",
    category: "Suplementos vitamínicos",
    price: 55,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/072581L.jpg",
  },
  {
    id: 15,
    name: "Vitaglobin",
    description: "Hierro + vitamina C + B12 + ácido fólico + zinc.",
    category: "Suplementos vitamínicos",
    price: 45,
    image: "https://pharmacie-denni.dz/wp-content/uploads/2025/05/vitaglobin.jpg",
  },
];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<null | typeof allProducts[0]>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = React.useState(false); // Estado para el primer modal (tipo de compra)
  const [purchaseType, setPurchaseType] = React.useState('');

  // Estados para el segundo modal de dirección
  const [showAddressModal, setShowAddressModal] = useState(false);
  // Estos estados ahora serán actualizados por el componente MapaSimple
  const [address, setAddress] = useState(''); // ESTADO CLAVE PARA LA DIRECCIÓN
  const [additionalReferences, setAdditionalReferences] = useState('');
  const [numeroEncontrado, setNumeroEncontrado] = useState(true); // Para el estado del número en MapaSimple

  const detailRef = useRef<HTMLDivElement | null>(null);

  const filteredProducts =
    selectedCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  // Función para abrir el modal de dirección (mapa)
  const handleOpenAddressModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(false); // Cierra el primer modal
    setShowAddressModal(true); // Abre el segundo modal (mapa)
  };

  // Función para cerrar el modal de dirección (mapa) y volver al modal de despacho
  const handleCloseAddressModal = () => {
    setShowAddressModal(false); // Cierra el modal del mapa
    setShowModal(true); // Abre el modal de tipo de compra
  };

  // Función para guardar la dirección (en este punto, 'address' y 'additionalReferences'
  // ya deberían estar actualizados por MapaSimple).
  const handleSaveAddress = () => {
    if (address) {
      alert(`Dirección guardada: ${address}. Referencias adicionales: ${additionalReferences || 'Ninguna'}`);
      setShowAddressModal(false); // Cierra el modal del mapa
      setShowModal(true); // Vuelve a abrir el modal de tipo de compra
      // Aquí iría la lógica para realmente guardar la dirección en tu aplicación/base de datos
    } else {
      // Este caso debería ser raro si el botón está disabled, pero es una buena práctica.
      alert('Por favor, selecciona una dirección en el mapa.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-2 md:px-4">
      {/* Header */}
      <header className="flex items-center justify-between py-4 bg-white shadow-md h-24 w-full rounded-2xl relative">
        <div className="h-full flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl hover:bg-gray-100 transition">
            <Menu size={28} className="text-[#B73852]" />
          </button>
          <img src="/logo.png" alt="Company Logo" className="h-16 object-contain rounded-xl" />
          <div className="relative ml-4">
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

        {menuOpen && (
          <div className="absolute top-24 left-4 bg-[#FAD1D8] border border-[#F8AEBB] shadow-2xl rounded-2xl p-5 z-50 w-72 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-[#B73852] tracking-wide">Panel de Administración</h3>
            <ul className="space-y-3">
              {[
                { name: "Productos", path: "/crud/productos" },
                { name: "Categorías", path: "/crud/categorias" },
                { name: "Clientes", path: "/crud/usuarios" },
                { name: "Trabajadores", path: "/crud/pedidos" },
                { name: "Proveedores", path: "/crud/proveedores" },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className="block bg-white rounded-xl px-4 py-2 text-[#B73852] hover:bg-[#DC546C] hover:text-white transition duration-300 shadow-sm hover:shadow-md"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="bg-[#FAD1D8] p-10 text-center rounded-2xl mb-6">
        <h1 className="text-6xl font-bold text-[#B73852]">PharmaYap</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-[#6B2C3B]">
          En PharmaYap, hacemos que cuidar tu salud sea más fácil...
        </p>
      </section>

      {/* Categorías */}
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

        {/* Lista de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setTimeout(() => {
                  detailRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img src={product.image} alt={product.name} className="h-36 w-full object-cover rounded-t-xl" />
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <p className="text-base font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">S/. {product.price}</span>
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
        <section ref={detailRef} className="py-10 px-4 bg-white rounded-2xl mb-6">
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
              <p><strong>Precio:</strong> S/. {selectedProduct.price}</p>

              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-4 px-4 py-2 bg-[#B73852] text-white rounded-lg hover:bg-[#a02e45] transition-colors duration-300 shadow-md"
              >
                Volver
              </button>

              {/* --- BOTÓN COMPRA --- */}
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors duration-300 shadow-md"
              >
                📦 Compra
              </button>

              {/* --- PRIMER MODAL: SELECCIONAR TIPO DE COMPRA (Despacho a Domicilio / Retiro en Tienda) --- */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                  <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">¿Cómo entregaremos tu pedido?</h3>
                    <form>
                      {/* Opción: Despacho a domicilio */}
                      <label className={`
                        flex items-center gap-4 p-4 mb-4 rounded-lg border cursor-pointer transition-colors duration-200
                        ${purchaseType === 'domicilio' ? 'border-[#B73852] bg-red-50' : 'border-gray-300 hover:bg-gray-50'}
                      `}>
                        <input
                          type="radio"
                          name="compra"
                          value="domicilio"
                          checked={purchaseType === 'domicilio'}
                          onChange={() => setPurchaseType('domicilio')}
                          className="form-radio h-5 w-5 text-[#B73852] focus:ring-[#B73852]"
                        />
                        <div className="flex-1"> {/* Añadido flex-1 para ocupar espacio y alinear */}
                          <div className="flex items-center gap-2">
                            <FiPackage className="text-xl" />
                            <span className="font-semibold text-gray-800">Despacho a domicilio</span>
                          </div>
                          {/* Campo de dirección en el modal de despacho */}
                          <p className="text-sm text-gray-500 mt-1">
                            {address ? `Dirección: ${address}` : "Ingresa una dirección"}
                          </p>
                          {additionalReferences && (
                            <p className="text-xs text-gray-500 mt-1">
                              Referencias: {additionalReferences}
                            </p>
                          )}
                          {!numeroEncontrado && address && ( // Muestra este mensaje si no hay número y hay dirección
                            <p className="text-xs text-red-500 mt-1">
                              *No se encontró número. Agrega referencias claras.
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={handleOpenAddressModal} // Abre el modal del mapa
                            className="text-sm text-blue-600 hover:underline focus:outline-none mt-2"
                          >
                            {address ? "Cambiar dirección" : "Seleccionar dirección"}
                          </button>
                        </div>
                      </label>

                      {/* Opción: Retiro en Tienda */}
                      <label className={`
                        flex items-center gap-4 p-4 mb-6 rounded-lg border cursor-pointer transition-colors duration-200
                        ${purchaseType === 'tienda' ? 'border-[#B73852] bg-red-50' : 'border-gray-300 hover:bg-gray-50'}
                      `}>
                        <input
                          type="radio"
                          name="compra"
                          value="tienda"
                          checked={purchaseType === 'tienda'}
                          onChange={() => setPurchaseType('tienda')}
                          className="form-radio h-5 w-5 text-[#B73852] focus:ring-[#B73852]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <FiShoppingBag className="text-xl" />
                            <span className="font-semibold text-gray-800">Retiro en Tienda</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Ubica una tienda</p>
                        </div>
                      </label>

                      {/* Botones de acción del primer modal */}
                      <div className="flex justify-between mt-4">
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm font-medium"
                        >
                          Regresar
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (purchaseType === 'domicilio' && !address) {
                              alert('Por favor, selecciona una dirección para el despacho a domicilio.');
                              return; // No cerrar el modal si falta la dirección para despacho
                            }
                            alert(`Tipo de compra guardado: ${purchaseType === 'domicilio' ? 'Despacho a domicilio' : 'Retiro en Tienda'}`);
                            setShowModal(false); // Cierra el modal principal
                            // Aquí podrías redirigir o continuar con el siguiente paso del flujo de compra
                          }}
                          disabled={!purchaseType || (purchaseType === 'domicilio' && !address)} // Deshabilitar si falta el tipo o la dirección de despacho
                          className={`
                            px-6 py-2 rounded-md text-white transition-colors duration-300 text-sm font-medium
                            ${(purchaseType && (purchaseType !== 'domicilio' || address)) ? 'bg-[#B73852] hover:bg-[#a02e45]' : 'bg-gray-400 cursor-not-allowed'}
                          `}
                        >
                          Guardar preferencias
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {/* --- FIN PRIMER MODAL --- */}

              {/* --- SEGUNDO MODAL: AGREGAR DIRECCIÓN CON MAPA --- */}
              {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                  <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]"> {/* Added max-h for scroll */}
                    {/* Encabezado del modal de dirección */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800">Agregar dirección</h3>
                      <button onClick={handleCloseAddressModal} className="text-gray-500 hover:text-gray-700">
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Aquí se integra el componente MapaSimple */}
                    {/* Le pasamos las funciones setState para que pueda actualizar los estados del padre */}
                    <MapaSimple
                      setDireccion={setAddress} // Esto es lo que actualiza 'address' en HomePage
                      setReferencias={setAdditionalReferences} // Esto actualiza 'additionalReferences' en HomePage
                      setNumeroEncontrado={setNumeroEncontrado} // Esto actualiza 'numeroEncontrado' en HomePage
                    />

                    {/* Botones de acción del segundo modal */}
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handleCloseAddressModal} // Cierra el modal de dirección y vuelve al anterior
                        className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm font-medium"
                      >
                        Cancelar
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveAddress} // Llama a la función que guarda y cierra
                        disabled={!address} // Deshabilitado si no hay dirección (del mapa)
                        className={`
                          px-6 py-2 rounded-md text-white transition-colors duration-300 text-sm font-medium
                          ${address ? 'bg-[#B73852] hover:bg-[#a02e45]' : 'bg-gray-400 cursor-not-allowed'}
                        `}
                      >
                        Guardar dirección
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* --- FIN SEGUNDO MODAL --- */}

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