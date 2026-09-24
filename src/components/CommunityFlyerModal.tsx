import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Share2, 
  Bookmark, 
  Award, 
  Users, 
  Building, 
  ExternalLink,
  Sparkles,
  Clock
} from 'lucide-react';
import { CommunityItem } from '../types';

interface CommunityFlyerModalProps {
  item: CommunityItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const CommunityFlyerModal: React.FC<CommunityFlyerModalProps> = ({
  item,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flyer Visual Header (Section BR - Rectangular Flyer format) */}
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.altText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Category & Featured Badge */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm">
              {item.category}
            </span>
            {item.isFeatured && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                FEATURED
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-blue-300" />
              <span className="font-semibold">{item.campusOrScope}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Batas: {item.deadlineOrDate}</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Penyelenggara: <strong>{item.organizer}</strong></span>
              <span>Ditambahkan: {item.dateAdded}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#2563EB] font-medium bg-blue-50/70 p-3 rounded-xl border border-blue-100">
              {item.summary}
            </p>
          </div>

          {/* Detailed Info */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Rincian & Ketentuan:
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-line">
              {item.details}
            </p>
          </div>

          {/* Flyer footer actions */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={() => onToggleSave(item.id)}
              className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-blue-50 border-blue-300 text-[#2563EB]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Tersimpan di Akun' : 'Simpan Peluang'}</span>
            </button>

            <button
              onClick={() => {
                alert(`Tautan informasi telah disalin ke clipboard! Silakan hubungi panitia ${item.organizer}.`);
              }}
              className="py-2.5 px-5 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>Daftar / Akses Info</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
