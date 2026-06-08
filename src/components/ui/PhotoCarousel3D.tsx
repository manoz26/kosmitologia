"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { PlaceholderImage } from "./PlaceholderImage";
import { cn } from "@/lib/utils";

interface CarouselPhoto {
  id: string;
  label: string;
  type?: "students" | "professor" | "campus" | "lab" | "classroom" | "equipment" | "generic";
}

const photos: CarouselPhoto[] = [
  { id: "1", label: "Φοιτητές σε Πείραμα 1", type: "students" },
  { id: "2", label: "Χρήση Μικροσκοπίου", type: "lab" },
  { id: "3", label: "Ομαδική Εργασία στο Lab", type: "students" },
  { id: "4", label: "Παρασκευή Κρέμας", type: "lab" },
  { id: "5", label: "Φοιτητές σε Πείραμα 2", type: "students" },
  { id: "6", label: "Μέτρηση pH", type: "lab" },
  { id: "7", label: "Αξιολόγηση Υφής", type: "lab" },
  { id: "8", label: "Παρουσίαση Εργασίας", type: "students" },
  { id: "9", label: "Συνεργασία", type: "students" },
];

export function PhotoCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isHovered]);

  const variants: import("framer-motion").Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 10,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      zIndex: 0,
      transition: {
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 perspective-[1200px]">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Στιγμιότυπα από τα Εργαστηριακά Μαθήματα
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 mx-auto rounded-full" />
        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
          Περιηγηθείτε στις εγκαταστάσεις μας και δείτε στιγμιότυπα από την πρακτική άσκηση και την καθημερινότητα των φοιτητών στα εργαστήρια.
        </p>
      </div>

      <div 
        className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-[80%] max-w-[700px] aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl glass-card border border-white/40"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-full group">
              <PlaceholderImage 
                type={photos[currentIndex].type || "lab"} 
                label={photos[currentIndex].label} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-block px-3 py-1 mb-3 rounded-full bg-teal-500/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                    {photos[currentIndex].type === "students" ? "Φοιτητές" : "Εργαστήριο"}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                    {photos[currentIndex].label}
                  </h3>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous and Next Side Images (Illusion of 3D) */}
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-4 md:px-12 opacity-30 md:opacity-50">
          <div className="w-1/4 h-3/4 max-w-[200px] rounded-xl overflow-hidden filter blur-[2px] transform -translate-x-1/4 scale-75 rotate-y-12">
            <PlaceholderImage 
              type={photos[(currentIndex - 1 + photos.length) % photos.length].type || "lab"} 
              label="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/4 h-3/4 max-w-[200px] rounded-xl overflow-hidden filter blur-[2px] transform translate-x-1/4 scale-75 -rotate-y-12">
            <PlaceholderImage 
              type={photos[(currentIndex + 1) % photos.length].type || "lab"} 
              label="" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-all z-20 hover:scale-110"
        >
          <LucideIcons.ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-all z-20 hover:scale-110"
        >
          <LucideIcons.ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={cn(
              "transition-all duration-300 rounded-full",
              currentIndex === idx 
                ? "w-8 h-2.5 bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" 
                : "w-2.5 h-2.5 bg-border-soft hover:bg-teal-300"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
