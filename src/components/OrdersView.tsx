import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  MessageSquare, 
  Star, 
  ShieldAlert, 
  ChevronRight,
  Sparkles,
  Layers,
  Zap,
  Package
} from 'lucide-react';
import { OrderItem, OrderStatus, UserProfile } from '../types';
import { formatRupiah } from '../utils/feeCalculator';

interface OrdersViewProps {
  orders: OrderItem[];
  onConfirmReceived: (orderId: string) => void;
  onOpenReport: (targetName: string) => void;
  onStartChat: (targetName: string, itemTitle: string) => void;
  currentUser: UserProfile;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onConfirmReceived,
  onOpenReport,
  onStartChat,
  currentUser,
}) => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<OrderStatus | 'Semua'>('Semua');
  const [ratingModalOrderId, setRatingModalOrderId] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const statusTabs: (OrderStatus | 'Semua')[] = [
    'Semua',
    'Menunggu Pembayaran',
    'Diproses',
    'Dikirim',
    'Dikerjakan',
    'Selesai',
    'Dibatalkan'
  ];

  const filteredOrders = orders.filter((o) => {
    if (selectedStatusTab === 'Semua') return true;
    return o.status === selectedStatusTab;
  });

  const handleGiveRating = (orderId: string) => {
    alert(`Terima kasih atas ulasan ${ratingStars} bintang Anda! Ulasan telah dicatat.`);
    setRatingModalOrderId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          📦 Aktivitas Transaksi
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
          Pesanan & Transaksi Saya
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Pantau status pesanan barang Kawan Market dan pengerjaan layanan resmi Kawan Jasa.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatusTab(tab)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedStatusTab === tab
                ? 'bg-[#0B3D91] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-gray-800 text-base">Belum Ada Pesanan di Kategori Ini</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Jelajahi Kawan Market atau Kawan Jasa untuk menemukan kebutuhan perkuliahanmu.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isFinished = order.status === 'Selesai';
            const canConfirm = order.status === 'Dikirim' || order.status === 'Dikerjakan' || order.status === 'Diproses';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:border-gray-300 transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                      order.type.toUpperCase() === 'MARKET' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {order.type.toUpperCase() === 'MARKET' ? '🛍️ Market' : '🛠️ Jasa'}
                    </span>
                    <span className="text-gray-400">ID: {order.id}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{order.date}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      order.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'Menunggu Pembayaran' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'Dibatalkan' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Content Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {order.itemTitle}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Penyedia / Penjual: <strong className="text-gray-700">{order.sellerOrProvider}</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      Metode: {order.paymentMethod}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-400 block">Total Transaksi</span>
                    <span className="text-lg font-extrabold text-[#0B3D91]">
                      {formatRupiah(order.price ?? order.amount ?? 0)}
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartChat(order.sellerOrProvider, order.itemTitle)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>Chat Penjual</span>
                    </button>

                    <button
                      onClick={() => onOpenReport(order.itemTitle)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-red-50 text-gray-500 hover:text-red-600 text-xs flex items-center gap-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Laporkan Masalah</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {canConfirm && (
                      <button
                        onClick={() => onConfirmReceived(order.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Konfirmasi Terima / Selesai</span>
                      </button>
                    )}

                    {isFinished && (
                      <button
                        onClick={() => setRatingModalOrderId(order.id)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>Beri Ulasan</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {ratingModalOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-base">Beri Ulasan Transaksi</h3>
            <p className="text-xs text-gray-500">
              Bagikan pengalamanmu berbelanja atau memesan jasa untuk membantu sesama mahasiswa Medan.
            </p>

            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingStars(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= ratingStars ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Pelayanan cepat, barang sesuai foto, sangat ramah..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRatingModalOrderId(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={() => handleGiveRating(ratingModalOrderId)}
                className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-xs"
              >
                Kirim Ulasan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
