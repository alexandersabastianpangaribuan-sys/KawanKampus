import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShieldCheck, 
  PlusCircle, 
  ArrowUpDown,
  Tag,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { MarketItem, MarketCategory, CampusOption, ItemCondition, UserProfile } from '../types';
import { formatRupiah } from '../utils/feeCalculator';

interface KawanMarketViewProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onOpenSellModal: () => void;
  currentUser: UserProfile;
  initialSearch?: string;
}

export const KawanMarketView: React.FC<KawanMarketViewProps> = ({
  items,
  onSelectItem,
  onOpenSellModal,
  currentUser,
  initialSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('Semua');
  const [selectedCampus, setSelectedCampus] = useState<CampusOption>('Semua Kampus');
  const [selectedCondition, setSelectedCondition] = useState<string>('Semua');
  const [selectedMethod, setSelectedMethod] = useState<string>('Semua');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'rating'>('newest');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const categories: MarketCategory[] = [
    'Semua',
    'Anak Kos',
    'Elektronik',
    'Buku',
    'Fashion',
    'Perkuliahan',
    'Lainnya'
  ];

  const campuses: CampusOption[] = [
    'Semua Kampus',
    'UNIMED',
    'USU',
    'POLMED',
    'UMSU',
    'UINSU',
    'UMA',
    'Kampus Lainnya di Medan'
  ];

  const conditions = ['Semua', 'Baru', 'Sangat Baik', 'Baik', 'Cukup'];

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
        const matchesCampus = selectedCampus === 'Semua Kampus' || item.campus === selectedCampus;
        const matchesCondition = selectedCondition === 'Semua' || item.condition === selectedCondition;
        const matchesMethod = selectedMethod === 'Semua' || item.transactionMethod.includes(selectedMethod);
        const matchesPrice = item.price <= maxPrice;

        return matchesSearch && matchesCat && matchesCampus && matchesCondition && matchesMethod && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.sellerRating - a.sellerRating;
        return 0; // Default order
      });
  }, [items, searchQuery, selectedCategory, selectedCampus, selectedCondition, selectedMethod, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('Semua');
    setSelectedCampus('Semua Kampus');
    setSelectedCondition('Semua');
    setSelectedMethod('Semua');
    setMaxPrice(1000000);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Section (Section N) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <span>🛍️ Marketplace Mahasiswa Medan</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Posting Gratis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Kawan Market
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] mt-1">
            Temukan barang bekas berkualitas dari mahasiswa, untuk mahasiswa.
          </p>
        </div>

        <button
          id="btn-market-sell-now"
          onClick={onOpenSellModal}
          className="px-5 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Jual Barang (Gratis)</span>
        </button>
      </div>

      {/* Category Tabs (Section N) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`tab-cat-${cat}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat === 'Semua' && '🌟 '}
            {cat === 'Anak Kos' && '🛏️ '}
            {cat === 'Elektronik' && '⚡ '}
            {cat === 'Buku' && '📚 '}
            {cat === 'Fashion' && '👟 '}
            {cat === 'Perkuliahan' && '📐 '}
            {cat === 'Lainnya' && '📦 '}
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              id="market-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama barang, meja kos, buku, kalkulator..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Campus Filter */}
          <div className="w-full sm:w-56">
            <select
              id="select-filter-campus"
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value as CampusOption)}
              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-gray-700 font-medium"
            >
              {campuses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="w-full sm:w-48">
            <select
              id="select-sort-market"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-gray-700 font-medium"
            >
              <option value="newest">Terbaru</option>
              <option value="price_low">Harga: Rendah ke Tinggi</option>
              <option value="price_high">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Penjual Tertinggi</option>
            </select>
          </div>

          {/* Toggle More Filters */}
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`px-3.5 py-2.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
              showFilterDrawer 
                ? 'bg-blue-50 border-blue-300 text-[#2563EB]' 
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Detail</span>
          </button>
        </div>

        {/* Collapsible Filter Detail Drawer */}
        {showFilterDrawer && (
          <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in">
            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">Kondisi Barang:</label>
              <div className="flex flex-wrap gap-1.5">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${
                      selectedCondition === cond
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">Metode Transaksi:</label>
              <div className="flex flex-wrap gap-1.5">
                {['Semua', 'COD', 'Transfer / QRIS'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMethod(m)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${
                      selectedMethod === m
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-gray-700">Maksimal Harga:</label>
                <span className="font-bold text-[#2563EB]">{formatRupiah(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="1000000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>Rp20rb</span>
                <span>Rp1jt+</span>
              </div>
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:underline font-medium"
              >
                Reset Semua Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count & Active Filter Tags */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>Menampilkan <strong>{filteredItems.length}</strong> barang bekas mahasiswa</span>
        {(selectedCategory !== 'Semua' || selectedCampus !== 'Semua Kampus') && (
          <button onClick={resetFilters} className="text-[#2563EB] hover:underline">
            Reset filter
          </button>
        )}
      </div>

      {/* Products Grid (Section O - Wajib Card elements) */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-3">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto text-2xl">
            🛍️
          </div>
          <h3 className="text-lg font-bold text-gray-900">Belum ada barang yang cocok</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Coba ubah kata kunci pencarian atau reset filter kategori dan kampus Anda.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold rounded-xl text-gray-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`card-product-${item.id}`}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer rounded-2xl bg-white border border-gray-200 hover:border-[#2563EB] hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden text-left"
            >
              {/* Product Photo Stage (Section O & P & Q) */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Condition Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    {item.condition}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#0B3D91] shadow-xs">
                    {item.category}
                  </span>
                </div>

                {item.isFoundingSeller && (
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-amber-950">
                      Founding Seller
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body (Section O) */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Price (Rp) */}
                  <p className="text-base font-extrabold text-[#2563EB]">
                    {formatRupiah(item.price)}
                  </p>

                  {/* Location & Campus */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{item.campus} • {item.location.split('(')[0]}</span>
                  </div>
                </div>

                {/* Seller & Verification Badge (Section O) */}
                <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="truncate">
                    <p className="font-medium text-gray-800 truncate">{item.sellerName}</p>
                    {item.isVerifiedStudent && (
                      <div className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                        <ShieldCheck className="w-3 h-3" />
                        <span>✓ Mahasiswa Terverifikasi</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-900 font-semibold text-[11px] flex-shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{item.sellerRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
