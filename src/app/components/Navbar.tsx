"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Globe,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { useCity } from "../context/CityContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Skeleton from "react-loading-skeleton"; // Skeleton Loader
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from 'framer-motion';
import { X, Headset, CircleHelp} from 'lucide-react';

export default function Header() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const { user, logout, loading } = useAuth();
  const { selectedCity, setSelectedCity } = useCity();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isTradePage = pathname === "/BusinessProducts"; // Store condition in a variable
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  const topCities = ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata"];
  const allCities = [
    "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user-count");
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error("Failed to fetch user count", error);
      }
    };

    fetchUserCount();
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/products?search=${searchTerm}`);
    } else {
      router.push("/products");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/signin"); // Redirect after logout
  };

  return (
    <header className="bg-background w-full text-light fixed shadow-md z-50">
      <nav className="flex items-center justify-between bg-dark text-light px-6 py-3 border-b shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold text-light">KonnektGlobe</h4>
        </div>

        {/* Show extra content only on Trade page */}

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 text-gray-600 "
          >
            <MapPin className="w-5 h-5" />
            {selectedCity}
            <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg p-2 rounded-md">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full p-2 border rounded-md text-sm"
              />
               <ul className="mt-2 text-sm">
                {(showAllCities ? allCities : topCities).map((city) => (
                  <li key={city} onClick={() => { setSelectedCity(city); setDropdownOpen(false); }}>
                    {city}
                  </li>
                ))}
                {!showAllCities && (
                  <li
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setShowAllCities(true)}
                  >
                    All Cities
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Icons and Buttons */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <Skeleton width={100} height={20} /> // Show skeleton while loading
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-4">
        <Link href={"/pages/user/dashboard"} className="relative" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
          <User className="w-8 h-6 cursor-pointer"  />
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-36 absolute top-5 right-0 bg-white text-black p-3 shadow-lg rounded-lg"
            >
              <Link href={"/pages/profile"}>Welcome, Swadesh</Link>
            </motion.div>
          )}
        </Link>
      </div>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="font-semibold flex  rounded-xl p-1">
                <Link href="/checkout">
                  <User size={20} className="" />
                </Link>
                <Link href="/pages/auth/signup">
                  Sign Up
                </Link>
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold ">
                <Link href="/pages/auth/signin">
                  Sign In
                </Link>
              </button>
            </>
          )}

          <div className="bg-blue-100 px-2 py-2 rounded-md text-blue-800 text-xs w-32">
            Registered Users <br />
            <span className="text-sm">{userCount !== null ? userCount : "Loading..."}</span>
          </div>
          <div className="flex justify-center items-center bg-gradient-to-b from-blue-400 to-white">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              <Headset className="w-6 h-6" />
            </button>

            {isOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                    <X
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <p className="text-gray-600 mb-4">Nunc erat cursus tellus gravida.</p>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      placeholder="What do you have in mind?"
                      className="p-3 border border-gray-300 rounded-lg w-full h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                    >
                      Submit
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </div>

          <Link href={"/pages/helpSupport"}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            <CircleHelp className="w-6 h-6" />
          </Link>
        </div>


      </nav>
    </header>
  );
}
