import React from 'react';
import { 
  Search, 
  ArrowRight, 
  ShoppingBag, 
  Briefcase, 
  Laptop, 
  Megaphone, 
  ShieldCheck, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenSell: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenSell,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  const quickSearchTags = [
    'Meja Belajar',
    'SPSS Skripsi',
    'Edit PPT Sidang',
    'Cek Turnitin',
    'Parafrase Skripsi',
    'Beasiswa',
    'Kalkulator Casio'
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
    }
  };

  const categories = [
    {
      id: 'market',
      title: 'Kawan Market',
      emoji: '🛍️',
      subtitle: 'Barang mahasiswa, dari mahasiswa.',
      desc: 'Jual-beli perlengkapan kos, elektronik, buku kuliah & fashion sesama mahasiswa dengan aman.',
      color: 'from-blue-600 to-[#0B3D91]',
      borderColor: 'border-blue-200',
      badge: 'Bebas Biaya Posting',
      badgeColor: 'bg-blue-100 text-blue-800',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      altText: 'Mahasiswa Indonesia berdiskusi santai tentang barang preloved kampus'
    },
    {
      id: 'jasa',
      title: 'Kawan Jasa',
      emoji: '🛠️',
      subtitle: 'Layanan tugas & skripsi resmi tim KawanKampus.',
      desc: 'Solusi terpercaya PPT Sidang, Olah Data SPSS, Cek Turnitin No Repo, Parafrase Lolos Similarity, dan Olah Data Excel.',
      color: 'from-purple-600 to-[#7C3AED]',
      borderColor: 'border-purple-200',
      badge: 'Layanan Resmi Tim',
      badgeColor: 'bg-purple-100 text-purple-800',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      altText: 'Mahasiswa mengerjakan analisis data dan slide presentasi di laptop'
    },
    {
      id: 'komunitas',
      title: 'Kawan Komunitas',
      emoji: '📢',
      subtitle: 'Informasi dan peluang mahasiswa.',
      desc: 'Flyer info kampus, beasiswa, kompetisi lomba akademik/non-akademik, dan open recruitment kegiatan.',
      color: 'from-emerald-600 to-teal-700',
      borderColor: 'border-emerald-200',
      badge: 'Flyer & Card Based',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      altText: 'Mahasiswa berkolaborasi dalam komunitas kampus di perpustakaan'
    },
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-12">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/80 via-purple-50/40 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Hero Card Container */}
        <div className="relative rounded-3xl bg-white border border-gray-200 shadow-sm p-6 sm:p-10 lg:p-12 overflow-hidden mb-12">
          {/* Subtle decoration elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust & Location Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0B3D91] border border-blue-200">
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                  Ekosistem Mahasiswa Medan
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verifikasi Mahasiswa Aman (KTM)
                </span>
              </div>

              {/* Master Headline (Section L) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-[1.2]">
                Teman Terbaik Setiap Langkah di{' '}
                <span className="text-[#0B3D91]">Dunia</span>{' '}
                <span className="text-[#2563EB]">Kampus.</span>
              </h1>

              {/* Master Subheadline (Section L) */}
              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Temukan barang bekas mahasiswa terjangkau, layanan pengerjaan tugas & skripsi resmi tim KawanKampus, serta info beasiswa dan lomba dalam satu platform khusus mahasiswa.
              </p>

              {/* Search Bar (Section L) */}
              <div className="pt-2">
                <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl p-1.5 focus-within:border-[#2563EB] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm">
                  <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
                  <input
                    id="hero-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Cari barang, jasa, beasiswa, lomba, atau kegiatan..."
                    className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    id="hero-search-button"
                    onClick={() => onSearchSubmit(searchQuery)}
                    className="flex-shrink-0 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Cari</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Search suggestions tags */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                  <span className="font-medium text-gray-600">Populer:</span>
                  {quickSearchTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        onSearchSubmit(tag);
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Master CTAs (Section L) */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="hero-cta-explore"
                  onClick={() => onNavigate('market')}
                  className="px-6 py-3 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Mulai Menjelajah
                </button>
                <button
                  id="hero-cta-sell"
                  onClick={onOpenSell}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#0B3D91] border-2 border-[#0B3D91] font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                  Jual Barang (Gratis)
                </button>
              </div>
            </div>

            {/* Right Visual Column (Modern Gen Z Indonesian Student Atmosphere) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Mahasiswa Indonesia berdiskusi dan menggunakan laptop di lingkungan kampus Medan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay highlight badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 text-gray-900 shadow-md border border-white/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0B3D91] flex items-center justify-center font-bold text-sm">
                        KK
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0B3D91]">
                          Komunitas Mahasiswa Medan
                        </p>
                        <p className="text-[11px] text-gray-500">
                          UNIMED • USU • POLMED • UMSU • UINSU • UMA
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded bg-emerald-100 text-emerald-800">
                      Aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Ecosystem Category Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                Tiga Ekosistem KawanKampus
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Satu platform terpadu untuk kebutuhan perlengkapan, pengerjaan tugas & skripsi, serta komunitas mahasiswa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                id={`card-category-${cat.id}`}
                onClick={() => onNavigate(cat.id)}
                className="group cursor-pointer rounded-2xl bg-white border border-gray-200 hover:border-[#2563EB] hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden text-left"
              >
                {/* Card Image banner conforming to Section BK/BL/BO */}
                <div className="relative h-36 overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.emoji}</span>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors text-base">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#0B3D91] mt-1">
                      {cat.subtitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#2563EB]">
                    <span>Buka Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
