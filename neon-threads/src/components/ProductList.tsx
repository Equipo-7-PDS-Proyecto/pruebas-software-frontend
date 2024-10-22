// ProductList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  url_photo: string;
  category: string;
  clothe_type: string;
  clothe_size: string;
  clothe_color: string;
  available_count: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Link href="/shop-single" key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Image
            src={product.url_photo}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
            />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;