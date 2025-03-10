"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import SkeletonProduct from "../components/SkeletonProduct";// Import Skeleton CSS
import { dummyProducts } from "../data/product";

// Define TypeScript interface for a product
const Products = () => {
  const [products, setProducts] = useState<typeof dummyProducts>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., API call)
    setTimeout(() => {
      setProducts(dummyProducts);
      setIsLoading(false);
    }, 2000); // 2 seconds delay
  }, []);

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading
          ? Array(8) // Show 8 skeleton loaders while loading
              .fill(null)
              .map((_, index) => <SkeletonProduct key={index} />)
          : products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm bg-white">
             <Link href={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover mb-2"
            />
            </Link>
            <p className="font-semibold text-sm mb-1">{product.name}</p>
            <p className="text-gray-600 text-sm">₹ {product.price} / Piece</p>
            
            {/* Buttons */}
            <div className="mt-3 flex gap-2 w-full">
              <button className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 text-sm rounded-md">
                View Number
              </button>
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 text-sm rounded-md">
                Contact Supplier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
