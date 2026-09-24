import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Bookmark, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  SlidersHorizontal,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfile, UserLevel } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  setUserLevel: (level: UserLevel) => void;
  onOpenAuth: () => void;
  onOpenKtmVerification: () => void;
  onOpenAddProduct: () => void;
  onOpenAddCommunity: () => void;
  savedCount: number;
  orderCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  setUserLevel,
  onOpenAuth,
  onOpenKtmVerification,
  onOpenAddProduct,
  onOpenAddCommunity,
  savedCount,
  orderCount,
  searchQuery,
  setSearchQuery,
  onSearchSubmit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [personaSelectorOpen, setPersonaSelectorOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'market', label: 'Kawan Market' },
    { id: 'jasa', label: 'Kawan Jasa' },
    { id: 'komunitas', label: 'Kawan Komunitas' },
  ];

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top micro-bar: Clean brand tagline & quick persona switcher */}
      <div className="bg-[#0B3D91] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-tight">KawanKampus.id</span>
            <span className="text-blue-300 hidden sm:inline">•</span>
            <span className="text-blue-200 text-[11px] sm:text-xs">Lebih dari Sekadar Marketplace.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-blue-200 hidden sm:inline text-[11px]">Mode Akses:</span>
            <div className="relative">
              <button
                id="btn-persona-selector"
                onClick={() => setPersonaSelectorOpen(!personaSelectorOpen)}
                className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-blue-800 text-white px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-400/30 transition-colors"
                title="Ganti persona untuk menguji level akses"
              >
                {user.level === 'visitor' && '👤 Level 1: Pengunjung'}
                {user.level === 'buyer' && '🛒 Level 2: Pembeli'}
                {user.level === 'verified_student' && '🎓 Level 3: Mahasiswa Terverifikasi'}
                {user.level === 'admin' && '🛡️ Admin Panel'}
                <ChevronDown className="w-3 h-3 text-blue-300" />
              </button>

              {personaSelectorOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Ganti Akses Pengguna
                    </p>
                  </div>
                  <button
                    onClick={() => { setUserLevel('visitor'); setPersonaSelectorOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-50 ${user.level === 'visitor' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
                  >
                    <div>
                      <div className="font-medium">Level 1 — Pengunjung</div>
                      <div className="text-[10px] text-gray-500">Tanpa login, jelajah bebas</div>
                    </div>
                    {user.level === 'visitor' && <span className="text-blue-600">✓</span>}
                  </button>

                  <button
                    onClick={() => { setUserLevel('buyer'); setPersonaSelectorOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-50 ${user.level === 'buyer' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
                  >
                    <div>
                      <div className="font-medium">Level 2 — Pembeli</div>
                      <div className="text-[10px] text-gray-500">Beli barang, order jasa & digital</div>
                    </div>
                    {user.level === 'buyer' && <span className="text-blue-600">✓</span>}
                  </button>

                  <button
                    onClick={() => { setUserLevel('verified_student'); setPersonaSelectorOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-50 ${user.level === 'verified_student' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
                  >
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        Level 3 — Terverifikasi
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-[10px] text-gray-500">Jual barang, tawarkan jasa, kontribusi</div>
                    </div>
                    {user.level === 'verified_student' && <span className="text-blue-600">✓</span>}
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => { 
                      setUserLevel('admin'); 
                      setActiveTab('admin');
                      setPersonaSelectorOpen(false); 
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-purple-50 ${user.level === 'admin' ? 'bg-purple-50 text-purple-700 font-semibold' : ''}`}
                  >
                    <div>
                      <div className="font-medium text-purple-700 flex items-center gap-1">
                        Admin Dashboard
                      </div>
                      <div className="text-[10px] text-gray-500">Verifikasi KTM, moderasi & keuangan</div>
                    </div>
                    {user.level === 'admin' && <span className="text-purple-600">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <button 
            id="nav-brand-logo"
            onClick={() => setActiveTab('beranda')} 
            className="flex-shrink-0 focus:outline-none"
          >
            <Logo size="md" showTagline={true} />
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                id="nav-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                placeholder="Cari barang, jasa, beasiswa, lomba, atau kegiatan..."
                className="w-full pl-9 pr-24 py-2 bg-gray-100/90 border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <button
                onClick={() => onSearchSubmit(searchQuery)}
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#2563EB] text-white text-xs font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Cari
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    isActive 
                      ? 'text-[#2563EB] bg-blue-50/70 font-semibold' 
                      : 'text-gray-600 hover:text-[#0B3D91] hover:bg-gray-100/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2">
            {/* Quick Post Action: If verified student, show + Jual Barang */}
            {user.level === 'verified_student' ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  id="btn-quick-sell"
                  onClick={onOpenAddProduct}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Jual Barang
                </button>
              </div>
            ) : user.level === 'buyer' ? (
              <button
                id="btn-verify-ktm-prompt"
                onClick={onOpenKtmVerification}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-medium border border-amber-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Verifikasi KTM untuk Jual
              </button>
            ) : null}

            {/* Saved Items & Orders Indicator (For buyers and students) */}
            {user.level !== 'visitor' && (
              <button
                id="btn-nav-orders"
                onClick={() => setActiveTab('dashboard')}
                className="relative p-2 text-gray-600 hover:text-[#0B3D91] hover:bg-gray-100 rounded-full transition-colors"
                title="Pesanan & Aktivitas Saya"
              >
                <ShoppingBag className="w-5 h-5" />
                {orderCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#2563EB] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {orderCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth or Profile */}
            {user.level === 'visitor' ? (
              <div className="flex items-center gap-2">
                <button
                  id="btn-login-trigger"
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:text-[#0B3D91] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Masuk
                </button>
                <button
                  id="btn-register-trigger"
                  onClick={onOpenAuth}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-all shadow-blue-500/20"
                >
                  Daftar
                </button>
              </div>
            ) : (
              /* User Profile Menu */
              <div className="relative">
                <button
                  id="btn-profile-dropdown"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.avatarUrl}
                    alt="Foto Profil Pengguna"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-gray-900 leading-tight">
                        {user.name.split(' ')[0]}
                      </span>
                      {user.verificationStatus === 'Terverifikasi' && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 leading-tight">
                      {user.campus}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          user.verificationStatus === 'Terverifikasi' 
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          {user.verificationStatus === 'Terverifikasi' ? '✓ Mahasiswa Terverifikasi' : 'Verifikasi Menunggu'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setActiveTab('dashboard'); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        Dashboard Pengguna
                      </button>
                      
                      {user.level === 'verified_student' && (
                        <>
                          <button
                            onClick={() => { onOpenAddProduct(); setProfileDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <PlusCircle className="w-4 h-4 text-emerald-600" />
                            Posting Barang Baru
                          </button>
                          <button
                            onClick={() => { onOpenAddCommunity(); setProfileDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Bookmark className="w-4 h-4 text-blue-600" />
                            Kirim Informasi Komunitas
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => { onOpenKtmVerification(); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                        Status Verifikasi KTM
                      </button>
                    </div>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={() => { setUserLevel('visitor'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar Akun
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (under header on small screens) */}
        <div className="md:hidden py-2.5 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              placeholder="Cari barang, jasa, beasiswa, lomba, atau kegiatan..."
              className="w-full pl-9 pr-20 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <button
              onClick={() => onSearchSubmit(searchQuery)}
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#2563EB] text-white text-xs font-semibold rounded-full"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100 flex flex-col gap-1 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  activeTab === link.id
                    ? 'bg-blue-50 text-[#2563EB] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {user.level !== 'visitor' && (
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>Dashboard Saya</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {orderCount} Pesanan
                </span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-purple-700 bg-purple-50/60 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Buka Admin Panel (Prototype)
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
