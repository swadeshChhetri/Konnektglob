'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, List, Settings, Monitor} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function UserSidebar() {
  const [active, setActive] = useState('Dashboard');
  const pathname = usePathname(); // Get the current URL path


  const navItems = [
    { name: 'Dashboard', icon: Home, href: "/pages/user/dashboard" },
    { name: 'Manage Inquiries', icon: Monitor, href: "/pages/user/manageInquiry" },
    { name: 'Saved Products', icon: List, href: "/pages/user/savedProducts" },
    { name: 'Profile Settings', icon: Settings, href: "/pages/user/profileSetting"  },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-5 pt-20">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul>
      {navItems.map((item) => {
          const isActive = pathname === item.href; // Check if the current page matches

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                isActive ? 'bg-orange-200 text-orange-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </ul>
    </div>

  )

}