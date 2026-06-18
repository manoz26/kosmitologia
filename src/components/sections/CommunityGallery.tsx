"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Users, Heart, Sparkles, MessageCircleHeart, X, ZoomIn } from "lucide-react";

const ROW_1_IMAGES = [
  "/images/IMG_1825.jpeg",
  "/images/IMG_1826.jpeg",
  "/images/IMG_1827.jpeg",
  "/images/IMG_1828.jpeg",
  "/images/IMG_1829.jpeg",
];

const ROW_2_IMAGES = [
  "/images/IMG_1830.jpeg",
  "/images/IMG_1831.jpeg",
  "/images/IMG_1832.jpeg",
  "/images/IMG_1834.jpeg",
  "/images/IMG_1835.jpeg",
];

// Duplicate arrays to create an infinite scroll effect
const SCROLL_ROW_1 = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
const SCROLL_ROW_2 = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

export function CommunityGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImage]);

  // Parallax effect on scroll for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-transparent"
    >
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Ενισχυμένη προβολή κοινότητας"
                fill
                className="object-contain bg-black/50"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ihu-green/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-ihu-green-light/20 blur-[150px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 mb-16 text-center max-w-4xl">
        <motion.div 
          style={{ opacity: opacityText, scale: scaleText }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-ihu-green-dark/20 text-ihu-green-dark font-medium text-sm mb-6 shadow-sm">
            <Sparkles size={16} />
            <span>Η Κοινότητά μας</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-text-primary tracking-tight mb-6">
            Η <span className="text-transparent bg-clip-text bg-gradient-to-r from-ihu-green-dark to-ihu-green">Ζωή</span> στο ΠΜΣ Κοσμητολογίας
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            Πέρα από την ακαδημαϊκή αριστεία, καλλιεργούμε ένα ανθρώπινο, φιλικό και συνεργατικό περιβάλλον. Εδώ, οι φοιτητές και οι καθηγητές δημιουργούν δεσμούς που διαρκούν μια ζωή.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
             <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/40 shadow-sm transition-all hover:bg-white/80 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-ihu-green/10 flex items-center justify-center text-ihu-green-dark">
                  <Users size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-text-secondary font-medium">Κοινότητα</p>
                  <p className="text-sm font-bold text-text-primary">Συνεργασία & Ομαδικότητα</p>
                </div>
             </div>
             <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/40 shadow-sm transition-all hover:bg-white/80 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <Heart size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-text-secondary font-medium">Περιβάλλον</p>
                  <p className="text-sm font-bold text-text-primary">Φιλικό & Υποστηρικτικό</p>
                </div>
             </div>
             <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/40 shadow-sm transition-all hover:bg-white/80 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-ihu-green-light/20 flex items-center justify-center text-ihu-green-dark">
                  <MessageCircleHeart size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-text-secondary font-medium">Δικτύωση</p>
                  <p className="text-sm font-bold text-text-primary">Άμεση Επικοινωνία</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee Galleries */}
      <div 
        className="relative z-10 w-full flex flex-col gap-6 md:gap-8 pb-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#F4F7ED] to-transparent z-20 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#F4F7ED] to-transparent z-20 pointer-events-none" />

        {/* Row 1 - Scrolling Right to Left */}
        <div className="relative flex overflow-hidden group/row">
          <motion.div
            className="flex gap-6 md:gap-8 min-w-max"
            animate={{
              x: ["0%", "-33.333333%"],
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              animationPlayState: isHovered ? "paused" : "running"
            }}
          >
            {SCROLL_ROW_1.map((src, index) => (
              <div 
                key={`row1-${index}`} 
                onClick={() => setSelectedImage(src)}
                className="relative w-[280px] h-[200px] md:w-[400px] md:h-[280px] rounded-3xl overflow-hidden shadow-md flex-shrink-0 border-4 border-white transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:z-30 cursor-zoom-in group/card"
              >
                <div className="absolute inset-0 bg-ihu-green/20 opacity-0 group-hover/card:opacity-30 transition-opacity duration-300 z-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={18} />
                    <span className="text-sm font-medium">Μεγέθυνση</span>
                  </div>
                </div>
                <Image
                  src={src}
                  alt="Στιγμιότυπο από τη ζωή στο ΠΜΣ Κοσμητολογίας"
                  fill
                  sizes="(max-width: 768px) 280px, 400px"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scrolling Left to Right */}
        <div className="relative flex overflow-hidden group/row">
          <motion.div
            className="flex gap-6 md:gap-8 min-w-max"
            animate={{
              x: ["-33.333333%", "0%"],
            }}
            transition={{
              duration: 45,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              animationPlayState: isHovered ? "paused" : "running"
            }}
          >
            {SCROLL_ROW_2.map((src, index) => (
              <div 
                key={`row2-${index}`} 
                onClick={() => setSelectedImage(src)}
                className="relative w-[280px] h-[200px] md:w-[400px] md:h-[280px] rounded-3xl overflow-hidden shadow-md flex-shrink-0 border-4 border-white transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:z-30 cursor-zoom-in group/card"
              >
                <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover/card:opacity-30 transition-opacity duration-300 z-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={18} />
                    <span className="text-sm font-medium">Μεγέθυνση</span>
                  </div>
                </div>
                <Image
                  src={src}
                  alt="Στιγμιότυπο από τη ζωή στο ΠΜΣ Κοσμητολογίας"
                  fill
                  sizes="(max-width: 768px) 280px, 400px"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
