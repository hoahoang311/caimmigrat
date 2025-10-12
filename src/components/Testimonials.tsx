"use client";

import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const Testimonilas = () => {
  const t = useTranslations();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const visibleCount = 16; // Show 8 testimonials at a time in the slider

  // Track scroll position to update active dot
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current && !isPaused) {
        const cardWidth = 350 + 32; // card width + margins
        const scrollLeft = Math.abs(
          parseInt(
            getComputedStyle(sliderRef.current)
              .transform.split(",")[4]
              ?.trim() || "0"
          )
        );
        const centerPosition = scrollLeft + window.innerWidth / 2;
        const index = Math.floor(centerPosition / cardWidth) % visibleCount;
        setActiveIndex(index);
      }
    };

    const interval = setInterval(handleScroll, 100);
    return () => clearInterval(interval);
  }, [isPaused, visibleCount]);

  const handleDotClick = (index: number) => {
    if (sliderRef.current) {
      // Clear any existing timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }

      // Calculate the position to scroll to
      const cardWidth = 350 + 32; // card width + margins
      const scrollPosition = -index * cardWidth;

      // Pause the animation and set active index
      setIsPaused(true);
      setActiveIndex(index);

      // Remove animation temporarily and apply transform
      sliderRef.current.style.animation = "none";
      sliderRef.current.style.transform = `translateX(${scrollPosition}px)`;

      // Resume animation after 5 seconds
      resumeTimeoutRef.current = setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.animation = "";
          setIsPaused(false);
        }
      }, 5000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const testimonialCard = (index: number, key: string) => (
    <div key={key} className="flex-shrink-0 w-[350px] mx-4">
      <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow h-[580px] flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#D9BA4E] text-[#D9BA4E]" />
            ))}
          </div>
          <Quote className="h-8 w-8 text-primary/20" />
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col">
          <p className="text-gray-700 leading-relaxed flex-1 text-sm">
            {t(`testimonials.items.${index}.text`)}
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="font-semibold text-gray-900">
              {t(`testimonials.items.${index}.name`)}
            </p>
            <p className="text-sm text-[#D9BA4E] font-medium">
              {t(`testimonials.items.${index}.program`)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          <div className="slider-container">
            <div
              ref={sliderRef}
              className={`slider-track ${isPaused ? "paused" : ""}`}
            >
              {/* First set - display first 8 testimonials */}
              {Array.from({ length: visibleCount }, (_, i) => i).map((index) =>
                testimonialCard(index, `set1-${index}`)
              )}
              {/* Second set (duplicate) - for seamless loop */}
              {Array.from({ length: visibleCount }, (_, i) => i).map((index) =>
                testimonialCard(index, `set2-${index}`)
              )}
            </div>
          </div>

          {/* Navigation Dots - one for each visible testimonial */}
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {Array.from({ length: visibleCount }, (_, i) => i).map((index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 h-3 bg-[#D9BA4E]"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
          padding-block: 24px;
        }

        .slider-track {
          display: flex;
          width: calc(
            8 * (350px + 32px) * 2
          ); /* 8 items * (width + margin) * 2 sets */
          animation: scroll 60s linear infinite;
          transition: transform 0.5s ease-in-out;
        }

        .slider-track:hover {
          animation-play-state: paused;
        }

        .slider-track.paused {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(
              calc(-8 * (350px + 32px))
            ); /* Exactly one set width */
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonilas;
