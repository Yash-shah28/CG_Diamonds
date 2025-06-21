/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="pt-25 flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-emerald-500 border-gray-300 rounded-full bg-white shadow-md"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
