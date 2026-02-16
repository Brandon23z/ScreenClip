// Free tier and payment tracking using localStorage (no accounts needed)

const STORAGE_KEYS = {
  USES: 'screenclip_uses',
  RESET_DATE: 'screenclip_reset_date',
  PAID: 'screenclip_paid',
  CUSTOMER_ID: 'screenclip_customer_id',
};

const FREE_LIMIT = 3;

// Get current month string (YYYY-MM)
function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// Check if user is paid
export function isPaidUser(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.PAID) === 'true';
}

// Get current usage count
export function getUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  
  const resetDate = localStorage.getItem(STORAGE_KEYS.RESET_DATE);
  const currentMonth = getCurrentMonth();
  
  // Reset if it's a new month
  if (resetDate !== currentMonth) {
    localStorage.setItem(STORAGE_KEYS.RESET_DATE, currentMonth);
    localStorage.setItem(STORAGE_KEYS.USES, '0');
    return 0;
  }
  
  const uses = localStorage.getItem(STORAGE_KEYS.USES);
  return uses ? parseInt(uses, 10) : 0;
}

// Check if user has hit the free limit
export function hasHitFreeLimit(): boolean {
  if (isPaidUser()) return false;
  return getUsageCount() >= FREE_LIMIT;
}

// Increment usage count
export function incrementUsage(): void {
  if (typeof window === 'undefined') return;
  
  const currentCount = getUsageCount();
  localStorage.setItem(STORAGE_KEYS.USES, String(currentCount + 1));
}

// Mark user as paid (after successful checkout)
export function markAsPaid(customerId?: string): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEYS.PAID, 'true');
  if (customerId) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customerId);
  }
}

// Get remaining free exports
export function getRemainingExports(): number {
  if (isPaidUser()) return Infinity;
  return Math.max(0, FREE_LIMIT - getUsageCount());
}
