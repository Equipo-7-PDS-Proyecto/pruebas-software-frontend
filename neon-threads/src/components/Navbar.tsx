import React from 'react';

const Navbar = () => {
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
        <div>
          <a href="/poleras" className="px-4 py-2 text-white hover:text-blue-500">Home</a>
          <a href="/admin" className="px-4 py-2 text-white hover:text-blue-500">Administración</a>
          <a href="/login" className="px-4 py-2 text-white hover:text-blue-500">Login</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;