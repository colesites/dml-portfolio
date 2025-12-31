"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const safeWords = useMemo(
    () => (words && words.length > 0 ? words : ["Full-Stack SaaS Apps"]),
    [words]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMounted = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start interval; make it idempotent and clear safely (StrictMode-friendly)
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % safeWords.length);
    }, duration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [duration, safeWords.length]);

  // Mark mounted after first paint
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const showIndex = currentIndex % safeWords.length;
  const firstWord = safeWords[showIndex];

  // No initial animation on first render; animate thereafter
  const initialAnim = hasMounted.current
    ? { y: -40, filter: "blur(10px)", opacity: 0 }
    : { y: 0, filter: "blur(0px)", opacity: 1 };

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <motion.span layoutId="subtext" className="inline-block">
        {text}
      </motion.span>

      <motion.span
        layout
        className="relative inline-block overflow-hidden rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={showIndex}
            initial={initialAnim}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
              "inline-block whitespace-nowrap font-semibold text-primary"
            )}
          >
            {firstWord}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
};
