"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isCartVisible, setCartVisible] = useState(false); 

  const toggleCart = () => {
    setCartVisible(!isCartVisible); 
  };

  return (
    <header className="shadow-md bg-gray-800">
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <h1 className="text-xl font-bold text-white">Neon Threads Shop</h1>
        <form className="flex-grow mx-auto max-w-lg">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        <div className="flex items-center">
          <a href="/poleras" className="px-4 py-2 text-white hover:text-blue-500">Home</a>
          <a href="/admin" className="px-4 py-2 text-white hover:text-blue-500">Administración</a>
          <a href="/login" className="px-4 py-2 text-white hover:text-blue-500">Login</a>

          {/* Icono del carrito */}
          <div className="relative ml-4">
            <button className="text-white hover:text-blue-500" onClick={toggleCart}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            {isCartVisible && (
              <div className="absolute right-0 w-64 p-4 mt-2 bg-white rounded shadow-lg">
                <h2 className="font-bold text-black">Carrito de Compras</h2>
                <p className="font-bold text-black">Tu carrito está vacío.</p>
               
                <button onClick={toggleCart} className="mt-2 text-red-500">Cerrar</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
