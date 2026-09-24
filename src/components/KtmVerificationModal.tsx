import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Building,
  Info,
  Lock
} from 'lucide-react';
import { UserProfile, VerificationStatus } from '../types';

interface KtmVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onVerificationSubmitted: (submission: {
    fullName: string;
    campus: string;
    nim: string;
    studyProgram: string;
    ktmFileName: string;
  }) => void;
}

export const KtmVerificationModal: React.FC<KtmVerificationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onVerificationSubmitted,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState(currentUser.name || '');
  const [campus, setCampus] = useState(currentUser.campus || 'UNIMED');
  const [nim, setNim] = useState(currentUser.nim || '');
  const [studyProgram, setStudyProgram] = useState(currentUser.studyProgram || '');
  const [ktmFile, setKtmFile] = useState<File | null>(null);
  const [ktmFileName, setKtmFileName] = useState('ktm_alexander_simulasi.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const campusList = [
    'UNIMED',
    'USU',
    'POLMED',
    'UMSU',
    'UINSU',
    'UMA',
    'Institut Teknologi Medan (ITM)',
    'Universitas Prima Indonesia (UNPRI)',
    'Kampus Lainnya di Medan'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKtmFile(e.target.files[0]);
      setKtmFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nim || !studyProgram) {
      setErrorMsg('Mohon isi seluruh data identitas mahasiswa Anda.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      onVerificationSubmitted({
        fullName,
        campus,
        nim,
        studyProgram,
        ktmFileName,
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Verifikasi Mahasiswa (KTM)
              </h3>
              <p className="text-xs text-gray-500">
                Akses fitur Jual Barang, Buka Jasa, dan Kontributor
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

        {/* Current Status Tracker Banner (Section J & AK) */}
        <div className="px-6 py-3 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between text-xs">
          <span className="text-blue-900 font-medium">Status Akun Saat Ini:</span>
          <span className={`font-bold px-2.5 py-0.5 rounded-full ${
            currentUser.verificationStatus === 'Terverifikasi'
              ? 'bg-emerald-100 text-emerald-800'
              : currentUser.verificationStatus === 'Sedang Diperiksa'
              ? 'bg-blue-100 text-blue-800'
              : currentUser.verificationStatus === 'Perlu Perbaikan'
              ? 'bg-red-100 text-red-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {currentUser.verificationStatus}
          </span>
        </div>

        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">
              Dokumen KTM Berhasil Diunggah!
            </h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Tim verifikator KawanKampus sedang memeriksa kesesuaian data Anda. Proses review biasanya membutuhkan waktu 10 s.d 30 menit.
            </p>
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 text-left space-y-1 border border-gray-200">
              <p>• Nama: <strong>{fullName}</strong></p>
              <p>• Kampus: <strong>{campus}</strong> ({studyProgram})</p>
              <p>• Berkas: <strong>{ktmFileName}</strong></p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm"
            >
              Kembali ke Aplikasi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Mandatory Wording 1 (Section J) */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
              <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>“KTM digunakan untuk proses verifikasi mahasiswa dan keamanan platform.”</strong> Dokumen KTM Anda dijamin tidak akan dipublikasikan secara publik.
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Nama Lengkap Sesuai KTM</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Alexander Sabastian"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Universitas / Kampus</label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-medium"
                >
                  {campusList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Nomor Induk Mahasiswa (NIM)</label>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Contoh: 7213210045"
                  className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Program Studi / Jurusan</label>
              <input
                type="text"
                value={studyProgram}
                onChange={(e) => setStudyProgram(e.target.value)}
                placeholder="Contoh: Manajemen / Ilmu Komputer / Teknik Sipil"
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            {/* Upload KTM Area */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 block">
                Unggah Foto Kartu Tanda Mahasiswa (KTM) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 hover:border-[#2563EB] rounded-2xl p-4 text-center bg-gray-50 transition-colors">
                <input
                  type="file"
                  id="ktm-upload-input"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
                <label 
                  htmlFor="ktm-upload-input"
                  className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs font-semibold text-[#2563EB]">
                    {ktmFileName ? `Berkas terpilih: ${ktmFileName}` : 'Klik untuk unggah foto KTM asli'}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Pastikan foto jelas, nama, NIM, dan stempel semester terlihat terbaca (Maks. 10MB)
                  </span>
                </label>
              </div>
            </div>

            {/* Mandatory Security Wording 2 (Section J & AU) */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600 leading-relaxed">
              <strong>Ketentuan Privasi & Keamanan:</strong> “Data verifikasi dan bukti transaksi dikelola untuk kebutuhan keamanan, penanganan pengaduan, dan proses sesuai kebijakan privasi serta ketentuan yang berlaku.”
            </div>

            {/* Submit buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                id="btn-submit-ktm"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold shadow-md transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengunggah...' : 'Kirim Verifikasi'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
