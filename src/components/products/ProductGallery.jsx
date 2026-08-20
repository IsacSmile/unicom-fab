import React, { useState } from 'react';

export function ProductGallery({ images = [], name }) {
  const displayImages = images.length > 0
    ? images.slice(0, 4)
    : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000'];

  const [selectedImage, setSelectedImage] = useState(displayImages[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative aspect-[4/5] max-h-[330px] sm:max-h-[420px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />
        <div className="absolute bottom-3 right-3 bg-brand-950/70 text-white text-[11px] font-mono px-2.5 py-1 rounded-md backdrop-blur-xs">
          MAX 4 INSPECTION VIEWS
        </div>
      </div>

      {/* Thumbnail Selector */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((img, index) => {
            const isSelected = img === selectedImage;
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected ? 'border-brand-950 ring-2 ring-brand-950/20' : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${name} view ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
