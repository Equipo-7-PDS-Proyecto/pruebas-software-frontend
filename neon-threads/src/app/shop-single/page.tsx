'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { getProduct } from '@/endpoints/clothe';
import { useSearchParams } from 'next/navigation';


interface Product {
  name: string, 
  description: string, 
  price: number, 
  url_photo: string, 
  category: string, 
  clothe_type: string, 
  clothe_size: string, 
  clothe_color: string, 
  available_count: number
}

const Page: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const [product, setProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const _id = searchParams.get('_id');
  console.log(product);

  useEffect(() => {
    if (_id) {
      getProduct(_id as string)
        .then((response) => {
          if (response.status === 200) {
            setProduct(response.message);
          }
        })
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [_id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />

      {/* Main Content */}
      <section className="py-10 min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between">
          
          {/* Product Image */}
          <div className="bg-white p-4 rounded shadow-md">
            {/* Tarjeta blanca que envuelve la imagen */}
            <div className="relative w-96 h-96">
              <Image
                className="rounded"
                src={product.url_photo}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full p-4 bg-white rounded-md shadow-lg lg:ml-8 mt-4">
            <h1 className="text-4xl font-bold text-black mb-4">{product.name}</h1>
            <p className="text-3xl text-black mb-4">${product.price}</p>

            {/* Añadir espacio entre las estrellas y la Categoría */}
            <div className="mt-6 space-y-2">
              {/* Categoría */}
              <div className="flex items-center space-x-2">
                <h6 className="font-bold text-black">Categoría:</h6>
                <p className="text-gray-600">{product.category}</p>
              </div>
              
              {/* Tipo */}
              <div className="flex items-center space-x-2">
                <h6 className="font-bold text-black">Tipo:</h6>
                <p className="text-gray-600">{product.clothe_type}</p>
              </div>

              {/* Color */}
              <div className="flex items-center space-x-2">
                <h6 className="font-bold text-black">Color:</h6>
                <p className="text-gray-600">{product.clothe_color}</p>
              </div>

              {/* Descripción */}
              <div className="space-y-1">
                <h6 className="font-bold text-black">Descripción:</h6>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div className="space-y-1">
                <h6 className="font-bold text-black">En inventario:</h6>
                <p className="text-gray-600">
                  {product.available_count} disponibles
                </p>
              </div>
            </div>

            {/* Talla y Cantidad en la misma línea */}
            <div className="mt-6 flex items-center space-x-6">
              {/* Talla */}
              <div className="flex items-center space-x-2">
                <h6 className="font-bold text-black">Talla:</h6>
                <p className="text-gray-600">
                  {product.clothe_size}
                </p>
              </div>

              {/* Cantidad */}
              <div className="flex items-center space-x-2">
                <h6 className="font-bold text-black">Cantidad:</h6>
                <button onClick={decrementQuantity} className="px-3 py-1 bg-purple-600 text-white rounded">-</button>
                <span className="text-gray-600">{quantity}</span>
                <button onClick={incrementQuantity} className="px-3 py-1 bg-purple-600 text-white rounded">+</button>
              </div>
            </div>

            {/* Botones Comprar y Agregar al carrito */}
            <div className="mt-6">
              <div className="flex space-x-4">
                <button className="w-1/2 py-2 bg-purple-600 text-white rounded">Comprar</button>
                <button className="w-1/2 py-2 bg-purple-600 text-white rounded">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Neon Threads. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
