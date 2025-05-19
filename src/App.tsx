import React from "react";
import { useState } from 'react'
import reactLogo from '.assets/LOGO_PHARMAYAP PNG(1).png'
import viteLogo from '/vite.svg'
import { ShoppingCart, LogIn, Search } from "lucide-react";
import './index.css' 



const HomePage: React.FC = () => {
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
              placeholder="Medicine and healthcare items"
              className="border text-base p-3 pl-10 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>
        </div>
        <div className="flex gap-6 items-center text-base">
          <button className="relative bg-gray-200 px-4 py-2 rounded-xl">
            Offers
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
            <ShoppingCart size={20} /> Cart
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
            <LogIn size={20} /> Login
          </button>
        </div>
      </header>

      <div className="h-4" />

      {/* Hero */}
      <section className="bg-green-100 p-10 text-center rounded-2xl mb-6">
        <h1 className="text-6xl font-bold text-green-900">Pharmacy</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg">
          Online medicine delivery is the process of ordering medications through a website or app and having them delivered to your doorstep.
        </p>
        <div className="mt-6">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Order Via Prescription
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white rounded-2xl mb-6">
        <h2 className="text-2xl font-bold text-center mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
          {[
            "Bone & Joint care",
            "Diabetes Care",
            "Kidney Care",
            "Liver Care",
            "Respiratory Care",
            "Eye Care",
          ].map((cat: string) => (
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
          <h2 className="text-2xl font-bold text-gray-800">Today's best deals for you!</h2>
          <a href="#" className="text-sm text-green-600 hover:underline">See all products →</a>
        </div>

        <div className="overflow-x-auto scroll-smooth">
          <div className="flex space-x-6">
            {[...Array(10)].map((_, i: number) => (
              <div
                key={i}
                className="w-60 flex-shrink-0 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-36 bg-gray-200 rounded-t-xl" />
                <div className="p-4 flex flex-col justify-between h-40">
                  <div>
                    <p className="text-base font-semibold text-gray-800">Product {i + 1}</p>
                    <p className="text-xs text-gray-500 mb-2">Health Category</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-lg">$80.00</span>
                    <button className="text-sm border px-3 py-1 rounded-full transition duration-300 hover:bg-gray-800 hover:text-white">
                      + Agregar 
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 mt-10 text-center border-t rounded-2xl">
        <p className="text-sm text-gray-600">&copy; 2025 Medicare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;