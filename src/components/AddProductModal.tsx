import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  ShoppingBag, 
  ShieldCheck, 
  BadgePercent, 
  Sparkles, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { MarketCategory, ItemCondition, UserProfile } from '../types';
import { formatRupiah, calculateMarketSellerFee } from '../utils/feeCalculator';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newProduct: any) => void;
  currentUser: UserProfile;
  onRequireVerification: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  currentUser,
  onRequireVerification,
}) => {
  if (!isOpen) return null;

  // Check if verified student (Section S)
  if (currentUser.level !== 'verified_student') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Verifikasi KTM Mahasiswa Dibutuhkan
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Untuk menjaga keamanan dan mencegah penipuan di lingkungan kampus Medan, hanya mahasiswa terverifikasi KTM yang dapat menjual barang dan menawarkan jasa.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onRequireVerification();
              }}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm"
            >
              Verifikasi KTM Sekarang (Cepat & Aman)
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-500 hover:text-gray-700 text-xs"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MarketCategory>('Anak Kos');
  const [condition, setCondition] = useState<ItemCondition>('Sangat Baik');
  const [price, setPrice] = useState<number>(100000);
  const [description, setDescription] = useState('');
  const [campus, setCampus] = useState(currentUser.campus || 'UNIMED');
  const [location, setLocation] = useState('Pancing, Medan');
  const [transactionMethod, setTransactionMethod] = useState<'COD' | 'Transfer / QRIS' | 'COD & Transfer / QRIS'>('COD & Transfer / QRIS');
  const [fileName, setFileName] = useState('foto_barang_terpilih.jpg');
  const [showPreview, setShowPreview] = useState(false);

  const feeCalc = calculateMarketSellerFee(price);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || price <= 0) return;

    // Pick appropriate image based on category if prototype
    let sampleImg = 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80';
    if (category === 'Elektronik') sampleImg = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80';
    if (category === 'Buku') sampleImg = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
    if (category === 'Fashion') sampleImg = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80';
    if (category === 'Perkuliahan') sampleImg = 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80';

    onPublish({
      id: `mkt-${Date.now()}`,
      title,
      price,
      category,
      condition,
      location,
      campus,
      sellerName: currentUser.name,
      isVerifiedStudent: true,
      sellerRating: 5.0,
      reviewCount: 0,
      image: sampleImg,
      altText: `${title} bekas mahasiswa ${campus}`,
      description: description || 'Barang milik mahasiswa, terawat rapi dan siap pakai.',
      transactionMethod,
      datePosted: 'Hari Ini',
      views: 1,
      isFoundingSeller: currentUser.isFoundingSeller,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Section S) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              🛍️ Posting Barang Bekas
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-0.5">
              Jual Barang ke Sesama Mahasiswa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free posting notice (Section S & AV) */}
        <div className="px-6 py-2.5 bg-emerald-50 text-emerald-900 text-xs flex items-center justify-between border-b border-emerald-100">
          <div className="flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Posting barang GRATIS tanpa biaya pendaftaran</span>
          </div>
          <span className="text-[11px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
            ✓ Mahasiswa Terverifikasi
          </span>
        </div>

        <form onSubmit={handlePublish} className="p-6 space-y-4 text-xs sm:text-sm">
          {/* Foto Upload (Section S & Q) */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-700 block">
              Foto Barang <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 hover:border-[#2563EB] rounded-2xl p-4 text-center bg-gray-50/70 cursor-pointer">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <p className="text-xs font-semibold text-[#2563EB]">{fileName}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Foto nyata barang asli milik Anda. Hindari gambar acak / gedung kampus.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Nama Barang</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Meja Belajar Minimalis Kayu Lipat"
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MarketCategory)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Anak Kos">Anak Kos</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Buku">Buku Kuliah</option>
                <option value="Fashion">Fashion</option>
                <option value="Perkuliahan">Perkuliahan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kondisi</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Sangat Baik">Sangat Baik (90%+ mulus)</option>
                <option value="Baik">Baik (Berfungsi normal)</option>
                <option value="Cukup">Cukup (Ada bekas pakai wajar)</option>
                <option value="Baru">Baru / Belum Dipakai</option>
              </select>
            </div>
          </div>

          {/* Pricing with live fee calculator (Section AV) */}
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-blue-950">Harga Jual (Rp)</label>
                <span className="text-[11px] text-blue-700">Posting 100% Gratis</span>
              </div>
              <input
                type="number"
                min="10000"
                step="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full py-2 px-3 bg-white border border-blue-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            {/* Fee Transparency Calculator Result */}
            <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-1">
                <BadgePercent className="w-3.5 h-3.5 text-blue-600" />
                <span>Fee Platform Penjual ({feeCalc.percentage}%):</span>
                <span className="font-semibold text-red-600">-{formatRupiah(feeCalc.feeAmount)}</span>
              </div>
              <div>
                <span>Estimasi Bersih: </span>
                <strong className="text-emerald-700 font-extrabold">{formatRupiah(feeCalc.sellerNet)}</strong>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 italic">
              *Fee platform hanya dipotong jika transaksi berhasil.
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Deskripsi Barang</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan alasan jual, kelengkapan, fungsi, dan kondisi..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Kampus Terdekat</label>
              <input
                type="text"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Metode Transaksi</label>
              <select
                value={transactionMethod}
                onChange={(e) => setTransactionMethod(e.target.value as any)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="COD & Transfer / QRIS">COD & Transfer / QRIS</option>
                <option value="COD">Hanya COD Kampus</option>
                <option value="Transfer / QRIS">Hanya Transfer / QRIS</option>
              </select>
            </div>
          </div>

          {/* Buttons: [ Simpan Draft ] [ Preview ] [ Publikasikan ] (Section S) */}
          <div className="pt-3 flex items-center justify-between border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                alert('Draf barang berhasil disimpan di dashboard penjual.');
                onClose();
              }}
              className="px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-medium"
            >
              Simpan Draf
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showPreview ? 'Tutup Preview' : 'Preview'}</span>
              </button>

              <button
                type="submit"
                id="btn-publish-product"
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Publikasikan Sekarang</span>
              </button>
            </div>
          </div>

          {showPreview && (
            <div className="mt-3 p-3 bg-gray-100 rounded-xl text-xs space-y-1 animate-in fade-in">
              <p className="font-bold text-gray-800">Preview Tampilan Kartu:</p>
              <p>• Judul: <strong>{title || 'Nama Barang Belum Diisi'}</strong></p>
              <p>• Harga: <strong>{formatRupiah(price)}</strong></p>
              <p>• Lokasi: <strong>{campus} - {location}</strong></p>
              <p>• Seller: <strong>{currentUser.name} (✓ Terverifikasi)</strong></p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
