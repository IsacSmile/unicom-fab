import React from 'react';
import { Palette } from 'lucide-react';

const COLOR_HEX_MAP = {
  'Obsidian Black': '#0B0F19',
  'Black': '#0B0F19',
  'Heather Charcoal': '#374151',
  'Charcoal': '#374151',
  'Forest Moss': '#1E3A2B',
  'Moss': '#1E3A2B',
  'Espresso Brown': '#3D2314',
  'Brown': '#4A2E1B',
  'Royal Navy': '#1E293B',
  'Navy': '#1E293B',
  'Camel Tan': '#C19A6B',
  'Tan': '#D2B48C',
  'Ivory Cream': '#FDFBF7',
  'Ivory': '#FFFDD0',
  'Cream': '#FFFDD0',
  'White': '#FFFFFF',
  'Pure White': '#FFFFFF',
  'Olive': '#556B2F',
  'Burgundy': '#800020',
  'Wine Red': '#722F37',
  'Crimson': '#DC143C',
  'Slate Grey': '#64748B',
  'Grey': '#64748B',
  'Gray': '#64748B',
  'Beige': '#F5F5DC',
  'Maroon': '#800000',
  'Khaki': '#C3B091',
};

function getColorBg(colorName) {
  if (COLOR_HEX_MAP[colorName]) return COLOR_HEX_MAP[colorName];
  const lower = (colorName || '').toLowerCase();
  if (lower.includes('black')) return '#0B0F19';
  if (lower.includes('charcoal')) return '#374151';
  if (lower.includes('grey') || lower.includes('gray')) return '#64748B';
  if (lower.includes('moss') || lower.includes('forest') || lower.includes('green')) return '#1E3A2B';
  if (lower.includes('brown') || lower.includes('espresso')) return '#3D2314';
  if (lower.includes('navy') || lower.includes('blue')) return '#1E293B';
  if (lower.includes('tan') || lower.includes('camel') || lower.includes('beige')) return '#C19A6B';
  if (lower.includes('white') || lower.includes('cream') || lower.includes('ivory')) return '#FDFBF7';
  if (lower.includes('red') || lower.includes('maroon') || lower.includes('wine')) return '#800020';
  return '#64748B';
}

export function ColourSelector({ colours = [], selectedColour, onSelect }) {
  if (!colours || colours.length === 0) return null;

  return (
    <div className="space-y-2 font-neue">
      <label className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-[#B97832]" />
          <span>Select Colour Variant</span>
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {colours.map((col) => {
          const isSelected = selectedColour === col;
          const bgHex = getColorBg(col);

          return (
            <button
              key={col}
              type="button"
              onClick={() => onSelect(col)}
              title={col}
              aria-label={col}
              className={`w-9 h-9 rounded-xl transition-all duration-200 border border-black/10 shadow-2xs ${
                isSelected
                  ? 'ring-2 ring-slate-950 ring-offset-2 scale-105 shadow-md'
                  : 'hover:scale-105 opacity-90 hover:opacity-100'
              }`}
              style={{ backgroundColor: bgHex }}
            />
          );
        })}
      </div>
    </div>
  );
}
