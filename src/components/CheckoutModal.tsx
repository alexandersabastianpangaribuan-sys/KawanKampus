import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  QrCode, 
  Truck, 
  CheckCircle2, 
  ShieldCheck,
  BadgePercent
} from 'lucide-react';
import { MarketItem, UserProfile } from '../types';
import { formatRupiah, calculateMarketSellerFee } from '../utils/feeCalculator';

interface CheckoutModalProps {
  item: MarketItem | null;
  onClose: () => void;
  onOrderSuccess: (orderData: {
    itemTitle: string;
    price: number;
    sellerName: string;
    paymentMethod: string;
    buyerName: string;
    buyerPhone: string;
    buyerLocation: string;
  }) => void;
  currentUser: UserProfile;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  item,
  onClose,
  onOrderSuccess,
  currentUser,
}) => {
  if (!item) return null;

  const [buyerName, setBuyerName] = useState(currentUser.name || '');
  const [buyerPhone, setBuyerPhone] = useState(currentUser.phone || '');
  const [buyerLocation, setBuyerLocation] = useState(
    currentUser.campus ? `Area Kampus ${currentUser.campus}` : 'Medan Tembung'
  );
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank' | 'COD'>('QRIS');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const feeCalc = calculateMarketSellerFee(item.price);

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      onOrderSuccess({
        itemTitle: item.title,
        price: item.price,
        sellerName: item.sellerName,
        paymentMethod,
        buyerName,
        buyerPhone,
        buyerLocation,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base font-bold text-gray-900">
              Checkout Kawan Market
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isDone ? (
          <form onSubmit={handleProcessOrder} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <img
                src={item.image}
                alt={item.altText}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {item.category}
                </span>
                <h4 className="font-bold text-gray-900 text-sm truncate mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  Penjual: {item.sellerName} ({item.campus})
                </p>
                <p className="text-sm font-extrabold text-[#2563EB]">
                  {formatRupiah(item.price)}
                </p>
              </div>
            </div>

            {/* Buyer Details (Section AQ) */}
            <div className="space-y-3 pt-1">
              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                Informasi Pembeli:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Nama Penerima</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Lokasi / Alamat Janjian COD / Pengiriman di Medan
                </label>
                <input
                  type="text"
                  value={buyerLocation}
                  onChange={(e) => setBuyerLocation(e.target.value)}
                  placeholder="Contoh: Depan Gerbang Utama UNIMED / Kos Pancing"
                  className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                />
              </div>
            </div>

            {/* Payment Method Selector (Section AQ) */}
            <div className="space-y-2 pt-1">
              <label className="font-bold text-gray-800 text-xs uppercase tracking-wider block">
                Pilih Metode Pembayaran:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('QRIS')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'QRIS'
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>QRIS Instan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Transfer Bank')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'Transfer Bank'
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Transfer Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>COD di Kampus</span>
                </button>
              </div>
            </div>

            {/* Fee Transparency Breakdown (Section AV) */}
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Harga Barang</span>
                <span>{formatRupiah(item.price)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Biaya Platform Pembeli</span>
                <span>GRATIS (Rp0)</span>
              </div>
              <div className="flex justify-between text-gray-500 text-[11px] pt-1 border-t border-blue-200/50">
                <span>Fee Layanan Penjual ({feeCalc.percentage}%)</span>
                <span>Dipotong otomatis {formatRupiah(feeCalc.feeAmount)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-[#0B3D91] pt-1 border-t border-blue-200">
                <span>Total Bayar</span>
                <span>{formatRupiah(item.price)}</span>
              </div>
            </div>

            {/* Simulated Gateway Disclaimer (Section AQ & BX) */}
            <p className="text-[10px] text-gray-400 italic">
              *Fitur ini merupakan simulasi pembayaran prototype platform KawanKampus.id.
            </p>

            {/* Actions */}
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
                id="btn-confirm-checkout"
                disabled={isProcessing || !buyerName || !buyerPhone}
                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold shadow-md transition-all flex items-center gap-2"
              >
                {isProcessing ? 'Memproses Simulasi...' : `Konfirmasi Pesanan (${formatRupiah(item.price)})`}
              </button>
            </div>
          </form>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="text-lg font-bold text-gray-900">
              Pesanan Berhasil Dibuat! 🎉
            </h4>

            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Pesanan untuk <strong>{item.title}</strong> telah dicatat. Penjual <strong>{item.sellerName}</strong> akan menghubungi nomor WhatsApp <strong>{buyerPhone}</strong> untuk koordinasi {paymentMethod === 'COD' ? 'titik temu COD di kampus' : 'konfirmasi transfer'}.
            </p>

            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 text-left border border-gray-200 space-y-1">
              <p>• Metode: <strong>{paymentMethod}</strong></p>
              <p>• Lokasi: <strong>{buyerLocation}</strong></p>
              <p>• Total: <strong>{formatRupiah(item.price)}</strong></p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm"
            >
              Lihat di Riwayat Pesanan Saya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
