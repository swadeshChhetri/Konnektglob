"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import UserSidebar from "../../../components/UserSidebar";

const wishlistItems = [
  {
    id: 1,
    image: "/product1.jpg",
    name: "Product Split",
    oldPrice: 100,
    newPrice: 70,
    stockStatus: "In Stock",
  },
  {
    id: 2,
    image: "/product2.jpg",
    name: "Product Grid",
    newPrice: 250,
    stockStatus: "In Stock",
  },
  {
    id: 3,
    image: "/product3.jpg",
    name: "Product Stacked",
    newPrice: 135,
    stockStatus: "In Stock",
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(wishlistItems);

  const removeItem = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
    <UserSidebar/>
    <div className="flex-1 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ✏️</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Unit Price</th>
              <th className="p-3 text-left">Stock Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">
                  {item.oldPrice && (
                    <span className="text-gray-500 line-through mr-2">
                      €{item.oldPrice}
                    </span>
                  )}
                  <span className="text-green-600 font-semibold">
                    €{item.newPrice}
                  </span>
                </td>
                <td className="p-3">{item.stockStatus}</td>
                <td className="p-3 flex items-center space-x-2">
                  <button className="bg-black text-white px-4 py-2 rounded-md">
                    ADD TO CART
                  </button>
                  <button onClick={() => removeItem(item.id)} className="text-red-500">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {wishlist.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-5 text-gray-500">
                  No items in wishlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
