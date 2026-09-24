import React, { useState, useMemo } from 'react';
import { 
  Megaphone, 
  GraduationCap, 
  Trophy, 
  Briefcase, 
  Search, 
  Calendar, 
  Building, 
  Bookmark, 
  Sparkles, 
  ArrowRight,
  Filter,
  PlusCircle,
  Tag
} from 'lucide-react';
import { CommunityItem, CommunityCategory, UserProfile } from '../types';

interface KawanKomunitasViewProps {
  items: CommunityItem[];
  onSelectItem: (item: CommunityItem) => void;
  savedItemIds: string[];
  onToggleSave: (id: string) => void;
  onOpenAddCommunity: () => void;
  currentUser: UserProfile;
}

export const KawanKomunitasView: React.FC<KawanKomunitasViewProps> = ({
  items,
  onSelectItem,
  savedItemIds,
  onToggleSave,
  onOpenAddCommunity,
  currentUser,
}) => {
  const [activeCategory, setActiveCategory] = useState<CommunityCategory | 'Semua'>('Semua');
  const [selectedCampusFilter, setSelectedCampusFilter] = useState<string>('Semua');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByDeadline, setSortByDeadline] = useState(false);

  const categories: { id: CommunityCategory | 'Semua'; label: string; icon: string }[] = [
    { id: 'Semua', label: 'Semua Info', icon: '🌟' },
    { id: 'Info Kampus', label: 'Info Kampus', icon: '🏫' },
    { id: 'Beasiswa', label: 'Beasiswa', icon: '🎓' },
    { id: 'Lomba & Kompetisi', label: 'Lomba & Kompetisi', icon: '🏆' },
    { id: 'Peluang & Kegiatan', label: 'Peluang & Kegiatan', icon: '📢' },
  ];

  const subCategoriesLomba = ['Semua', 'Business Plan', 'Debate', 'KTI', 'Design', 'Essay', 'Photography'];
  const subCategoriesPeluang = ['Semua', 'Organisasi', 'Pengembangan', 'Pengalaman'];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = activeCategory === 'Semua' || item.category === activeCategory;
      const matchCampus = selectedCampusFilter === 'Semua' || item.campusOrScope.includes(selectedCampusFilter);
      const matchSub = 
        selectedSubCategory === 'Semua' || 
        (item.subCategory && item.subCategory === selectedSubCategory);
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organizer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchCampus && matchSub && matchSearch;
    });
  }, [items, activeCategory, selectedCampusFilter, selectedSubCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header (Section AB) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <span>📢 Kawan Komunitas</span>
            <span>•</span>
            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Pusat Peluang Mahasiswa Medan
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Kawan Komunitas
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] mt-1 max-w-2xl">
            Desain berbasis flyer untuk update info akademik kampus, beasiswa aktif, kompetisi lomba, dan peluang kepengurusan/magang.
          </p>
        </div>

        {currentUser.level === 'verified_student' && (
          <button
            id="btn-add-community-flyer"
            onClick={onOpenAddCommunity}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Kirim Info Komunitas (Gratis)</span>
          </button>
        )}
      </div>

      {/* 4 Category Pill Tabs (Section AB & BZ) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`tab-community-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedSubCategory('Semua');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-[#0B3D91] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari beasiswa, lomba business plan, webinar, oprec BEM..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Campus Filter */}
          <div className="w-full sm:w-56">
            <select
              value={selectedCampusFilter}
              onChange={(e) => setSelectedCampusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="Semua">Semua Kampus & Nasional</option>
              <option value="UNIMED">UNIMED</option>
              <option value="USU">USU</option>
              <option value="POLMED">POLMED</option>
              <option value="UMSU">UMSU</option>
              <option value="UINSU">UINSU</option>
              <option value="Medan">Khusus Kota Medan</option>
              <option value="Nasional">Tingkat Nasional</option>
            </select>
          </div>
        </div>

        {/* Sub-Category Pills for Lomba & Peluang (Section AE & AF) */}
        {activeCategory === 'Lomba & Kompetisi' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-500 font-medium">Kategori Lomba:</span>
            {subCategoriesLomba.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  selectedSubCategory === sub
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {activeCategory === 'Peluang & Kegiatan' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-500 font-medium">Jenis Peluang:</span>
            {subCategoriesPeluang.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  selectedSubCategory === sub
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured Community Notice */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-amber-900 bg-amber-50/80 border border-amber-200 p-3.5 sm:p-4 rounded-2xl">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-amber-100 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0">
            <Sparkles className="w-4 h-4 fill-amber-500 text-amber-600" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-amber-950 text-xs sm:text-sm">
                Featured <span className="text-amber-800 font-black">Rp10.000 / 7 hari</span> — Kesempatan pin <span className="text-amber-800 font-black">hingga 3 postingan</span>.
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-800/90 mt-0.5 leading-relaxed">
              Dengan paket Featured, pengguna mendapatkan kesempatan untuk mem-pin hingga 3 postingan selama periode 7 hari.
            </p>
          </div>
        </div>
      </div>

      {/* Flyer / Card Based Grid (Section BR - Rectangular Flyer format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isSaved = savedItemIds.includes(item.id);

          return (
            <div
              key={item.id}
              id={`card-community-${item.id}`}
              onClick={() => onSelectItem(item)}
              className={`group cursor-pointer rounded-3xl bg-white border hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between text-left ${
                item.isFeatured 
                  ? 'border-amber-300 ring-2 ring-amber-100' 
                  : 'border-gray-200 hover:border-[#2563EB]'
              }`}
            >
              <div>
                {/* Rectangular Flyer Image Aspect Ratio (Section BL & BR: 4:5 or 16:10) */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-[#0B3D91] shadow-xs">
                      {item.category}
                    </span>
                    {item.subCategory && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                        {item.subCategory}
                      </span>
                    )}
                  </div>

                  {/* Featured Badge (Section AG) */}
                  {item.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-current" />
                        FEATURED
                      </span>
                    </div>
                  )}

                  {/* Deadline date overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-[11px]">
                    <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      Batas: {item.deadlineOrDate}
                    </span>
                    <span className="bg-blue-600/90 backdrop-blur-xs px-2 py-0.5 rounded-md font-medium">
                      {item.campusOrScope}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-medium text-gray-400 block truncate">
                      Oleh: {item.organizer}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(item.id);
                  }}
                  className={`p-2 rounded-xl border transition-colors flex items-center gap-1 ${
                    isSaved
                      ? 'bg-blue-50 border-blue-200 text-[#2563EB]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Simpan flyer informasi"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span className="text-[11px]">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                </button>

                <div className="flex items-center gap-1 font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                  <span>Lihat Flyer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
