import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  FileCheck,
  Send,
  FileSpreadsheet,
  FileText,
  Presentation,
  BarChart3,
  Search,
  Info
} from 'lucide-react';
import { JasaItem, UserProfile } from '../types';
import { formatRupiah } from '../utils/feeCalculator';

interface KawanJasaViewProps {
  services: JasaItem[];
  onSelectService: (service: JasaItem) => void;
  currentUser: UserProfile;
}

export const KawanJasaView: React.FC<KawanJasaViewProps> = ({
  services,
  onSelectService,
  currentUser,
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'PPT' | 'SPSS' | 'TURNITIN' | 'PARAFRASE' | 'EXCEL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTabs = [
    { id: 'ALL', label: 'Semua Layanan', count: services.length, icon: Sparkles },
    { id: 'PPT', label: 'PPT & Presentasi', icon: Presentation },
    { id: 'SPSS', label: 'Olah Data SPSS', icon: BarChart3 },
    { id: 'TURNITIN', label: 'Cek Turnitin (No Repo)', icon: ShieldCheck },
    { id: 'PARAFRASE', label: 'Parafrase Dokumen', icon: FileText },
    { id: 'EXCEL', label: 'Olah Formula Excel', icon: FileSpreadsheet },
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeCategory === 'ALL' || s.type === activeCategory;
    const matchesSearch = searchQuery === '' || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.terms.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOrderViaTelegram = (service: JasaItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const message = encodeURIComponent(
      `Halo Tim KawanKampus.id! Saya ingin memesan layanan "${service.title}". Mohon info prosedur dan konfirmasi brief pengerjaan.`
    );
    window.open(`https://t.me/kawankampuss?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner: Internal Service Announcement */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B3D91] via-blue-800 to-indigo-900 text-white p-6 sm:p-10 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Layanan Resmi Tim Internal KawanKampus.id</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Kawan Jasa
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Solusi pengerjaan tugas akademik, persiapan seminar, dan skripsi yang dikerjakan langsung oleh tim internal spesialis KawanKampus.id. Kualitas terstandar, garansi privasi, dan tanpa perantara pihak ketiga.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://t.me/kawankampuss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0B3D91] hover:bg-blue-50 text-sm font-bold shadow-md transition-all"
            >
              <Send className="w-4 h-4 text-[#2563EB]" />
              <span>Chat Tim di Telegram (@kawankampuss)</span>
            </a>
            <div className="text-xs text-blue-200 flex items-center gap-1.5 px-3 py-2 bg-blue-900/40 rounded-xl border border-blue-400/20">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>Respons Cepat: Setiap Hari 08.00 - 22.00 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Clear Ordering Flow Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-8 shadow-xs">
        <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#2563EB]" />
          Alur Pemesanan Layanan Resmi Kawan Jasa:
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#0B3D91] text-white text-xs font-bold flex items-center justify-center mb-1.5">
                1
              </div>
              <h3 className="text-xs font-bold text-gray-900">Pilih Layanan</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Tentukan layanan (PPT, SPSS, Turnitin, Parafrase, Excel) dan paket yang Anda butuhkan.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#0B3D91] text-white text-xs font-bold flex items-center justify-center mb-1.5">
                2
              </div>
              <h3 className="text-xs font-bold text-gray-900">Pesan via Telegram</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Klik tombol "Pesan via Telegram" untuk langsung terhubung dengan admin resmi @kawankampuss.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#0B3D91] text-white text-xs font-bold flex items-center justify-center mb-1.5">
                3
              </div>
              <h3 className="text-xs font-bold text-gray-900">Kirim Detail & File</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Kirimkan file draf, kuesioner, instruksi dosen, atau ketentuan tugas kepada tim kami.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#0B3D91] text-white text-xs font-bold flex items-center justify-center mb-1.5">
                4
              </div>
              <h3 className="text-xs font-bold text-gray-900">Konfirmasi Biaya</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Tim mengonfirmasi estimasi waktu & nominal biaya transparan sebelum pengerjaan dimulai.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-1.5">
                5
              </div>
              <h3 className="text-xs font-bold text-emerald-900">Pengerjaan Tim</h3>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Dikerjakan langsung oleh tim KawanKampus hingga tuntas dengan jaminan revisi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-gray-100/90 p-1.5 rounded-2xl border border-gray-200 max-w-full">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-jasa-${tab.id.toLowerCase()}`}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#0B3D91] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari layanan..."
            className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* 5 Official Service Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {filteredServices.map((service) => {
          return (
            <div
              key={service.id}
              id={`card-jasa-${service.id}`}
              className="rounded-3xl bg-white border border-gray-200 hover:border-[#2563EB] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Image Banner */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.altText}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Category Badge & Tim KawanKampus Seal */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-600 text-white shadow-xs">
                      {service.type === 'PPT' && '🎨 Presentasi PPT'}
                      {service.type === 'SPSS' && '📊 Olah Data SPSS'}
                      {service.type === 'TURNITIN' && '🛡️ Turnitin No Repo'}
                      {service.type === 'PARAFRASE' && '✍️ Parafrase Dokumen'}
                      {service.type === 'EXCEL' && '📈 Formula Excel'}
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Tim Resmi KawanKampus
                    </span>
                  </div>

                  {/* Pricing on Image Banner */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-gray-300">Estimasi Biaya Mulai</span>
                      <p className="text-2xl font-extrabold text-white leading-none mt-0.5">
                        {service.startingPriceDisplay || formatRupiah(service.startingPriceNumber)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-blue-200 border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-blue-300" />
                      <span>{service.turnaroundDays}</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Title & Description */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-snug">
                      {service.title}
                    </h2>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Available Packages Breakdown */}
                  {service.packages && service.packages.length > 0 && (
                    <div className="space-y-1.5 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                        Pilihan Paket & Tarif:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {service.packages.map((pkg, pIdx) => (
                          <div key={pIdx} className="bg-white p-2.5 rounded-xl border border-gray-200/80 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-900">{pkg.name}</span>
                              <span className="font-extrabold text-[#2563EB]">{formatRupiah(pkg.price)}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5">{pkg.terms || pkg.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features & Terms */}
                  <div className="space-y-1.5">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                      Cakupan Pengerjaan & Fasilitas:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700">
                      {service.terms.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-gray-700">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Revision info */}
                  <div className="text-[11px] bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1 text-gray-600">
                    <div className="flex items-center gap-1 font-semibold text-blue-950">
                      <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Garansi & Ketentuan Layanan:</span>
                    </div>
                    {service.terms.slice(4).map((term, tIdx) => (
                      <p key={tIdx} className="text-[11px] text-gray-600">
                        • {term}
                      </p>
                    ))}
                    {service.disclaimer && (
                      <p className="text-[11px] text-amber-800 font-medium pt-1">
                        ⚠️ {service.disclaimer}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Direct Telegram CTA + Detail Modal */}
              <div className="p-5 sm:p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  id={`btn-detail-jasa-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Pilih Paket & Form</span>
                </button>

                <button
                  id={`btn-telegram-jasa-${service.id}`}
                  onClick={(e) => handleOrderViaTelegram(service, e)}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pesan via Telegram (@kawankampuss)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Academic Ethics FAQ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#2563EB]" />
          Tanya Jawab Seputar Kawan Jasa
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 border border-gray-100">
            <h4 className="font-bold text-gray-900">
              Apakah hasil Turnitin tersimpan di database (Repository)?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              <strong>Sama sekali TIDAK.</strong> Kami menggunakan akun Turnitin No Repository resmi kampus sehingga dokumen Anda tidak akan terindeks database dan tidak menyebabkan skor similarity membengkak saat dicek ulang di kampus.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 border border-gray-100">
            <h4 className="font-bold text-gray-900">
              Bagaimana cara parafrase dokumen dikerjakan?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Tim kami melakukan penulisan ulang manual (human-touch paraphrase) dengan mempertahankan substansi ilmiah dan tata bahasa baku EYD/PUEBI, bukan sekadar menggunakan spinner otomatis yang merusak makna kalimat.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 border border-gray-100">
            <h4 className="font-bold text-gray-900">
              Apakah saya bisa berkonsultasi mengenai hasil uji SPSS?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Ya, setiap pengerjaan SPSS disertai penjelasan singkat atau interpretasi tabel (output .spv dan ringkasan word) agar Anda mengerti makna angka statistik saat menghadapi ujian sidang skripsi.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 border border-gray-100">
            <h4 className="font-bold text-gray-900">
              Berapa lama estimasi pengerjaan?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Pengecekan Turnitin selesai dalam 15-30 menit. PPT dan Olah Data SPSS/Excel berkisar 1-3 hari kerja tergantung tingkat kompleksitas. Layanan Fast Track prioritas juga tersedia jika Anda butuh mendesak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
