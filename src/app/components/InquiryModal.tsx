'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';

interface InquiryModalProps {
  productName?: string;
  mobileNumber?: string;
  onClose: () => void;
}

export default function InquiryFormModal({ productName = 'Unknown Product', mobileNumber, onClose }: InquiryModalProps) {
  const [step, setStep] = useState(1);
  const [requirement, setRequirement] = useState('one-time');
  const [sendToOthers, setSendToOthers] = useState(false);
  const [lookingForLoan, setLookingForLoan] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-xl shadow-xl w-96"
      >
        {step === 1 && (
          <>
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Submit Your Inquiry</h2>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Adding details helps suppliers respond quickly.</p>
              <div className="mt-3 border p-3 rounded-lg bg-gray-100">
                <p className="text-sm font-medium text-gray-800">{productName}</p>
                <textarea
                  className="w-full mt-2 p-2 border rounded-lg"
                  defaultValue={`Hi, I am interested in ${productName}.`}
                />
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-800">Requirement Frequency</p>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="requirement" value="one-time" checked={requirement === 'one-time'} onChange={() => setRequirement('one-time')} />
                    One-Time
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="requirement" value="recurring" checked={requirement === 'recurring'} onChange={() => setRequirement('recurring')} />
                    Recurring
                  </label>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={sendToOthers} onChange={() => setSendToOthers(!sendToOthers)} />
                  Would you like to send this inquiry to other suppliers of similar products?
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={lookingForLoan} onChange={() => setLookingForLoan(!lookingForLoan)} />
                  Looking for a loan.
                </label>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Additional Details</h2>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Quantity*</label>
              <input type="number" className="w-full p-2 border rounded-lg mt-2" placeholder="Enter quantity" />
              
              <label className="text-sm font-medium mt-4 block">Approximate Order Value*</label>
              <input type="text" className="w-full p-2 border rounded-lg mt-2" placeholder="Enter value in INR" />
            </div>

            <button 
              onClick={() => setStep(3)}
              className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-green-700"
            >
              Submit
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex justify-center items-center flex-col">
              <CheckCircle size={48} className="text-green-500" />
              <h2 className="text-lg font-semibold mt-4">Inquiry Submitted Successfully!</h2>
              <p className="text-sm text-gray-600 mt-2 text-center">Thank you for your inquiry. Suppliers will reach out to you soon.</p>
              <button 
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

