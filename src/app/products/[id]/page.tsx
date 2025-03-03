"use client";
import { useParams } from "next/navigation";
// import { products } from "../../data/products"; // Import product data
import { products } from "../../data/products";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import ContactModal from "../../components/ContactModal";
// import InquiryModal from "../../components/InquiryModal";
import InquiryFormModal from "../../components/InquiryModal";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import Skeleton Loader
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS


const ProductDetails = () => {
  const params = useParams();
  const id = Number(params?.id); // Convert param to number
  const router = useRouter(); // Initialize the router


  // const [selectedImage, setSelectedImage] = useState("/B2B/1.jpg");
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  // const [count, setCount] = useState(1); // Initial count value


  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${params.id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 pt-24">
        <Skeleton height={400} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Skeleton height={250} />
          </div>
          <div>
            <Skeleton height={30} width={200} />
            <Skeleton height={20} width={100} />
            <Skeleton count={4} height={20} className="mt-2" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  // const images = [
  //   "/B2B/1.jpg",
  //   "/B2B/2.jpg",
  //   "/B2B/3.jpg",
  //   "/B2B/4.jpg",
  //   "/B2B/5.jpg",
  // ];

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
      {/* Left Section: Product Images */}
      <div className="sticky top-4 space-y-6">
        <img
          src={product.image}
          alt="Product Image"
          className="w-full h-96 object-cover rounded-lg shadow"
        />

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Product Demo Video</h2>
          <video controls className="w-full h-64 rounded-lg shadow-md">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Product PDF Download Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Product Brochure</h2>
          <a
            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md inline-block mt-2 hover:bg-blue-600 transition"
          >
            Download PDF
          </a>
        </div>
        {/* <div className="mt-6">
          <h2 className="text-lg font-semibold">360° Product View</h2>
          <React360Viewer
        amount={36} // Number of images
        imagePath="/images/product" // Folder containing images
        fileName="product_{index}.jpg" // Example: product_1.jpg, product_2.jpg, etc.
        autoplay
      />
        </div> */}
        <div className="flex gap-2">
          {/* {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-16 h-16 rounded-lg shadow cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))} */}
        </div>
      </div>

      {/* Middle Section: Product Details */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Semi-Automatic Stack Chimney Emission System
        </h1>
        <p className="text-lg font-semibold text-gray-600">₹33,040.00 INR</p>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          {/* Animated Mobile Icon */}
          {/* Animated Phone Icon inside the Button */}
          <button className="btn btn-primary flex items-center"
            onClick={() => setIsModalOpen(true)}>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 3 }}
            >
              <PhoneCall className="w-5 h-5 mr-2" />
            </motion.span>
            Contact for Seller
          </button>

          {/* Send Inquiry Button with Interactive Animation */}
          <button className="btn btn-outline flex items-center" onClick={() => setIsInquiryModalOpen(true)}>
            <motion.span
              whileHover={{ scale: 1.2 }}
              animate={{ rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
            </motion.span>
            Send Inquiry
          </button>
        </div>

        {/* Product Details Table */}
        <div className="overflow-x-auto mt-6">
          <table className="table w-full border">
            <tbody>
              <tr>
                <td className="font-semibold">Material</td>
                <td>Ozone Generator</td>
              </tr>
              <tr>
                <td className="font-semibold">Automatic Grade</td>
                <td>Semi-Automatic</td>
              </tr>
              <tr>
                <td className="font-semibold">Voltage</td>
                <td>220-440V</td>
              </tr>
              <tr>
                <td className="font-semibold">Warranty</td>
                <td>1 Year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section: Seller Details */}
      <div className="space-y-4 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Seller Details</h2>
        <p className="text-gray-600">Aeolus Sustainable Bioenergy Pvt. Ltd.</p>
        <p className="text-gray-500">Location: Surat, Gujarat</p>
      </div>
      {/* Contact Modal */}
      {isModalOpen && <ContactModal productName="Your Product" onClose={() => setIsModalOpen(false)} />}



      {/* Inquiry Modal */}
      {isInquiryModalOpen && (
        <InquiryFormModal
          productName={product.name}
          mobileNumber="8597079194"
          onClose={() => setIsInquiryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
