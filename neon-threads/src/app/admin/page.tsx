'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '@/endpoints/clothe';

interface Product {
    _id: number,
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

interface nProduct {
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

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<nProduct[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url_photo, setUrlPhoto] = useState('');
    const [category, setCategory] = useState('');
    const [clothe_type, setClotheType] = useState('');
    const [clothe_size, setClotheSize] = useState('');
    const [clothe_color, setClotheColor] = useState('');
    const [available_count, setAvailableCount] = useState('');

    useEffect(() => {
        // Llamada a la API para obtener productos cuando el componente se monta
        fetchProducts()
          .then((response) => response.json())
          .then((data) => setProducts(data.message))
          .catch((error) => console.error('Error fetching products:', error));
      }, []);
    
    const handleAddProduct = async () => {
        const newProducto = {
            name,
            description,
            price: parseFloat(price),
            url_photo: "https://bucket-photos.s3.us-east-2.amazonaws.com/default_clothe.png",
            category,
            clothe_type,
            clothe_size,
            clothe_color,
            available_count: parseFloat(available_count)
        };
        try {
            await addProduct(newProducto);
            setNewProduct([...newProduct, newProducto]);
            setName('');
            setDescription('');
            setPrice('');
            setUrlPhoto('');
            setCategory('');
            setClotheType('');
            setClotheSize('');
            setClotheColor('');
            setAvailableCount('');
            console.log('Product added');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    
    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price.toString());
        setUrlPhoto(product.url_photo);
        setCategory(product.category);
        setClotheType(product.clothe_type);
        setClotheSize(product.clothe_size);
        setClotheColor(product.clothe_color);
        setAvailableCount(product.available_count.toString());
      };
    
    const handleUpdateProduct = async () => {
        if (editingProduct) {
          const updatedProduct = {
            ...editingProduct,
            name,
            description,
            price: parseFloat(price),
            url_photo,
            category,
            clothe_type,
            clothe_size,
            clothe_color,
            available_count: parseInt(available_count),
          };
          try {
              await updateProduct(editingProduct._id, updatedProduct);
              setProducts(
                products.map((product) =>
                  product.name === editingProduct.name ? updatedProduct : product
                )
              );
              setEditingProduct(null);
              setName('');
              setDescription('');
              setPrice('');
              setUrlPhoto('');
              setCategory('');
              setClotheType('');
              setClotheSize('');
              setClotheColor('');
              setAvailableCount('');
              console.log('Product updated');
          } catch (error) {
              console.error('Error updating product:', error);
          }
        }
    };
    
    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((product) => product._id !== id));
            console.log('Product deleted');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
         <Navbar userType={1} />
        <main className="flex-grow container mx-auto py-12">
          <h1 className="text-4xl font-bold mb-6">Administración de inventario</h1>
          <div className="mb-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Añadir nuevo producto'}</h2>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                if (editingProduct) {
                    handleUpdateProduct();
                } else {
                    handleAddProduct();
                }
                }}
            >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Nombre Producto</label>
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Descripción</label>
                        <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Precio</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Categoría</label>
                        <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Tipo de prenda</label>
                        <input
                        type="text"
                        value={clothe_type}
                        onChange={(e) => setClotheType(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Talla</label>
                        <input
                        type="text"
                        value={clothe_size}
                        onChange={(e) => setClotheSize(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Color</label>
                        <input
                        type="text"
                        value={clothe_color}
                        onChange={(e) => setClotheColor(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Cantidad en inventario</label>
                        <input
                        type="number"
                        value={available_count}
                        onChange={(e) => setAvailableCount(e.target.value)}
                        className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        min="0"
                        step="1"
                        />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {editingProduct ? 'Editar' : 'Añadir'}
                    </button>
                </div>
            </form>
          </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-gray-800 p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-white">${product.price.toFixed(2)}</p>
                <p className="mt-2 text-white">Descripción: {product.description}</p>
                <p className="mt-2 text-white">Categoria: {product.category}</p>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Neon Threads. Derechos reservados.</p>
        </div>
      </footer>
      </div>
    );
}