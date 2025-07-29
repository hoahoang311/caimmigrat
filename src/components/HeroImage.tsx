'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const canadianCityImages = [
  {
    src: "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Vancouver skyline representing Canadian immigration opportunities",
    city: "Vancouver"
  },
  {
    src: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Toronto downtown representing Canadian immigration opportunities", 
    city: "Toronto"
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Ottawa Parliament Hill representing Canadian immigration opportunities",
    city: "Ottawa"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Montreal cityscape representing Canadian immigration opportunities",
    city: "Montreal"
  },
  {
    src: "/canada-placeholder.svg",
    alt: "Canada immigration destination placeholder",
    city: "Canada"
  }
];

export default function HeroImage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate images every 10 seconds
  useEffect(() => {
    // Don't auto-rotate if we're showing an error, paused, or on the SVG placeholder
    if (imageError || isPaused || currentImageIndex >= canadianCityImages.length - 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Only cycle through the first 4 images (excluding SVG placeholder)
        const nextIndex = (prevIndex + 1) % (canadianCityImages.length - 1);
        setIsLoading(true);
        return nextIndex;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [imageError, currentImageIndex, isPaused]);

  const handleImageError = () => {
    if (currentImageIndex < canadianCityImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImageError(false);
      setIsLoading(true);
    } else {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const currentImage = canadianCityImages[currentImageIndex];

  if (imageError) {
    // Fallback gradient background if all images fail
    return (
      <div className="relative">
        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
          <div className="text-center text-white">
            <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Canada</h3>
            <p className="text-blue-100">Your Immigration Destination</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        {/* Floating Card */}
        <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-red-500" />
            <div>
              <div className="font-semibold text-gray-900">Canada</div>
              <div className="text-sm text-gray-600">Your new home awaits</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            isLoading ? 'opacity-70' : 'opacity-100'
          }`}
          priority
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Image indicators */}
        {!imageError && canadianCityImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {canadianCityImages.slice(0, -1).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsLoading(true);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`View ${canadianCityImages[index].city} image`}
              />
            ))}
          </div>
        )}

        {/* City name overlay */}
        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentImage.city}
        </div>
      </div>
      
      {/* Floating Card */}
      <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border transition-transform duration-300 group-hover:scale-105">
        <div className="flex items-center space-x-3">
          <MapPin className="h-8 w-8 text-red-500" />
          <div>
            <div className="font-semibold text-gray-900">{currentImage.city}</div>
            <div className="text-sm text-gray-600">Your new home awaits</div>
          </div>
        </div>
      </div>
    </div>
  );
}