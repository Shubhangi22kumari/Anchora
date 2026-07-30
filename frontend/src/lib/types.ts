export type InvoiceStatus = 'Pending' | 'Verified' | 'Funded' | 'Repaid' | 'Defaulted';

export interface Invoice {
  id: string;
  smeName: string;
  smeAddress: string;
  buyerName: string;
  buyerId: string;
  country: string;
  currency: string;
  amount: number;
  dueDate: string;
  discountRateBps: number;
  status: InvoiceStatus;
  docHash: string;
  verifiedBy?: string;
  fundedTimestamp?: number;
  settledTimestamp?: number;
  anchorCorridor?: string;
}

export interface PoolStats {
  totalLiquidity: number;
  allocatedCapital: number;
  totalYieldEarned: number;
  activeInvoicesCount: number;
  currentApy: number;
  defaultRate: number;
}

export interface InvestorPosition {
  address: string;
  depositedAmount: number;
  poolShares: number;
  earnedYield: number;
  lastDepositDate: string;
}

export interface SMEReputation {
  address: string;
  name: string;
  country: string;
  score: number;
  tier: 'A+' | 'A' | 'B' | 'C' | 'D';
  totalInvoices: number;
  fulfilledOnTime: number;
  defaultedCount: number;
  totalVolumeFunded: number;
  recommendedDiscountBps: number;
}

export interface AnchorQuote {
  assetCode: string;
  country: string;
  network: string;
  exchangeRate: number;
  feeUsdc: number;
  estimatedTime: string;
}

export interface UserInteraction {
  id: string;
  txHash: string;
  ledger: number;
  timestamp: string;
  userAddress: string;
  userRole: 'SME' | 'Investor' | 'Verifier/Oracle';
  action: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  details: string;
}

export interface FeedbackEntry {
  id: string;
  timestamp: string;
  userRole: string;
  rating: number;
  usabilityScore: number;
  comments: string;
}

export function formatNum(val: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(val);
}

