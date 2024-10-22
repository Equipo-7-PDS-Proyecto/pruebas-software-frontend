import { BASE_URL } from "@/config";

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

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/clothe/all`);
  
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  
  return response;
}

export async function addProduct(product: Product) {
  const response = await fetch(`${BASE_URL}/clothe/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Error al agregar el producto');
  }
  
  return response;
}

export async function updateProduct(id: number, product: Product) {
  const response = await fetch(`${BASE_URL}/clothe/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Error al actualizar el producto');
  }
  
  return;
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${BASE_URL}/clothe/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
  
  return;
}