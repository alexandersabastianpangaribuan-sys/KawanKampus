import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  DollarSign, 
  Layers, 
  Search,
  Sparkles,
  Eye,
  BarChart3
} from 'lucide-react';
import { KtmSubmission, ReportSubmission, MarketItem } from '../types';
import { formatRupiah } from '../utils/feeCalculator';

interface AdminDashboardViewProps {
  ktmSubmissions: KtmSubmission[];
  onApproveKtm: (id: string) => void;
  onRejectKtm: (id: string, reason: string) => void;
  reports: ReportSubmission[];
  onResolveReport: (id: string) => void;
  marketItems: MarketItem[];
  onDeleteListing: (id: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  ktmSubmissions,
  onApproveKtm,
  onRejectKtm,
  reports,
  onResolveReport,
  marketItems,
  onDeleteListing,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'OVERVIEW' | 'KTM' | 'CONTENT' | 'REPORTS' | 'FINANCE'>('OVERVIEW');
  const [rejectModalKtmId, setRejectModalKtmId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Foto KTM buram / masa berlaku stempel semester tidak terlihat jelas.');

  const pendingKtmCount = ktmSubmissions.filter((k) => k.status === 'Sedang Diperiksa' || k.status === 'Menunggu Verifikasi').length;
  const pendingReportsCount = reports.filter((r) => r.status === 'Menunggu Review').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gray-900 text-white p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>KawanKampus Administrator Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Dashboard Kontrol & Moderasi
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Verifikasi identitas KTM, moderasi listing barang & jasa, serta tangani pengaduan mahasiswa Medan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sistem Aktif (Region Medan)
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-gray-200 scrollbar-none">
        <button
          onClick={() => setActiveAdminTab('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeAdminTab === 'OVERVIEW'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          📊 Ringkasan Statistik
        </button>
        <button
          onClick={() => setActiveAdminTab('KTM')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'KTM'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verifikasi KTM</span>
          {pendingKtmCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-extrabold">
              {pendingKtmCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveAdminTab('CONTENT')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'CONTENT'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Moderasi Listing</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('REPORTS')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'REPORTS'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Pusat Pengaduan</span>
          {pendingReportsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-extrabold">
              {pendingReportsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveAdminTab('FINANCE')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'FINANCE'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Keuangan & Fee Platform</span>
        </button>
      </div>

      {/* OVERVIEW TAB (Section AT) */}
      {activeAdminTab === 'OVERVIEW' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Mahasiswa Terverifikasi</span>
              <p className="text-2xl font-extrabold text-[#0B3D91] mt-1">1.240+</p>
              <span className="text-[11px] text-emerald-600 font-medium">UNIMED, USU, POLMED, UMSU</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Total Listing Aktif</span>
              <p className="text-2xl font-extrabold text-purple-700 mt-1">340+</p>
              <span className="text-[11px] text-gray-500">Barang & Jasa Terkurasi</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Transaksi Sukses</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">2.890+</p>
              <span className="text-[11px] text-emerald-700 font-medium">0 Kasus Penipuan Terbengkalai</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <span className="text-xs font-semibold text-gray-500">Laporan Aktif</span>
              <p className="text-2xl font-extrabold text-red-600 mt-1">{pendingReportsCount}</p>
              <span className="text-[11px] text-amber-600 font-medium">Perlu Peninjauan Segera</span>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50/70 p-6 rounded-3xl border border-blue-100 space-y-3">
              <h3 className="font-bold text-[#0B3D91] text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                Antrean Verifikasi KTM Mahasiswa
              </h3>
              <p className="text-xs text-gray-600">
                Terdapat <strong>{pendingKtmCount} pengajuan KTM</strong> yang menunggu pemeriksaan legalitas identitas mahasiswa di Kota Medan.
              </p>
              <button
                onClick={() => setActiveAdminTab('KTM')}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Buka Antrean Verifikasi →
              </button>
            </div>

            <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200 space-y-3">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Moderasi Keamanan & Pengaduan
              </h3>
              <p className="text-xs text-gray-700">
                Pantau laporan penipuan, pelanggaran etika akademik SPSS, atau barang tidak sesuai deskripsi.
              </p>
              <button
                onClick={() => setActiveAdminTab('REPORTS')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Tinjau Pengaduan ({pendingReportsCount}) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KTM VERIFICATION TAB (Section J, AK, AT) */}
      {activeAdminTab === 'KTM' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Daftar Pengajuan Verifikasi Kartu Tanda Mahasiswa (KTM)
              </h2>
              <p className="text-xs text-gray-500">
                Periksa nama, NIM, universitas, dan foto KTM asli mahasiswa sebelum memberi izin penjualan.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4">Mahasiswa</th>
                    <th className="p-4">Kampus & Prodi</th>
                    <th className="p-4">NIM</th>
                    <th className="p-4">Berkas KTM</th>
                    <th className="p-4">Tanggal Masuk</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Tindakan Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ktmSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">{sub.fullName}</td>
                      <td className="p-4 text-gray-700">
                        {sub.campus}
                        <span className="block text-gray-400 text-[10px]">{sub.studyProgram}</span>
                      </td>
                      <td className="p-4 font-mono text-gray-600">{sub.nim}</td>
                      <td className="p-4">
                        <button
                          onClick={() => alert(`Membuka berkas: ${sub.ktmFileName} (KTM UNIMED/USU). Foto jelas & stempel terbaca.`)}
                          className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{sub.ktmFileName}</span>
                        </button>
                      </td>
                      <td className="p-4 text-gray-500">{sub.submittedAt}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                          sub.status === 'Terverifikasi' ? 'bg-emerald-100 text-emerald-800' :
                          sub.status === 'Perlu Perbaikan' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {sub.status !== 'Terverifikasi' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onApproveKtm(sub.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors"
                            >
                              ✓ Setujui
                            </button>
                            <button
                              onClick={() => {
                                setRejectModalKtmId(sub.id);
                              }}
                              className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg transition-colors"
                            >
                              ✕ Minta Perbaikan
                            </button>
                          </div>
                        ) : (
                          <span className="text-emerald-600 font-bold text-[11px]">✓ Aktif</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT MODERATION TAB (Section AT) */}
      {activeAdminTab === 'CONTENT' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Moderasi Listing Kawan Market ({marketItems.length} Produk)
            </h2>
            <p className="text-xs text-gray-500">
              Pantau kepatuhan produk bekas mahasiswa Medan terhadap larangan barang ilegal atau berbahaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketItems.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-2xl border border-gray-200 flex gap-3">
                <img src={item.image} alt={item.altText} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 truncate mt-1">{item.title}</h4>
                  <p className="text-xs text-blue-600 font-extrabold">{formatRupiah(item.price)}</p>
                  <p className="text-[11px] text-gray-400">Seller: {item.sellerName} ({item.campus})</p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onDeleteListing(item.id)}
                      className="text-[11px] font-semibold text-red-600 hover:underline"
                    >
                      Hapus Listing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORTS TAB (Section AS & AT) */}
      {activeAdminTab === 'REPORTS' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Pusat Pengaduan & Laporan Masalah
            </h2>
            <p className="text-xs text-gray-500">
              Tangani laporan pengguna untuk menjaga ekosistem mahasiswa Medan tetap aman dan beretika.
            </p>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div key={rep.id} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {rep.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm mt-1">
                      Objek Terlapor: {rep.targetName} ({rep.targetType})
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    rep.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rep.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                  "{rep.description}"
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
                  <span>Bukti: {rep.evidenceFile}</span>
                  {rep.status !== 'Selesai' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Peringatan telah dikirimkan ke pihak ${rep.targetName}.`)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg"
                      >
                        Kirim Peringatan
                      </button>
                      <button
                        onClick={() => onResolveReport(rep.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                      >
                        Selesaikan Masalah
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FINANCE TAB (Section AV, AW, AG, AT) */}
      {activeAdminTab === 'FINANCE' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Laporan Keuangan & Fee Platform KawanKampus.id
            </h2>
            <p className="text-xs text-gray-500">
              Rekapitulasi pendapatan platform dari fee bertingkat Kawan Market, Kawan Jasa, dan Featured Komunitas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 font-semibold">Total Pendapatan Fee Platform</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">Rp4.820.000</p>
              <span className="text-[11px] text-emerald-700">Akumulasi Bulan Berjalan</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 font-semibold">Rata-Rata Fee Market</span>
              <p className="text-2xl font-extrabold text-[#0B3D91] mt-1">3.4%</p>
              <span className="text-[11px] text-gray-500">Sesuai skema 2% - 5%</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 font-semibold">Featured Komunitas Terjual</span>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">18 Slot</p>
              <span className="text-[11px] text-gray-500">Rp10.000 / 7 hari</span>
            </div>
          </div>

          {/* Transparent Rate Matrix Table */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">
              Tabel Skema Fee Resmi KawanKampus.id
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                <span className="font-bold text-blue-900">Kawan Market (Barang Bekas):</span>
                <p>• Rp10.000 – Rp50.000: <strong>2%</strong></p>
                <p>• Rp50.001 – Rp100.000: <strong>3%</strong></p>
                <p>• Rp101.000 – Rp250.000: <strong>3.5%</strong></p>
                <p>• Rp250.001 – Rp500.000: <strong>4%</strong></p>
                <p>• Di atas Rp500.000: <strong>5%</strong></p>
                <p className="text-[10px] text-emerald-700 font-semibold">Pembeli: GRATIS (Rp0)</p>
              </div>

              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                <span className="font-bold text-purple-900">Kawan Jasa (Layanan Internal Tim KawanKampus):</span>
                <p>• PPT, Olah Data SPSS, Turnitin No Repo, Parafrase, & Excel</p>
                <p>• Model: <strong>Layanan Internal Resmi</strong> (Bukan Marketplace Freelancer)</p>
                <p>• Transaksi langsung via Admin Telegram (@kawankampuss)</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Bebas Potongan Komisi Pihak Ketiga</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalKtmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-base">Alasan Perbaikan Berkas KTM</h3>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalKtmId(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onRejectKtm(rejectModalKtmId, rejectReason);
                  setRejectModalKtmId(null);
                }}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs"
              >
                Kirim Catatan Perbaikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
