"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Users, Award } from "lucide-react";

export default function CompanyDetails() {
  // Dummy companies data for testing and dynamic loading
  const dummyCompanies = [
    { id: 1, name: "Apple", description: "Technology & Gadgets", image: "/apple.jpg" },
    { id: 2, name: "Nike", description: "Sports & Fashion", image: "/nike.jpg" },
    { id: 3, name: "Samsung", description: "Electronics & Smartphones", image: "/samsung.jpg" },
  ];

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  // Simulate fetching companies data
  useEffect(() => {
    setCompanies(dummyCompanies);
  }, []);

  // Filter companies if a search query exists; otherwise, show all
  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredCompanies(
        companies.filter((company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredCompanies(companies);
    }
  }, [searchQuery, companies]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-blue-600 text-white py-20 px-4 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">About Our Company</h1>
        <p className="text-xl mb-8">
          We are dedicated to delivering exceptional services and innovative solutions.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold"
        >
          <Link href="/contact">Learn More</Link>
        </motion.button>
      </motion.div>

      {/* Our Story Section */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-4xl mx-auto py-16 px-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
        <p className="text-gray-600 mb-8">
          Founded in 2010, our company has grown from a small startup to a leading player in the industry.
          Our journey has been marked by passion, perseverance, and an unwavering commitment to excellence.
        </p>
      </motion.div>

      {/* Our Values Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="bg-white py-16 px-4"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-gray-50"
          >
            <Briefcase className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We foster creativity and continuously challenge the status quo.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-gray-50"
          >
            <Users className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p className="text-gray-600">
              Teamwork is the key to success and innovation.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-gray-50"
          >
            <Award className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              Our commitment drives us to exceed expectations.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Partners Section (Dynamic Companies Data) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="max-w-6xl mx-auto py-16 px-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Partners</h2>
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                whileHover={{ scale: 1.05 }}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No partners found</p>
        )}
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="max-w-4xl mx-auto py-16 px-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img src="/team/member1.jpg" alt="Jane Doe" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Jane Doe</h3>
            <p className="text-gray-500">CEO & Founder</p>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img src="/team/member2.jpg" alt="John Smith" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">John Smith</h3>
            <p className="text-gray-500">Chief Technology Officer</p>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img src="/team/member3.jpg" alt="Alice Johnson" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Alice Johnson</h3>
            <p className="text-gray-500">Head of Marketing</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Call-to-Action */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="bg-blue-600 text-white py-12 px-4 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="mb-6">
          Become part of our growing family and help us shape the future of innovation.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold"
        >
          <Link href="/contact">Contact Us</Link>
        </motion.button>
      </motion.div>
    </div>
  );
}