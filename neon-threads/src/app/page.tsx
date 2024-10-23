import Image from 'next/image';
import Navbar from '../components/Navbar';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // Redirige automáticamente a la ruta '/poleras'
  return null;

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <Navbar />

      {/* Lista de productos */}
      <section className="container mx-auto py-12">
        <h2 className="text-4xl">Productos populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {/* Product Card Example */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <Image src="/path-to-your-image.jpg" alt="Product" width={400} height={400} className="rounded" />
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Product Name</h4>
            <p className="mt-2 text-gray-600">$49.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <Image src="/path-to-your-image.jpg" alt="Product" width={400} height={400} className="rounded" />
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Product Name</h4>
            <p className="mt-2 text-gray-600">$49.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <Image src="/path-to-your-image.jpg" alt="Product" width={400} height={400} className="rounded" />
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Product Name</h4>
            <p className="mt-2 text-gray-600">$49.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <Image src="/path-to-your-image.jpg" alt="Product" width={400} height={400} className="rounded" />
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Product Name</h4>
            <p className="mt-2 text-gray-600">$49.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
              Add to Cart
            </button>
          </div>
          {/* Repeat for more products */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Neon Threads. Derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
