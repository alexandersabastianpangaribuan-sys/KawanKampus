import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Star, 
  MessageSquare, 
  ShoppingBag, 
  Bookmark, 
  Share2, 
  BadgePercent,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { MarketItem, UserProfile } from '../types';
import { formatRupiah, calculateMarketSellerFee } from '../utils/feeCalculator';

interface ProductDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  onBuyNow: (item: MarketItem) => void;
  onStartChat: (sellerName: string, itemTitle: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  currentUser: UserProfile;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onBuyNow,
  onStartChat,
  isSaved,
  onToggleSave,
  currentUser,
}) => {
  const [negoModalOpen, setNegoModalOpen] = useState(false);
  const [negoOffer, setNegoOffer] = useState<string>('');
  const [negoSent, setNegoSent] = useState(false);

  if (!item) return null;

  const feeCalc = calculateMarketSellerFee(item.price);

  const handleSendNego = () => {
    if (!negoOffer) return;
    setNegoSent(true);
    setTimeout(() => {
      setNegoSent(false);
      setNegoModalOpen(false);
      onStartChat(item.sellerName, `Halo kak, saya tawar ${item.title} seharga Rp${Number(negoOffer).toLocaleString('id-ID')}, apakah bisa?`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Stage */}
          <div className="relative bg-gray-100 h-72 md:h-full min-h-[300px]">
            <img
              src={item.image}
              alt={item.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                {item.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-gray-800 shadow-sm backdrop-blur-xs">
                Kondisi: {item.condition}
              </span>
            </div>
            {item.isFoundingSeller && (
              <div className="absolute bottom-3 left-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
                  ⭐ Founding Seller
                </span>
              </div>
            )}
          </div>

          {/* Product Info & Actions */}
          <div className="p-6 md:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Diposting {item.datePosted}</span>
                  <span>{item.views} kali dilihat</span>
                </div>
                <h2 className="text-xl font-bold text-[#111827] leading-snug">
                  {item.title}
                </h2>
                <p className="text-2xl font-extrabold text-[#2563EB] mt-2">
                  {formatRupiah(item.price)}
                </p>
              </div>

              {/* Location & Campus */}
              <div className="bg-gray-50 p-3 rounded-xl space-y-1.5 border border-gray-100 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span className="font-semibold">{item.campus}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{item.location}</span>
                </div>
                <div className="text-gray-500 pl-6">
                  Metode: <strong className="text-gray-800">{item.transactionMethod}</strong>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Deskripsi Barang
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed max-h-28 overflow-y-auto">
                  {item.description}
                </p>
              </div>

              {/* Seller Card (Section R) */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-blue-900 font-bold flex items-center justify-center text-sm border border-blue-200">
                      {item.sellerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-900">{item.sellerName}</span>
                      </div>
                      {item.isVerifiedStudent && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>✓ Mahasiswa Terverifikasi ({item.campus})</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-900">{item.sellerRating.toFixed(1)}</span>
                    <span className="text-[10px] text-amber-700">({item.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Fee Transparency Note (Section AV) */}
              <div className="text-[11px] text-gray-500 bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 flex items-start gap-1.5">
                <BadgePercent className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-blue-900">Transparansi Biaya:</span> Pembeli bebas biaya platform (Gratis). Penjual hanya dikenakan fee platform sebesar {feeCalc.percentage}% ({formatRupiah(feeCalc.feeAmount)}) jika transaksi sukses.
                </div>
              </div>
            </div>

            {/* Action Buttons (Section R) */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-buy-product-now"
                  onClick={() => onBuyNow(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Beli Sekarang
                </button>
                <button
                  id="btn-chat-seller-now"
                  onClick={() => onStartChat(item.sellerName, item.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  Chat Penjual
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-nego-modal-open"
                  onClick={() => setNegoModalOpen(!negoModalOpen)}
                  className="flex-1 py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors"
                >
                  💬 Tawar Harga (Negosiasi)
                </button>
                <button
                  id="btn-save-item-toggle"
                  onClick={() => onToggleSave(item.id)}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 ${
                    isSaved 
                      ? 'bg-blue-50 border-blue-300 text-[#2563EB]' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Tersimpan' : 'Simpan'}
                </button>
              </div>

              {/* In-modal Nego Drawer */}
              {negoModalOpen && (
                <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 animate-in fade-in">
                  <p className="text-xs font-semibold text-amber-900 mb-1">
                    Ajukan Tawaran ke {item.sellerName}:
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1.5 text-xs text-gray-500 font-medium">Rp</span>
                      <input
                        type="number"
                        value={negoOffer}
                        onChange={(e) => setNegoOffer(e.target.value)}
                        placeholder="Contoh: 130000"
                        className="w-full pl-8 pr-2 py-1.5 bg-white border border-amber-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      onClick={handleSendNego}
                      disabled={negoSent || !negoOffer}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50"
                    >
                      {negoSent ? 'Terkirim ✓' : 'Kirim'}
                    </button>
                  </div>
                  <p className="text-[10px] text-amber-700 mt-1">
                    Tawaran akan otomatis dikirim ke ruang chat penjual.
                  </p>
                </div>
              )}

              {/* Security Statement (Section AU & J) */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Transaksi aman & terverifikasi sesama mahasiswa Medan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
