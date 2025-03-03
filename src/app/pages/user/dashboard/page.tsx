'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, List, Settings, Monitor} from 'lucide-react';
import Link from 'next/link';


const Dashboard = () => {
  const [active, setActive] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: Home, href: "/dashboard" },
    { name: 'Manage Inquiries', icon: Monitor, href: "/pages/user/manageInquiry" },
    { name: 'Saved Products', icon: List, href: "/pages/user/savedProducts" },
    { name: 'Profile Settings', icon: Settings, href: "/pages/user/profileSetting"  },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                active === item.name ? 'bg-orange-200 text-orange-600' : 'text-gray-600'
              }`}
              onClick={() => setActive(item.name)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-6">Welcome back, Vidhya 👋</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Pending Task', count: 120, color: 'bg-red-200' },
            { title: 'On Process', count: 150, color: 'bg-green-200' },
            { title: 'Resolved', count: 250, color: 'bg-blue-200' },
            { title: 'Hold Task', count: 25, color: 'bg-yellow-200' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`p-5 rounded-lg shadow-md ${item.color}`}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Reports and Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Report</h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total</th>
                  <th>On process</th>
                  <th>Hold</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {[['Vidhya', 10, 2, 2, 6], ['Katrin', 16, 4, 2, 10], ['Ramya', 13, 3, 2, 8], ['Nilofer', 15, 1, 1, 13]].map((row, i) => (
                  <tr key={i} className="border-b">
                    {row.map((cell, j) => (
                      <td key={j} className="p-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Overview of all devices</h3>
            <div className="flex justify-between">
              {[
                { type: 'Laptop', used: 20000, available: 1455 },
                { type: 'Mobile phone', used: 20000, available: 1455 },
              ].map((device, index) => (
                <div key={index} className="p-4 bg-green-200 rounded-lg">
                  <h4 className="font-semibold">{device.type}</h4>
                  <p className="text-sm">{device.used} used</p>
                  <p className="text-sm">{device.available} available</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="p-5 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Recent tickets</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Reported by</th>
                <th>Short description</th>
                <th>Priority</th>
                <th>Created date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'E.Martin', desc: 'New onboarding does not have access', priority: 'High', date: '22 Dec, 23' },
                { id: 2, name: 'V.Rahul', desc: 'I need access to below roles', priority: 'Low', date: '21 Dec, 23' },
                { id: 3, name: 'N.Jeni', desc: 'No data found', priority: 'Medium', date: '21 Dec, 23' },
              ].map((ticket, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{ticket.id}</td>
                  <td className="p-2">{ticket.name}</td>
                  <td className="p-2">{ticket.desc}</td>
                  <td className="p-2 font-bold text-red-500">{ticket.priority}</td>
                  <td className="p-2">{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
