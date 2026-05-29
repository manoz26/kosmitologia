"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface ScrollCanvasHeroProps {
  frameCount: number;
  imagePrefix?: string;
  imageExtension?: string;
}

export default function ScrollCanvasHero({
  frameCount = 50, // The new Wan Video has 50 frames
  imagePrefix = "/hero-sequence/Wan_Video_Generate__Create a luxurious beauty brand video. First frame_ A breath_", 
  imageExtension = ".jpg",
  startFromZero = true
}: ScrollCanvasHeroProps & { startFromZero?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // Create array of image paths
  const images = useMemo(() => {
    if (typeof window === "undefined") return [];
    
    const loadedImages: HTMLImageElement[] = [];
    const startIndex = startFromZero ? 0 : 1;
    const endIndex = startFromZero ? frameCount - 1 : frameCount;
    
    for (let i = startIndex; i <= endIndex; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g., 001)
      const num = i.toString().padStart(3, "0");
      img.src = `${imagePrefix}${num}${imageExtension}`;
      img.onload = () => {
        setImagesLoaded((prev) => prev + 1);
      };
      loadedImages.push(img);
    }
    return loadedImages;
  }, [frameCount, imagePrefix, imageExtension]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Render initial frame when at least the first image is loaded
  useEffect(() => {
    if (images.length > 0 && images[0].complete) {
      renderFrame(0);
    }
  }, [imagesLoaded, images]);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    
    const img = images[index];
    if (img && img.complete) {
      // Draw image covering the whole canvas (object-fit: cover equivalent)
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which frame to show based on scroll progress
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    // Use requestAnimationFrame for smooth drawing
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Resize canvas on window resize to match screen resolution
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame after resize
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
        renderFrame(frameIndex);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameCount, scrollYProgress]);

  // Fade out the text when scrolled past 5% to 15% of the container
  // We add '1' at the end of the arrays to ensure it stays at 0 (and -100) all the way to the end of the scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 1], [1, 1, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15, 1], [0, -100, -100]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Fallback image before sequence loads */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-0"
          style={{ 
            backgroundImage: "url('/leaf.jpg')",
            opacity: imagesLoaded > 0 ? 0 : 1 
          }}
        />

        {/* The Canvas that draws the frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />
        
        <div className="absolute inset-0 bg-black/40 z-10" />

        <motion.div 
          className="absolute inset-0 z-20 flex flex-col items-center justify-center section-container px-4 text-center mt-16"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-float text-white">
            <Sparkles size={16} className="text-secondary" />
            <span className="text-sm font-medium">Νέος Κύκλος Σπουδών</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight drop-shadow-lg">
            Η Επιστήμη πίσω από την <span className="text-[#a4d4b4] drop-shadow-md">Ομορφιά</span> & την <span className="text-[#fca5a5] drop-shadow-md">Υγεία</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Πρόγραμμα Μεταπτυχιακών Σπουδών στην Κοσμητολογία από το Διεθνές Πανεπιστήμιο της Ελλάδος.
            Εξειδίκευση στην παρασκευή, έλεγχο και εφαρμογή καινοτόμων καλλυντικών.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/eisagogi" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              Αιτήσεις Εισαγωγής
              <ArrowRight size={18} />
            </Link>
            <Link href="/programma" className="w-full sm:w-auto px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 font-medium rounded-full shadow-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
              Το Πρόγραμμα Σπουδών
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
