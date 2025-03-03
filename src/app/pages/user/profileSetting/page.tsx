"use client";

import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import UserSidebar from "../../../components/UserSidebar";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: "Murat Alpay",
    mobileNumber: "+61400000000",
    email: "murat.alpay@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gray-100">
    <UserSidebar/>
    {/* Main Content */}
    <div className="flex-1 p-6 bg-white rounded-lg shadow">
      {/* Breadcrumb */}
      <p className="text-gray-500 text-sm mb-2">Account settings / <span className="text-black font-semibold">Profile</span></p>
      
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600 mb-6">Manage settings for your [Brand_name] profile</p>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
          MA
        </div>
        <div>
          <p className="text-gray-600 text-sm">We support PNGs, JPEGs, and GIFs under 10MB</p>
          <button className="flex items-center gap-2 mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md">
            <Upload size={16} /> Upload image
          </button>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={profile.mobileNumber}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email Address</label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Update e-mail</button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            You may need to log out and back in to see any changes.
          </p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <p className="text-gray-600 text-sm">
          If you want to permanently delete this account and all of its data, you can do so below.
        </p>
        <button className="mt-2 flex items-center gap-2 text-red-600">
          <Trash2 size={16} /> Delete account
        </button>
      </div>
    </div>
    </div>
  );
}
