import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  AlertCircle, 
  Send, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';
import { JasaItem, UserProfile } from '../types';
import { formatRupiah } from '../utils/feeCalculator';

interface OrderJasaModalProps {
  service: JasaItem | null;
  onClose: () => void;
  onSubmitOrder: (orderDetails: {
    serviceId: string;
    serviceTitle: string;
    providerName: string;
    type: 'PPT' | 'SPSS' | 'TURNITIN' | 'PARAFRASE' | 'EXCEL';
    price: number;
    deadline: string;
    brief: string;
    notes: string;
    uploadedFileName?: string;
  }) => void;
  currentUser: UserProfile;
}

export const OrderJasaModal: React.FC<OrderJasaModalProps> = ({
  service,
  onClose,
  onSubmitOrder,
  currentUser,
}) => {
  if (!service) return null;

  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number>(0);
  const [brief, setBrief] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [agreedAcademic, setAgreedAcademic] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentPackage = service.packages && service.packages.length > 0 
    ? service.packages[selectedPackageIndex] 
    : { name: 'Standar', price: service.startingPriceNumber, terms: service.description };

  // Calculate numeric price for state/order
  const numericPrice = typeof currentPackage.price === 'number'
    ? currentPackage.price
    : Number(String(currentPackage.price).replace(/[^0-9.-]+/g, '')) || service.startingPriceNumber;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const validate = () => {
    if (!brief.trim()) {
      setErrorMsg('Mohon isi brief rincian tugas atau kebutuhan pengerjaan.');
      return false;
    }
    if (!deadline) {
      setErrorMsg('Mohon tentukan tenggat waktu (deadline) yang diinginkan.');
      return false;
    }
    if (!agreedAcademic) {
      setErrorMsg('Mohon centang persetujuan ketentuan etika & positioning akademik.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleDirectTelegramOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = encodeURIComponent(
      `Halo Tim KawanKampus.id!\n\nSaya ingin memesan layanan:\n📌 Layanan: ${service.title}\n📦 Paket: ${currentPackage.name} (${formatRupiah(currentPackage.price)})\n⏰ Deadline: ${deadline}\n📝 Rincian Brief: ${brief}\n${notes ? `💡 Catatan: ${notes}\n` : ''}${fileName ? `📎 Berkas: ${fileName}\n` : ''}\nMohon konfirmasi dan info nomor rekening pembayaran resmi tim KawanKampus. Terima kasih!`
    );

    // Record order in state
    onSubmitOrder({
      serviceId: service.id,
      serviceTitle: `${service.title} (${currentPackage.name})`,
      providerName: 'Tim KawanKampus.id',
      type: service.type,
      price: numericPrice,
      deadline,
      brief,
      notes,
      uploadedFileName: fileName || 'berkas_pendukung_tugas.pdf'
    });

    // Open telegram
    window.open(`https://t.me/kawankampuss?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0B3D91]">
                {service.type === 'PPT' && '🎨 Presentasi PPT'}
                {service.type === 'SPSS' && '📊 Olah Data SPSS'}
                {service.type === 'TURNITIN' && '🛡️ Turnitin No Repo'}
                {service.type === 'PARAFRASE' && '✍️ Parafrase Dokumen'}
                {service.type === 'EXCEL' && '📈 Formula Excel'}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ Tim Internal Resmi
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mt-1.5">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telegram Direct Channel Banner */}
        <div className="px-6 py-2.5 bg-blue-50 border-b border-blue-100 text-xs text-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="font-semibold">Saluran Pengerjaan Langsung:</span>
          </div>
          <a
            href="https://t.me/kawankampuss"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#2563EB] hover:underline"
          >
            Telegram: @kawankampuss ↗
          </a>
        </div>

        {/* Form Body */}
        <form onSubmit={handleDirectTelegramOrder} className="p-6 space-y-4 text-xs sm:text-sm max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 border border-red-200 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Package Selection */}
          {service.packages && service.packages.length > 0 && (
            <div className="space-y-2">
              <label className="block font-bold text-gray-900 text-xs">
                Pilih Paket Layanan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.packages.map((pkg, idx) => {
                  const isSelected = selectedPackageIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedPackageIndex(idx)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#2563EB] bg-blue-50/70 ring-1 ring-[#2563EB]' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-xs">{pkg.name}</span>
                        <span className="font-extrabold text-[#2563EB] text-xs">{formatRupiah(pkg.price)}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{pkg.terms || pkg.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary Box */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-[11px] text-gray-500">Penyedia Layanan</p>
              <p className="font-bold text-gray-900 flex items-center gap-1 text-xs">
                Tim Khusus KawanKampus.id
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </p>
              <p className="text-[11px] text-gray-500">Estimasi: {service.turnaroundDays}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-500">Total Biaya Paket</p>
              <p className="text-lg font-extrabold text-[#2563EB]">
                {formatRupiah(currentPackage.price)}
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold">Bebas Biaya Platform Tambahan</p>
            </div>
          </div>

          {/* Brief Input */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-gray-800 text-xs">
              Rincian Kebutuhan / Brief Tugas <span className="text-red-500">*</span>
            </label>
            <textarea
              id="input-brief-jasa"
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder={
                service.type === 'TURNITIN'
                  ? 'Tuliskan judul dokumen, estimasi jumlah halaman, dan apakah proposal/skripsi/jurnal...'
                  : service.type === 'PARAFRASE'
                  ? 'Tuliskan bab yang ingin diparafrase, target persentase similarity (contoh: di bawah 20%)...'
                  : service.type === 'PPT'
                  ? 'Tuliskan topik presentasi, jumlah slide yang ditargetkan, warna kampus/tema...'
                  : service.type === 'SPSS'
                  ? 'Tuliskan jenis uji yang diinginkan (Uji Validitas, Reliabilitas, Regresi, Hipotesis) dan jumlah responden...'
                  : 'Tuliskan formula Excel yang dibutuhkan, formatting, atau tabel dashboard yang diinginkan...'
              }
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs"
              required
            />
          </div>

          {/* File Upload Simulator */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-gray-800 text-xs">
              Upload Berkas Pendukung (Draf Word, Excel Kuesioner, atau PDF)
            </label>
            <div className="border-2 border-dashed border-gray-200 hover:border-[#2563EB] rounded-xl p-3 text-center transition-colors bg-gray-50/50">
              <input
                type="file"
                id="file-brief-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx,.xls,.docx,.doc,.pptx,.pdf,.csv"
              />
              <label 
                htmlFor="file-brief-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-xs font-semibold text-[#2563EB]">
                  {fileName ? `Terpilih: ${fileName}` : 'Klik untuk memilih berkas lampiran'}
                </span>
                <span className="text-[10px] text-gray-400">
                  Mendukung .docx, .xlsx, .pdf, .pptx (Atau kirim langsung di chat Telegram)
                </span>
              </label>
            </div>
          </div>

          {/* Deadline & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-semibold text-gray-800 text-xs">
                Tenggat Waktu (Deadline) <span className="text-red-500">*</span>
              </label>
              <input
                id="input-deadline-jasa"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-gray-800 text-xs">
                Catatan Tambahan
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Butuh file .spv atau catatan revisi"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          {/* Academic Positioning & Ethics Notice */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-[11px] text-blue-900 space-y-1.5">
            <p className="font-semibold flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-blue-700" />
              Komitmen Kualitas & Integritas:
            </p>
            <p className="text-gray-700 leading-relaxed text-[11px]">
              KawanKampus.id menjamin kerahasiaan berkas 100%, Turnitin No Repository, dan pengerjaan berstandar akademik. Tim kami mendampingi perapian teknis, olah data, dan visualisasi tanpa menjanjikan nilai tertentu.
            </p>
            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedAcademic}
                onChange={(e) => setAgreedAcademic(e.target.checked)}
                className="rounded text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="font-medium text-blue-950 text-[11px]">
                Saya memahami ketentuan pengerjaan dan bersedia melanjutkan ke Telegram tim resmi.
              </span>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-xs transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-submit-order-telegram"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Pesan via Telegram (@kawankampuss)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
