import React, { useState } from 'react';
import { 
  MOCK_MARKET_ITEMS, 
  MOCK_JASA_ITEMS, 
  MOCK_COMMUNITY_ITEMS, 
  MOCK_ORDERS, 
  MOCK_KTM_SUBMISSIONS, 
  MOCK_PENGADUAN_REPORTS, 
  MOCK_PERSONAS 
} from './data/mockData';
import { 
  MarketItem, 
  JasaItem, 
  CommunityItem, 
  OrderItem, 
  KtmVerificationSubmission, 
  PengaduanReport, 
  UserLevel, 
  UserProfile 
} from './types';

export type NavigationTab = 'BERANDA' | 'MARKET' | 'JASA' | 'KOMUNITAS' | 'ORDERS' | 'ADMIN';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { FoundingSellerBanner } from './components/FoundingSellerBanner';
import { KawanMarketView } from './components/KawanMarketView';
import { KawanJasaView } from './components/KawanJasaView';
import { KawanKomunitasView } from './components/KawanKomunitasView';
import { OrdersView } from './components/OrdersView';
import { AdminDashboardView } from './components/AdminDashboardView';

// Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderJasaModal } from './components/OrderJasaModal';
import { CommunityFlyerModal } from './components/CommunityFlyerModal';
import { AddProductModal } from './components/AddProductModal';
import { AddCommunityModal } from './components/AddCommunityModal';
import { AuthModal } from './components/AuthModal';
import { KtmVerificationModal } from './components/KtmVerificationModal';
import { ReportModal } from './components/ReportModal';
import { ChatModal } from './components/ChatModal';

export default function App() {
  // Navigation & User State
  const [activeTab, setActiveTab] = useState<NavigationTab>('BERANDA');
  const [currentUserLevel, setCurrentUserLevel] = useState<UserLevel>('buyer');
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_PERSONAS.buyer);
  const [searchQuery, setSearchQuery] = useState('');

  // Data Collections
  const [marketItems, setMarketItems] = useState<MarketItem[]>(MOCK_MARKET_ITEMS);
  const [jasaItems, setJasaItems] = useState<JasaItem[]>(MOCK_JASA_ITEMS);
  const [communityItems, setCommunityItems] = useState<CommunityItem[]>(MOCK_COMMUNITY_ITEMS);
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS);
  const [ktmSubmissions, setKtmSubmissions] = useState<KtmVerificationSubmission[]>(MOCK_KTM_SUBMISSIONS);
  const [reports, setReports] = useState<PengaduanReport[]>(MOCK_PENGADUAN_REPORTS);
  const [savedCommunityIds, setSavedCommunityIds] = useState<string[]>(['com-01', 'com-03', 'com-08']);

  // Modals Visibility State
  const [selectedProduct, setSelectedProduct] = useState<MarketItem | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<MarketItem | null>(null);
  const [selectedJasa, setSelectedJasa] = useState<JasaItem | null>(null);
  const [selectedFlyer, setSelectedFlyer] = useState<CommunityItem | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKtmModalOpen, setIsKtmModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCommunityOpen, setIsAddCommunityOpen] = useState(false);
  const [reportData, setReportData] = useState<{ isOpen: boolean; targetName: string; targetType: 'PRODUK' | 'JASA' | 'PENGGUNA' }>({
    isOpen: false,
    targetName: '',
    targetType: 'PRODUK',
  });
  const [chatData, setChatData] = useState<{ isOpen: boolean; targetUser: string; itemTitle?: string }>({
    isOpen: false,
    targetUser: '',
    itemTitle: '',
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persona Change Handler
  const handleSelectPersona = (level: UserLevel) => {
    setCurrentUserLevel(level);
    setCurrentUser(MOCK_PERSONAS[level]);
    if (level === 'admin') {
      setActiveTab('ADMIN');
    } else if (activeTab === 'ADMIN') {
      setActiveTab('BERANDA');
    }
    showToast(`Beralih ke persona: ${level === 'visitor' ? 'Pengunjung (Belum Login)' : level === 'buyer' ? 'Pembeli / Mahasiswa Reguler' : level === 'verified_student' ? 'Mahasiswa Terverifikasi (Penjual)' : 'Administrator'}`);
  };

  // Order Handlers
  const handleMarketOrderSuccess = (orderData: any) => {
    const newOrder: OrderItem = {
      id: `KK-MKT-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'market',
      itemTitle: orderData.itemTitle,
      sellerOrProvider: orderData.sellerName,
      price: orderData.price,
      amount: orderData.price,
      status: 'Diproses',
      date: 'Hari Ini',
      paymentMethod: orderData.paymentMethod,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCheckoutProduct(null);
    setSelectedProduct(null);
    showToast(`Pesanan untuk ${orderData.itemTitle} berhasil dibuat! Penjual akan segera menghubungi.`);
  };

  const handleJasaOrderSuccess = (orderDetails: any) => {
    const newOrder: OrderItem = {
      id: `KK-JASA-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'jasa',
      itemTitle: orderDetails.serviceTitle,
      sellerOrProvider: 'Tim KawanKampus.id',
      price: orderDetails.price,
      amount: orderDetails.price,
      status: 'Diproses',
      date: 'Hari Ini',
      paymentMethod: 'Transfer / QRIS Resmi KawanKampus',
      briefNotes: orderDetails.brief,
      serviceDeadlineNumber: orderDetails.deadline,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setSelectedJasa(null);
    showToast(`Pesanan "${orderDetails.serviceTitle}" tercatat! Silakan kirimkan brief ke admin Telegram @kawankampuss.`);
  };

  const handleConfirmOrderReceived = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Selesai' } : o))
    );
    showToast('Status pesanan diperbarui menjadi Selesai. Terima kasih!');
  };

  // Publish Handlers
  const handlePublishMarketProduct = (newProduct: MarketItem) => {
    setMarketItems((prev) => [newProduct, ...prev]);
    showToast(`Barang "${newProduct.title}" berhasil dipublikasikan di Kawan Market!`);
  };

  const handlePublishCommunity = (newItem: CommunityItem) => {
    setCommunityItems((prev) => [newItem, ...prev]);
    showToast(`Flyer informasi "${newItem.title}" berhasil diunggah ke Kawan Komunitas!`);
  };

  // KTM Submission Handler
  const handleKtmSubmitted = (sub: any) => {
    const newSubmission: KtmVerificationSubmission = {
      id: `ktm-${Date.now()}`,
      userId: currentUser.id,
      fullName: sub.fullName,
      campus: sub.campus,
      nim: sub.nim,
      studyProgram: sub.studyProgram,
      ktmFileName: sub.ktmFileName,
      submittedAt: 'Hari Ini',
      status: 'Sedang Diperiksa',
    };
    setKtmSubmissions((prev) => [newSubmission, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      verificationStatus: 'Sedang Diperiksa',
    }));
    showToast('Dokumen KTM berhasil diunggah dan sedang diperiksa tim admin.');
  };

  // Admin Actions
  const handleApproveKtm = (id: string) => {
    setKtmSubmissions((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'Terverifikasi' } : k))
    );
    showToast('KTM mahasiswa disetujui! Akun berhasil terverifikasi.');
  };

  const handleRejectKtm = (id: string, reason: string) => {
    setKtmSubmissions((prev) =>
      prev.map((k) =>
        k.id === id
          ? { ...k, status: 'Perlu Perbaikan', rejectReason: reason }
          : k
      )
    );
    showToast(`Permintaan perbaikan KTM dikirim: ${reason}`);
  };

  const handleResolveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Selesai' } : r))
    );
    showToast('Laporan pengaduan telah diselesaikan.');
  };

  const handleDeleteListing = (id: string) => {
    setMarketItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Listing barang telah dihapus dari marketplace.');
  };

  // Community Flyer Bookmark Toggle
  const handleToggleSaveCommunity = (id: string) => {
    setSavedCommunityIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Flyer dihapus dari simpanan.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Flyer berhasil disimpan!');
        return [...prev, id];
      }
    });
  };

  // Open Chat with Seller
  const handleOpenChat = (targetUser: string, itemTitle?: string) => {
    setChatData({
      isOpen: true,
      targetUser,
      itemTitle: itemTitle || '',
    });
  };

  // Open Report Modal
  const handleOpenReport = (targetName: string, targetType: 'PRODUK' | 'JASA' | 'PENGGUNA') => {
    setReportData({
      isOpen: true,
      targetName,
      targetType,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-gray-900 selection:bg-blue-100 selection:text-[#0B3D91]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-[#0B3D91] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 border border-blue-400/20 text-xs sm:text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab.toLowerCase()}
        setActiveTab={(tab: string) => {
          setActiveTab(tab.toUpperCase() as NavigationTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={currentUser}
        setUserLevel={handleSelectPersona}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenKtmVerification={() => setIsKtmModalOpen(true)}
        onOpenAddProduct={() => {
          if (currentUser.level === 'verified_student') {
            setIsAddProductOpen(true);
          } else {
            setIsKtmModalOpen(true);
          }
        }}
        onOpenAddCommunity={() => setIsAddCommunityOpen(true)}
        savedCount={savedCommunityIds.length}
        orderCount={orders.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={(query: string) => {
          setSearchQuery(query);
          setActiveTab('MARKET');
        }}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1">
        {/* BERANDA TAB */}
        {activeTab === 'BERANDA' && (
          <div>
            <HeroSection
              onNavigate={(tab: string) => {
                setActiveTab(tab.toUpperCase() as NavigationTab);
              }}
              onOpenSell={() => {
                if (currentUser.level === 'verified_student') {
                  setIsAddProductOpen(true);
                } else {
                  setIsKtmModalOpen(true);
                }
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearchSubmit={(query: string) => {
                setSearchQuery(query);
                setActiveTab('MARKET');
              }}
            />

            <FoundingSellerBanner
              onJoin={() => {
                if (currentUserLevel === 'verified_student') {
                  setIsAddProductOpen(true);
                } else {
                  setIsKtmModalOpen(true);
                }
              }}
            />

            {/* Featured Marketplace Preview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Jual Beli Preloved Mahasiswa Medan
                  </span>
                  <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">
                    Kawan Market Pilihan
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('MARKET')}
                  className="text-xs sm:text-sm font-bold text-[#2563EB] hover:underline"
                >
                  Lihat Semua Barang →
                </button>
              </div>

              <KawanMarketView
                items={marketItems.slice(0, 8)}
                onSelectItem={(item: MarketItem) => setSelectedProduct(item)}
                onOpenSellModal={() => {
                  if (currentUserLevel === 'verified_student') {
                    setIsAddProductOpen(true);
                  } else {
                    setIsKtmModalOpen(true);
                  }
                }}
                currentUser={currentUser}
                initialSearch={searchQuery}
              />
            </div>

            {/* Jasa Section Preview */}
            <div className="bg-purple-50/50 py-12 border-y border-purple-100/60 mt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                      Layanan Resmi Tim Internal KawanKampus.id
                    </span>
                    <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">
                      Kawan Jasa: PPT, SPSS, Turnitin, Parafrase, & Excel
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('JASA')}
                    className="text-xs sm:text-sm font-bold text-purple-700 hover:underline"
                  >
                    Buka Semua Jasa →
                  </button>
                </div>

                <KawanJasaView
                  services={jasaItems}
                  onSelectService={(s) => setSelectedJasa(s)}
                  currentUser={currentUser}
                />
              </div>
            </div>

            {/* Community Section Preview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Pusat Informasi & Beasiswa
                  </span>
                  <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">
                    Kawan Komunitas Terkini
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('KOMUNITAS')}
                  className="text-xs sm:text-sm font-bold text-emerald-700 hover:underline"
                >
                  Jelajahi Semua Info →
                </button>
              </div>

              <KawanKomunitasView
                items={communityItems.slice(0, 6)}
                onSelectItem={(item) => setSelectedFlyer(item)}
                savedItemIds={savedCommunityIds}
                onToggleSave={handleToggleSaveCommunity}
                onOpenAddCommunity={() => setIsAddCommunityOpen(true)}
                currentUser={currentUser}
              />
            </div>
          </div>
        )}

        {/* MARKET TAB */}
        {activeTab === 'MARKET' && (
          <div>
            <FoundingSellerBanner
              onJoin={() => {
                if (currentUserLevel === 'verified_student') {
                  setIsAddProductOpen(true);
                } else {
                  setIsKtmModalOpen(true);
                }
              }}
            />
            <KawanMarketView
              items={marketItems}
              onSelectItem={(item: MarketItem) => setSelectedProduct(item)}
              onOpenSellModal={() => {
                if (currentUserLevel === 'verified_student') {
                  setIsAddProductOpen(true);
                } else {
                  setIsKtmModalOpen(true);
                }
              }}
              currentUser={currentUser}
              initialSearch={searchQuery}
            />
          </div>
        )}

        {/* JASA TAB (5 OFFICIAL INTERNAL SERVICES) */}
        {activeTab === 'JASA' && (
          <KawanJasaView
            services={jasaItems}
            onSelectService={(s) => setSelectedJasa(s)}
            currentUser={currentUser}
          />
        )}

        {/* KOMUNITAS TAB (4 CATEGORIES FLYER FORMAT) */}
        {activeTab === 'KOMUNITAS' && (
          <KawanKomunitasView
            items={communityItems}
            onSelectItem={(item) => setSelectedFlyer(item)}
            savedItemIds={savedCommunityIds}
            onToggleSave={handleToggleSaveCommunity}
            onOpenAddCommunity={() => setIsAddCommunityOpen(true)}
            currentUser={currentUser}
          />
        )}

        {/* ORDERS TAB */}
        {activeTab === 'ORDERS' && (
          <OrdersView
            orders={orders}
            onConfirmReceived={handleConfirmOrderReceived}
            onOpenReport={(target) => handleOpenReport(target, 'PRODUK')}
            onStartChat={(target, title) => handleOpenChat(target, title)}
            currentUser={currentUser}
          />
        )}

        {/* ADMIN TAB */}
        {activeTab === 'ADMIN' && (
          <AdminDashboardView
            ktmSubmissions={ktmSubmissions}
            onApproveKtm={handleApproveKtm}
            onRejectKtm={handleRejectKtm}
            reports={reports}
            onResolveReport={handleResolveReport}
            marketItems={marketItems}
            onDeleteListing={handleDeleteListing}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab: string) => {
          setActiveTab(tab.toUpperCase() as NavigationTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReport={() => handleOpenReport('Platform / Layanan KawanKampus', 'PRODUK')}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab.toLowerCase()}
        setActiveTab={(tab: string) => {
          setActiveTab(tab.toUpperCase() as NavigationTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* ================= MODALS ================= */}

      {/* Market Item Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyNow={(item: MarketItem) => {
            setCheckoutProduct(item);
          }}
          onStartChat={(sellerName: string, title: string) => handleOpenChat(sellerName, title)}
          isSaved={false}
          onToggleSave={() => showToast('Disimpan ke daftar simpanan.')}
          currentUser={currentUser}
        />
      )}

      {/* Checkout Market Modal */}
      {checkoutProduct && (
        <CheckoutModal
          item={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
          onOrderSuccess={handleMarketOrderSuccess}
          currentUser={currentUser}
        />
      )}

      {/* Order Jasa (Internal Services with Telegram) Modal */}
      {selectedJasa && (
        <OrderJasaModal
          service={selectedJasa}
          onClose={() => setSelectedJasa(null)}
          onSubmitOrder={handleJasaOrderSuccess}
          currentUser={currentUser}
        />
      )}

      {/* Community Flyer Modal */}
      {selectedFlyer && (
        <CommunityFlyerModal
          item={selectedFlyer}
          onClose={() => setSelectedFlyer(null)}
          isSaved={savedCommunityIds.includes(selectedFlyer.id)}
          onToggleSave={handleToggleSaveCommunity}
        />
      )}

      {/* Post Market Product Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onPublish={handlePublishMarketProduct}
        currentUser={currentUser}
        onRequireVerification={() => setIsKtmModalOpen(true)}
      />

      {/* Post Community Modal */}
      <AddCommunityModal
        isOpen={isAddCommunityOpen}
        onClose={() => setIsAddCommunityOpen(false)}
        onPublishItem={handlePublishCommunity}
        currentUser={currentUser}
      />

      {/* Auth Modal (Login, Register & Role Selection) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(level, name) => {
          handleSelectPersona(level);
          setCurrentUser((prev) => ({ ...prev, name }));
          showToast(`Berhasil masuk sebagai ${name}`);
        }}
        onOpenKtmVerification={() => setIsKtmModalOpen(true)}
      />

      {/* KTM Verification Modal */}
      <KtmVerificationModal
        isOpen={isKtmModalOpen}
        onClose={() => setIsKtmModalOpen(false)}
        currentUser={currentUser}
        onVerificationSubmitted={handleKtmSubmitted}
      />

      {/* Complaint / Report Modal */}
      <ReportModal
        isOpen={reportData.isOpen}
        onClose={() => setReportData((prev) => ({ ...prev, isOpen: false }))}
        targetName={reportData.targetName}
        targetType={reportData.targetType}
        onSubmitReport={(rep) => {
          setReports((prev) => [rep, ...prev]);
          showToast('Laporan pengaduan berhasil dikirim.');
        }}
      />

      {/* Direct Negotiation Chat Modal */}
      <ChatModal
        isOpen={chatData.isOpen}
        onClose={() => setChatData((prev) => ({ ...prev, isOpen: false }))}
        targetUser={chatData.targetUser}
        itemTitle={chatData.itemTitle}
        currentUser={currentUser}
      />
    </div>
  );
}
