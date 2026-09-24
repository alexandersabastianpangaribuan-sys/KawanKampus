import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Store, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserLevel } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (level: UserLevel, name: string) => void;
  onOpenKtmVerification: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenKtmVerification,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register' | 'role_select'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi email dan password.');
      return;
    }
    // Simulate login for buyer or student
    onLoginSuccess('buyer', email.split('@')[0] || 'Alexander');
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setErrorMsg('Mohon lengkapi seluruh kolom formulir pendaftaran.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi password tidak cocok.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('Anda wajib menyetujui Syarat & Ketentuan dan Kebijakan Privasi.');
      return;
    }
    setErrorMsg('');
    // Advance to Section AJ: Role selection step!
    setMode('role_select');
  };

  const handleSelectRole = (chosenRole: 'buyer' | 'seller') => {
    if (chosenRole === 'buyer') {
      onLoginSuccess('buyer', name || 'Pengguna Mahasiswa');
      onClose();
    } else {
      // Role seller is directed to KTM verification (Section AJ)
      onLoginSuccess('buyer', name || 'Calon Penjual Mahasiswa');
      onClose();
      onOpenKtmVerification();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content depending on Mode */}
        {mode === 'login' && (
          /* Section AH: Login Screen */
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Masuk ke Akun
              </span>
              <h3 className="text-2xl font-bold text-[#111827] mt-1">
                Selamat Datang Kembali 👋
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Masuk untuk berbelanja, memesan jasa, dan memantau transaksi kampusmu.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Email atau Nomor HP</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@mahasiswa.ac.id atau 0812..."
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-gray-700">Password</label>
                  <span className="text-[11px] text-[#2563EB] hover:underline cursor-pointer">
                    Lupa Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <input
                  type="checkbox"
                  id="remember-me"
                  defaultChecked
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <label htmlFor="remember-me" className="text-gray-600 select-none">
                  Ingat saya di perangkat ini
                </label>
              </div>

              <button
                type="submit"
                id="btn-submit-login"
                className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm"
              >
                Masuk ke KawanKampus
              </button>
            </form>

            {/* Google Login Simulation (Section AH) */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs text-gray-400">
                <span className="bg-white px-2">atau lanjutkan dengan</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onLoginSuccess('buyer', 'Mahasiswa Google');
                onClose();
              }}
              className="w-full py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Masuk dengan Google</span>
            </button>

            <div className="text-center pt-2 text-xs text-gray-500">
              Belum punya akun?{' '}
              <button
                onClick={() => { setMode('register'); setErrorMsg(''); }}
                className="font-bold text-[#2563EB] hover:underline"
              >
                Daftar sekarang.
              </button>
            </div>
          </div>
        )}

        {mode === 'register' && (
          /* Section AI: Registrasi */
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Akun Baru Mahasiswa
              </span>
              <h3 className="text-2xl font-bold text-[#111827] mt-1">
                Daftar KawanKampus ✨
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Daftar akun gratis untuk akses pasar dan peluang mahasiswa di Medan.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama sesuai identitas"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@kampus.ac.id"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxxx"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 karakter"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Ulangi Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-600">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB] mt-0.5"
                  required
                />
                <label htmlFor="agree-terms">
                  Saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi KawanKampus.id
                </label>
              </div>

              <button
                type="submit"
                id="btn-submit-register"
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm mt-2"
              >
                Lanjutkan (Pilih Peran Pengguna) →
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-gray-500">
              Sudah punya akun?{' '}
              <button
                onClick={() => { setMode('login'); setErrorMsg(''); }}
                className="font-bold text-[#2563EB] hover:underline"
              >
                Masuk di sini.
              </button>
            </div>
          </div>
        )}

        {mode === 'role_select' && (
          /* Section AJ: Pemilihan Role */
          <div className="p-6 sm:p-8 space-y-5 animate-in fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Langkah Terakhir
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Kamu ingin menggunakan KawanKampus sebagai apa?
              </h3>
              <p className="text-xs text-gray-500">
                Pilih tujuan utamamu. Kamu bisa menyesuaikannya kapan saja.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Option 1: Buyer */}
              <div
                id="role-option-buyer"
                onClick={() => handleSelectRole('buyer')}
                className="p-4 rounded-2xl border-2 border-gray-200 hover:border-[#2563EB] hover:bg-blue-50/40 cursor-pointer transition-all group flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#0B3D91] flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-105 transition-transform">
                  🛒
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#2563EB] transition-colors">
                    Saya Ingin Membeli / Mencari
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Cari barang kos murah, pesan jasa PPT/SPSS, beli produk digital, dan temukan berbagai info beasiswa & lomba.
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-2">
                    ✓ Tanpa Perlu Verifikasi KTM Sekarang
                  </span>
                </div>
              </div>

              {/* Option 2: Seller/Provider */}
              <div
                id="role-option-seller"
                onClick={() => handleSelectRole('seller')}
                className="p-4 rounded-2xl border-2 border-purple-200 hover:border-purple-600 hover:bg-purple-50/40 cursor-pointer transition-all group flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-105 transition-transform">
                  🏪
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
                    Saya Ingin Menjual / Menawarkan
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Jual barang bekas, tawarkan jasa PPT/SPSS, atau berkontribusi memberikan informasi kegiatan kampus.
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Lanjut ke Verifikasi KTM Mahasiswa
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
