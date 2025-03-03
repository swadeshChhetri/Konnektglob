"use client"
import { motion } from "framer-motion";
import { CheckCircle, Sidebar } from "lucide-react";
import { useState } from "react";
import UserSidebar from "../../../components/UserSidebar";


const steps = [
  { id: 1, label: "Name your project" },
  { id: 2, label: "Create question(s)" },
  { id: 3, label: "Select language sets" },
  { id: 4, label: "Upload language set" },
];

export default function ProjectTracker() {
  const [completedStep, setCompletedStep] = useState(2); // Change to track step completion

  return (
  
    <div className="flex h-screen bg-gray-100">
      <UserSidebar/>
      <main className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-8">Create new project</h1>
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative w-1/4">
            {index !== 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
                className={`absolute top-1/2 left-0 w-full h-1 ${step.id <= completedStep ? "bg-green-500" : "bg-gray-300"} -z-10`}
              />
            )}
            <div className={`flex items-center justify-center w-10 h-10 border-2 rounded-full relative ${step.id <= completedStep ? "bg-green-500 border-green-500" : "bg-white border-gray-400"}`}>
              <span className={step.id <= completedStep ? "text-white font-bold" : "text-gray-600 font-bold"}>{step.id}</span>
              {step.id <= completedStep && (
                <CheckCircle className="absolute top-0 right-0 w-4 h-4 text-white bg-green-500 rounded-full" />
              )}
            </div>
            <p className="text-gray-600 text-sm mt-2 text-center">{step.label}</p>
          </div>
        ))}
      </div>
      </main>
    </div>
    
  );
}
