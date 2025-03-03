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
          <h4 className="font-semibold text-light">KONNEKT.com</h4>
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
                {["All Cities", "Delhi", "Mumbai", "Bengaluru"].map((city) => (
                  <li key={city} onClick={() => { setSelectedCity(city); setDropdownOpen(false); }}>
                    {city}
                  </li>
                ))}
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
              <span>Welcome, {user.name}</span>
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

        </div>
      </nav>
    </header>
  );
}
