"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        {/* Animated contact heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold"
        >
          Contact
        </motion.h2>
        {/* Email address link */}
        <p className="mt-4">Feel free to reach out via email:</p>
        <a
          href="mailto:adnansadar11@gmail.com"
          className="text-blue-400 text-lg"
        >
          adnansadar11@gmail.com
        </a>
      </div>
    </section>
  );
}
