import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, MapPin, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReport }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 text-[#111827]">
      {/* Upper Footer: Brand info and 4 menu columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col (2 cols span on large) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showTagline={false} />
            <p className="text-sm font-semibold text-[#0B3D91] tracking-wide">
              “Lebih dari Sekadar Marketplace.”
            </p>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm">
              Teman Terbaik Setiap Langkah di Dunia Kampus. Platform digital mahasiswa yang mengintegrasikan pasar barang bekas mahasiswa, layanan tugas & skripsi resmi, dan peluang komunitas.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <a
                href="https://t.me/kawankampuss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors w-fit"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat di Telegram (@kawankampuss)</span>
              </a>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
              <span>Fokus Awal: Medan, Sumatera Utara (UNIMED, USU, POLMED, UMSU, UINSU, UMA, dll)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit border border-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Verifikasi Mahasiswa Aman Berbasis KTM</span>
            </div>
          </div>

          {/* Col 1: KawanKampus & Kontak */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              KawanKampus
            </h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li>
                <button 
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-[#2563EB] transition-colors text-left"
                >
                  Cara Kerja
                </button>
              </li>
              <li>
                <a 
                  href="https://t.me/kawankampuss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563EB] text-[#2563EB] font-medium flex items-center gap-1"
                >
                  Telegram: @kawankampuss
                </a>
              </li>
              <li>
                <span className="text-gray-600 text-xs">Email: info@kawankampus.id</span>
              </li>
              <li>
                <span className="text-xs text-gray-500">Komunitas Mahasiswa Kampus Medan</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Layanan */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Layanan
            </h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li>
                <button 
                  onClick={() => onNavigate('market')}
                  className="hover:text-[#2563EB] transition-colors text-left font-medium text-gray-800"
                >
                  Kawan Market
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('jasa')}
                  className="hover:text-[#2563EB] transition-colors text-left font-medium text-gray-800"
                >
                  Kawan Jasa
                </button>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  PPT, SPSS, Turnitin, Parafrase, Excel
                </p>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('komunitas')}
                  className="hover:text-[#2563EB] transition-colors text-left font-medium text-gray-800"
                >
                  Kawan Komunitas
                </button>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Info Beasiswa, Lomba & Acara
                </p>
              </li>
            </ul>
          </div>

          {/* Col 3: Bantuan & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Bantuan & Keamanan
            </h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li>
                <button 
                  onClick={onOpenReport}
                  className="hover:text-red-600 transition-colors text-left font-medium text-red-700 flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Laporkan Masalah / Transaksi
                </button>
              </li>
              <li>
                <span className="text-gray-500">Pusat Bantuan Mahasiswa</span>
              </li>
              <li>
                <span className="text-gray-500">Kebijakan Privasi & KTM</span>
              </li>
              <li>
                <span className="text-gray-500">Syarat & Ketentuan Layanan</span>
              </li>
              <li>
                <span className="text-gray-500">Kebijakan Bebas Fee Posting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype compliance note (Section BX & BW) */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-500 space-y-2">
          <p className="bg-gray-50 p-3 rounded-lg border border-gray-200/70 text-gray-600 leading-relaxed">
            <strong>Catatan Kepatuhan & Simulasi Prototype:</strong> Fitur ini merupakan simulasi prototype platform KawanKampus.id dan dapat dikembangkan lebih lanjut pada tahap implementasi. Nama-nama kampus di Medan (UNIMED, USU, POLMED, UMSU, UINSU, UMA, dll) digunakan sebagai contoh target pengguna dan data percontohan prototype tanpa klaim kerja sama resmi institusional. Data verifikasi KTM dan bukti transaksi dikelola untuk kebutuhan keamanan, penanganan pengaduan, dan proses sesuai kebijakan privasi serta ketentuan yang berlaku.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© 2026 KawanKampus.id. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span>Modern</span>
            <span>•</span>
            <span>Student-Centric</span>
            <span>•</span>
            <span>Trustworthy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
