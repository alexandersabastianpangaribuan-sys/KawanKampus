/**
 * Fee calculation and formatting utilities for KawanKampus.id
 * Conforming strictly to KawanKampus revised business model:
 * - Kawan Market: Tiered seller fee (2% to 5%), buyer is free (0%).
 * - Kawan Jasa: Managed directly by internal KawanKampus team (Revenue = Service price - Operating cost = Margin). No freelance provider fees.
 */

export function calculateMarketSellerFee(price: number): { percentage: number; feeAmount: number; sellerNet: number } {
  let percentage = 2.0;

  if (price >= 10000 && price <= 49000) {
    percentage = 2.0;
  } else if (price >= 50000 && price <= 99000) {
    percentage = 2.5;
  } else if (price >= 100000 && price <= 199000) {
    percentage = 3.0;
  } else if (price >= 200000 && price <= 499000) {
    percentage = 3.5;
  } else if (price >= 500000 && price <= 999000) {
    percentage = 4.5;
  } else if (price >= 1000000) {
    percentage = 5.0;
  } else {
    // Under 10,000
    percentage = 2.0;
  }

  const feeAmount = Math.round((price * percentage) / 100);
  const sellerNet = price - feeAmount;

  return { percentage, feeAmount, sellerNet };
}

export function formatRupiah(amount: number | string): string {
  if (typeof amount === 'string') {
    if (amount.includes('Rp') || amount.includes('/')) {
      return amount;
    }
    const parsed = Number(amount.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(parsed)) amount = parsed;
    else return amount;
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
