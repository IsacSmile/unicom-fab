import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductGallery({ images = [], name }) {
  const displayImages = (images && images.length > 0)
    ? images.slice(0, 4).filter(Boolean)
    : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const selectedImage = displayImages[currentIndex] || displayImages[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 35; // minimum swipe distance
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 font-neue">
      {/* Main Image Display with Finger Touch Slide Support */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square max-h-[340px] sm:max-h-[420px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group touch-pan-y select-none"
      >
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-full object-cover object-center transition-all duration-300 pointer-events-none"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000';
          }}
        />

        {/* Swipe Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-900 shadow-md flex items-center justify-center backdrop-blur-xs opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-900 shadow-md flex items-center justify-center backdrop-blur-xs opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Slide Indicator Dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {displayImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-slate-950/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs">
          SWIPE ({currentIndex + 1}/{displayImages.length})
        </div>
      </div>

      {/* Square Thumbnail Selector */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {displayImages.map((img, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-slate-950 ring-2 ring-slate-950/20 scale-[1.02]'
                    : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
