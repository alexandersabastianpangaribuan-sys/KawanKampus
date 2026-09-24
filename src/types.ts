export type UserLevel = 'visitor' | 'buyer' | 'verified_student' | 'admin';

export type VerificationStatus = 
  | 'Belum Mengajukan' 
  | 'Menunggu Verifikasi' 
  | 'Sedang Diperiksa' 
  | 'Terverifikasi' 
  | 'Perlu Perbaikan';

export type MarketCategory = 
  | 'Semua'
  | 'Anak Kos' 
  | 'Elektronik' 
  | 'Buku' 
  | 'Fashion' 
  | 'Perkuliahan' 
  | 'Lainnya';

export type ItemCondition = 'Baru' | 'Sangat Baik' | 'Baik' | 'Cukup';

export type CampusOption = 
  | 'Semua Kampus'
  | 'UNIMED' 
  | 'USU' 
  | 'POLMED' 
  | 'UMSU' 
  | 'UINSU' 
  | 'UMA' 
  | 'Kampus Lainnya di Medan';

export interface MarketItem {
  id: string;
  title: string;
  price: number;
  category: MarketCategory;
  condition: ItemCondition;
  location: string;
  campus: string;
  sellerName: string;
  isVerifiedStudent: boolean;
  sellerRating: number;
  reviewCount: number;
  image: string;
  altText: string;
  description: string;
  transactionMethod: 'COD' | 'Transfer / QRIS' | 'COD & Transfer / QRIS';
  datePosted: string;
  views: number;
  isFoundingSeller?: boolean;
}

export type JasaType = 'PPT' | 'SPSS' | 'TURNITIN' | 'PARAFRASE' | 'EXCEL';

export interface JasaPackage {
  name: string;
  terms?: string;
  price: string | number;
  desc?: string;
}

export interface JasaItem {
  id: string;
  type: JasaType;
  category?: JasaType;
  categoryTitle: string;
  title: string;
  description: string;
  startingPriceDisplay: string;
  startingPriceNumber: number;
  startingPrice?: number;
  packages: JasaPackage[];
  terms: string[];
  features?: string[];
  revisions?: string;
  disclaimer?: string;
  note?: string;
  turnaroundDays: string;
  image: string;
  altText: string;
  excelSubServices?: { name: string; terms: string; price: string }[];
}

export type CommunityCategory = 
  | 'Info Kampus' 
  | 'Beasiswa' 
  | 'Lomba & Kompetisi' 
  | 'Peluang & Kegiatan';

export interface CommunityItem {
  id: string;
  category: CommunityCategory;
  subCategory?: string;
  title: string;
  campusOrScope: string;
  organizer: string;
  deadlineOrDate: string;
  summary: string;
  details: string;
  image: string;
  altText: string;
  isFeatured: boolean;
  featuredDays?: 7 | 14;
  status: 'Dipublikasikan' | 'Menunggu Review' | 'Draft' | 'Perlu Perbaikan';
  dateAdded: string;
  savedCount: number;
}

export type OrderStatus = 
  | 'Menunggu Pembayaran' 
  | 'Diproses' 
  | 'Dikirim' 
  | 'Dikerjakan' 
  | 'Selesai' 
  | 'Dibatalkan';

export type OrderCategoryType = 'market' | 'jasa' | 'MARKET' | 'JASA';

export interface OrderItem {
  id: string;
  type: OrderCategoryType;
  itemTitle: string;
  price: number;
  amount?: number;
  sellerOrProvider: string;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  buyerName?: string;
  buyerPhone?: string;
  buyerLocation?: string;
  platformFee?: number;
  netPayout?: number;
  briefNotes?: string;
  serviceDeadlineNumber?: string;
  rated?: boolean;
  ratingScore?: number;
  ratingComment?: string;
}

export interface PengaduanReport {
  id: string;
  orderId?: string;
  itemTitle?: string;
  reporter?: string;
  reported?: string;
  targetName?: string;
  targetType?: 'PRODUK' | 'JASA' | 'PENGGUNA';
  category: 
    | 'Barang tidak sesuai' 
    | 'Barang tidak diterima' 
    | 'Penjual tidak merespons' 
    | 'Jasa tidak sesuai' 
    | 'Pembayaran bermasalah' 
    | 'Dugaan penipuan' 
    | 'Pelanggaran etika akademik'
    | 'Pelanggaran lainnya'
    | string;
  description: string;
  evidenceFileName?: string;
  evidenceFile?: string;
  status: 'Baru' | 'Sedang Diperiksa' | 'Menunggu Review' | 'Membutuhkan Informasi' | 'Selesai' | 'Ditutup' | string;
  date?: string;
  resolutionNote?: string;
}

export type ReportSubmission = PengaduanReport;

export interface KtmVerificationSubmission {
  id: string;
  userId: string;
  fullName: string;
  campus: string;
  nim: string;
  studyProgram: string;
  ktmFileName: string;
  submittedAt: string;
  status: VerificationStatus;
  rejectionReason?: string;
  rejectReason?: string;
}

export type KtmSubmission = KtmVerificationSubmission;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  campus: string;
  nim: string;
  studyProgram: string;
  level: UserLevel;
  verificationStatus: VerificationStatus;
  isFoundingSeller: boolean;
  avatarUrl: string;
}
