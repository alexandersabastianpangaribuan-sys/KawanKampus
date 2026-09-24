import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Upload, 
  CheckCircle2, 
  ShieldAlert, 
  FileText 
} from 'lucide-react';
import { ReportSubmission } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName?: string;
  targetType?: 'PRODUK' | 'JASA' | 'PENGGUNA';
  onSubmitReport: (report: any) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetName = 'Pengguna / Transaksi Kampus',
  targetType = 'PRODUK',
  onSubmitReport,
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<string>('Penipuan');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [evidenceName, setEvidenceName] = useState('tangkapan_layar_chat.png');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    'Penipuan',
    'Barang tidak sesuai deskripsi',
    'Perilaku tidak pantas / pelecehan',
    'Jasa tidak sesuai brief',
    'Pelanggaran konten',
    'Lainnya'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmitReport({
        id: `rep-${Date.now()}`,
        targetName,
        targetType,
        category,
        description,
        evidenceFile: evidenceName,
        dateSubmitted: 'Hari Ini',
        status: 'Menunggu Review',
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-red-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Pusat Pengaduan & Keamanan
              </h3>
              <p className="text-xs text-gray-500">
                Laporkan indikasi pelanggaran atau kecurangan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Target Display */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-500 block">Objek Terlapor:</span>
              <span className="font-bold text-gray-900">{targetName}</span>
            </div>

            {/* Category Selector (Section AS) */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kategori Masalah <span className="text-red-500">*</span></label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kronologi & Keterangan Rinci <span className="text-red-500">*</span></label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan kronologi transaksi, waktu kejadian, dan ketidaksesuaian yang dialami..."
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Evidence Upload */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 block">Bukti Pendukung (Screenshot Chat / Bukti Transfer)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center bg-gray-50">
                <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-blue-600">{evidenceName}</p>
                <p className="text-[10px] text-gray-400">Format gambar/dokumen pendukung (Maks. 10MB)</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kontak Anda (WhatsApp / Email Aktif)</label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Untuk update status tindak lanjut admin"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Mandatory Wording (Section AS) */}
            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Ketentuan Pengaduan:</strong> “Laporan akan diverifikasi oleh admin. Penyalahgunaan laporan dapat dikenakan sanksi.”
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengaduan'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">
              Laporan Pengaduan Diterima
            </h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Admin KawanKampus akan segera memverifikasi bukti dan mengambil tindakan tegas demi keamanan komunitas mahasiswa Medan.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl text-xs sm:text-sm"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
