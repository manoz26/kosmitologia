"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.pause();
    };

    // If it's already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (video && video.duration) {
      // Scrub the video based on scroll progress
      // We wrap it in a small try-catch because some browsers block rapid currentTime changes
      try {
        video.currentTime = latest * video.duration;
      } catch (e) {
        // Ignore scrubbing errors
      }
    }
  });

  // Fade out the text when scrolled past 30% of the container
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#0a0a0a]">
      {/* Sticky container that stays in view while we scroll through the 300vh height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Poster image (leaf.jpg) - acts as fallback and shows before video is scrubbable */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-0"
          style={{
            backgroundImage: "url('/leaf.jpg')",
            opacity: isVideoLoaded ? 0 : 1
          }}
        />

        {/* The scrubbing video */}
        <video
          ref={videoRef}
          src="/video.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
          playsInline
          muted
          preload="auto"
        />

        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Hero Content Overlay (Same text as before, but stylized for dark background) */}
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
