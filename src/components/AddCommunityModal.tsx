import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Upload, 
  Calendar, 
  Building, 
  CheckCircle2 
} from 'lucide-react';
import { CommunityCategory, CommunityItem, UserProfile } from '../types';

interface AddCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishItem: (item: CommunityItem) => void;
  currentUser: UserProfile;
}

export const AddCommunityModal: React.FC<AddCommunityModalProps> = ({
  isOpen,
  onClose,
  onPublishItem,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<CommunityCategory>('Info Kampus');
  const [subCategory, setSubCategory] = useState('Organisasi');
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState(`BEM / HIMA ${currentUser.campus || 'UNIMED'}`);
  const [campusOrScope, setCampusOrScope] = useState(currentUser.campus || 'UNIMED');
  const [deadlineOrDate, setDeadlineOrDate] = useState('15 November 2025');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [featuredOption, setFeaturedOption] = useState<'NONE' | '7_DAYS'>('NONE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary) return;

    let sampleImg = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
    if (category === 'Beasiswa') sampleImg = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
    if (category === 'Lomba & Kompetisi') sampleImg = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';
    if (category === 'Peluang & Kegiatan') sampleImg = 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80';

    onPublishItem({
      id: `comm-${Date.now()}`,
      title,
      category,
      subCategory: category === 'Info Kampus' ? undefined : subCategory,
      campusOrScope,
      deadlineOrDate,
      organizer,
      summary,
      details: details || summary,
      image: sampleImg,
      altText: `Flyer ${title}`,
      isFeatured: featuredOption !== 'NONE',
      featuredDays: featuredOption === '7_DAYS' ? 7 : undefined,
      dateAdded: 'Hari Ini',
      savedCount: 0,
      status: 'Dipublikasikan',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              📢 Posting Info Mahasiswa
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-0.5">
              Kirim Flyer Info Kampus, Beasiswa, atau Lomba
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free posting notice (Section AG) */}
        <div className="px-6 py-2.5 bg-emerald-50 text-emerald-900 text-xs flex items-center justify-between border-b border-emerald-100">
          <span className="font-semibold">Informasi Komunitas Tetap GRATIS</span>
          <span className="text-[11px] text-emerald-700">Untuk Seluruh Lembaga & Mahasiswa</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kategori Informasi</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityCategory)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Info Kampus">Info Kampus</option>
                <option value="Beasiswa">Beasiswa</option>
                <option value="Lomba & Kompetisi">Lomba & Kompetisi</option>
                <option value="Peluang & Kegiatan">Peluang & Kegiatan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Penyelenggara / Panitia</label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Nama BEM / Lembaga"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Judul Kegiatan / Beasiswa</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Open Recruitment Panitia Dies Natalis 2025"
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Cakupan / Kampus</label>
              <input
                type="text"
                value={campusOrScope}
                onChange={(e) => setCampusOrScope(e.target.value)}
                placeholder="Contoh: UNIMED / Kota Medan / Nasional"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Batas Waktu / Tanggal</label>
              <input
                type="text"
                value={deadlineOrDate}
                onChange={(e) => setDeadlineOrDate(e.target.value)}
                placeholder="Contoh: 30 November 2025"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Ringkasan Singkat Flyer</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Jelaskan secara ringkas syarat utama atau tujuan acara..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          {/* Optional Featured Placement (Section AG) */}
          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sorot Informasi (Featured Placement - Opsional)</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Tampilkan flyer di urutan prioritas teratas dengan paket Featured (kesempatan pin hingga 3 postingan selama 7 hari).
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFeaturedOption('NONE')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  featuredOption === 'NONE'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold ring-1 ring-emerald-400'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Gratis Standar</span>
                <span className="block text-[10px] text-gray-400">Rp0</span>
              </button>
              <button
                type="button"
                onClick={() => setFeaturedOption('7_DAYS')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  featuredOption === '7_DAYS'
                    ? 'border-amber-600 bg-amber-100 text-amber-950 font-bold ring-1 ring-amber-400'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Featured 7 Hari</span>
                <span className="block text-[10px] text-amber-700 font-bold">Rp10.000 (Pin hingga 3 postingan)</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md transition-all"
            >
              Publikasikan Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
