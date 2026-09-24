import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface FoundingSellerBannerProps {
  onJoin: () => void;
}

export const FoundingSellerBanner: React.FC<FoundingSellerBannerProps> = ({ onJoin }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#1E40AF] to-[#7C3AED] p-6 sm:p-8 lg:p-10 text-white overflow-hidden shadow-lg">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Program Khusus Peluncuran
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Jadilah Bagian dari Penjual Pertama KawanKampus.
            </h2>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              Punya barang yang sudah nggak dipakai? Jangan biarkan menumpuk di kamar kos. Bangun reputasi awal, temukan pembeli sesama mahasiswa Medan, dan mulai tawarkan barang atau jasamu.
            </p>

            {/* Benefits List (Section AY) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Gratis daftar & verifikasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Gratis posting barang</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Badge Founding Seller</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Pembeli sesama mahasiswa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Bisa COD di kampus Medan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Promosi launching prioritas</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
            <button
              id="btn-join-founding-seller"
              onClick={onJoin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-[#0B3D91] font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Jadi Founding Seller</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-blue-200 text-center sm:text-left lg:text-right">
              *Verifikasi cepat dengan KTM mahasiswa aktif
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
