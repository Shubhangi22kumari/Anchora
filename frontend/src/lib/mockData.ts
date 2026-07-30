import { Invoice, PoolStats, InvestorPosition, AnchorQuote, UserInteraction, FeedbackEntry } from './types';

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-001',
    smeName: 'Nairobi Fresh Produce Exports',
    smeAddress: 'GDQK...9X2A',
    buyerName: 'EuroMarket Supermarkets Retail BV',
    buyerId: 'EUROMKT_NL',
    country: 'Kenya',
    currency: 'USDC',
    amount: 4500,
    dueDate: '2026-08-30',
    discountRateBps: 800,
    status: 'Verified',
    docHash: '0x8f3c7b2a9e1d4f6a5b8c3d2e1f4a7b9c0d3e2f1a4b7c8d9e0f1a2b3c4d5e6f7a',
    verifiedBy: 'GBTR...7K9P',
    anchorCorridor: 'KES'
  },
  {
    id: 'INV-2026-002',
    smeName: 'Manila AgroTech Solutions Inc',
    smeAddress: 'GCH9...4B1Z',
    buyerName: 'Pacific Rim Importers Corp',
    buyerId: 'PACRIM_US',
    country: 'Philippines',
    currency: 'USDC',
    amount: 8200,
    dueDate: '2026-09-15',
    discountRateBps: 500,
    status: 'Funded',
    docHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    verifiedBy: 'GBTR...7K9P',
    fundedTimestamp: 1785400000,
    anchorCorridor: 'PHP'
  },
  {
    id: 'INV-2026-003',
    smeName: 'Lagos Leatherworks & Crafts',
    smeAddress: 'GAY2...8L3W',
    buyerName: 'Nordic Fashion Distributors AB',
    buyerId: 'NORDIC_SE',
    country: 'Nigeria',
    currency: 'USDC',
    amount: 3100,
    dueDate: '2026-08-10',
    discountRateBps: 1000,
    status: 'Repaid',
    docHash: '0x9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    verifiedBy: 'GBTR...7K9P',
    fundedTimestamp: 1784000000,
    settledTimestamp: 1785300000,
    anchorCorridor: 'NGN'
  },
  {
    id: 'INV-2026-004',
    smeName: 'São Paulo EcoTextiles Exporters',
    smeAddress: 'GCKX...2P4M',
    buyerName: 'Americas Retail Group LLC',
    buyerId: 'AMERICAS_US',
    country: 'Brazil',
    currency: 'USDC',
    amount: 12500,
    dueDate: '2026-10-01',
    discountRateBps: 750,
    status: 'Verified',
    docHash: '0x3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b',
    verifiedBy: 'GBTR...7K9P',
    anchorCorridor: 'BRL'
  },
  {
    id: 'INV-2026-005',
    smeName: 'Mombasa Spices & Flavors',
    smeAddress: 'GDQK...9X2A',
    buyerName: 'Middle East Trading Co LLC',
    buyerId: 'METRADE_UAE',
    country: 'Kenya',
    currency: 'USDC',
    amount: 2800,
    dueDate: '2026-08-20',
    discountRateBps: 800,
    status: 'Pending',
    docHash: '0x4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c',
    anchorCorridor: 'KES'
  },
  {
    id: 'INV-2026-006',
    smeName: 'Cebu Woodcraft Artisans',
    smeAddress: 'GCH9...4B1Z',
    buyerName: 'Global Living Home Goods UK',
    buyerId: 'GLHOME_UK',
    country: 'Philippines',
    currency: 'USDC',
    amount: 5400,
    dueDate: '2026-09-05',
    discountRateBps: 500,
    status: 'Funded',
    docHash: '0x5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d',
    verifiedBy: 'GBTR...7K9P',
    fundedTimestamp: 1785420000,
    anchorCorridor: 'PHP'
  },
  {
    id: 'INV-2026-007',
    smeName: 'Kano Organic Cotton Mills',
    smeAddress: 'GAY2...8L3W',
    buyerName: 'TexStyle Apparel Global SA',
    buyerId: 'TEXSTYLE_FR',
    country: 'Nigeria',
    currency: 'USDC',
    amount: 9600,
    dueDate: '2026-09-28',
    discountRateBps: 1000,
    status: 'Verified',
    docHash: '0x6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e',
    verifiedBy: 'GBTR...7K9P',
    anchorCorridor: 'NGN'
  },
  {
    id: 'INV-2026-008',
    smeName: 'Curitiba Precision Components',
    smeAddress: 'GCKX...2P4M',
    buyerName: 'Industrial Heavy Equipment Inc',
    buyerId: 'HEAVY_DE',
    country: 'Brazil',
    currency: 'USDC',
    amount: 15000,
    dueDate: '2026-10-15',
    discountRateBps: 750,
    status: 'Pending',
    docHash: '0x7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f',
    anchorCorridor: 'BRL'
  },
  {
    id: 'INV-2026-009',
    smeName: 'Nairobi Fresh Produce Exports',
    smeAddress: 'GDQK...9X2A',
    buyerName: 'Global Agri Importers Ltd',
    buyerId: 'AGRI_UK',
    country: 'Kenya',
    currency: 'USDC',
    amount: 6200,
    dueDate: '2026-07-25',
    discountRateBps: 800,
    status: 'Repaid',
    docHash: '0x8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a',
    verifiedBy: 'GBTR...7K9P',
    fundedTimestamp: 1782000000,
    settledTimestamp: 1784900000,
    anchorCorridor: 'KES'
  },
  {
    id: 'INV-2026-010',
    smeName: 'Manila AgroTech Solutions Inc',
    smeAddress: 'GCH9...4B1Z',
    buyerName: 'Asia-Pacific Foods Pte Ltd',
    buyerId: 'APFOODS_SG',
    country: 'Philippines',
    currency: 'USDC',
    amount: 11000,
    dueDate: '2026-07-18',
    discountRateBps: 500,
    status: 'Repaid',
    docHash: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b',
    verifiedBy: 'GBTR...7K9P',
    fundedTimestamp: 1781000000,
    settledTimestamp: 1784200000,
    anchorCorridor: 'PHP'
  }
];

export const INITIAL_POOL_STATS: PoolStats = {
  totalLiquidity: 250000,
  allocatedCapital: 124200,
  totalYieldEarned: 18450,
  activeInvoicesCount: 14,
  currentApy: 11.8,
  defaultRate: 0.8
};

export const INITIAL_INVESTORS: InvestorPosition[] = [
  {
    address: 'GCL1...9K2L',
    depositedAmount: 100000,
    poolShares: 100000,
    earnedYield: 7420,
    lastDepositDate: '2026-06-01'
  },
  {
    address: 'GA89...3M7N',
    depositedAmount: 75000,
    poolShares: 75000,
    earnedYield: 5560,
    lastDepositDate: '2026-06-15'
  },
  {
    address: 'GBTR...7K9P',
    depositedAmount: 50000,
    poolShares: 50000,
    earnedYield: 3710,
    lastDepositDate: '2026-07-02'
  },
  {
    address: 'GDKX...4V1Q',
    depositedAmount: 25000,
    poolShares: 25000,
    earnedYield: 1760,
    lastDepositDate: '2026-07-20'
  }
];

export const ANCHOR_QUOTES: Record<string, AnchorQuote> = {
  KES: {
    assetCode: 'KES',
    country: 'Kenya',
    network: 'M-Pesa / Bank Rail (KCB, Equity Bank)',
    exchangeRate: 129.5,
    feeUsdc: 1.5,
    estimatedTime: '2-5 Minutes'
  },
  PHP: {
    assetCode: 'PHP',
    country: 'Philippines',
    network: 'GCash / Maya / Instapay Rail',
    exchangeRate: 58.40,
    feeUsdc: 1.2,
    estimatedTime: '1-3 Minutes'
  },
  NGN: {
    assetCode: 'NGN',
    country: 'Nigeria',
    network: 'NIBSS Fast Bank Transfer',
    exchangeRate: 1540.0,
    feeUsdc: 2.0,
    estimatedTime: '3-10 Minutes'
  },
  BRL: {
    assetCode: 'BRL',
    country: 'Brazil',
    network: 'Pix Instant Payout Rail',
    exchangeRate: 5.65,
    feeUsdc: 1.0,
    estimatedTime: '< 1 Minute'
  }
};

export const INITIAL_USER_INTERACTIONS: UserInteraction[] = [
  {
    id: 'TX-101',
    txHash: 'e4a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',
    ledger: 512401,
    timestamp: '2026-07-30 14:22:10 UTC',
    userAddress: 'GDQK...9X2A',
    userRole: 'SME',
    action: 'InvoiceRegistry.submit_invoice',
    status: 'SUCCESS',
    details: 'Submitted Invoice INV-2026-001 ($4,500 USDC)'
  },
  {
    id: 'TX-102',
    txHash: 'f5b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    ledger: 512405,
    timestamp: '2026-07-30 14:28:45 UTC',
    userAddress: 'GBTR...7K9P',
    userRole: 'Verifier/Oracle',
    action: 'InvoiceRegistry.verify_and_tokenize',
    status: 'SUCCESS',
    details: 'Verified & tokenized INV-2026-001 with 800 BPS discount'
  },
  {
    id: 'TX-103',
    txHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    ledger: 512412,
    timestamp: '2026-07-30 14:35:12 UTC',
    userAddress: 'GCL1...9K2L',
    userRole: 'Investor',
    action: 'FundingPool.deposit',
    status: 'SUCCESS',
    details: 'Deposited 10,000 USDC into Trade Finance Liquidity Pool'
  },
  {
    id: 'TX-104',
    txHash: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
    ledger: 512420,
    timestamp: '2026-07-30 14:40:00 UTC',
    userAddress: 'GBTR...7K9P',
    userRole: 'Verifier/Oracle',
    action: 'FundingPool.allocate_to_invoice',
    status: 'SUCCESS',
    details: 'Allocated $4,140 USDC advance to SME Nairobi Fresh Produce'
  },
  {
    id: 'TX-105',
    txHash: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
    ledger: 512425,
    timestamp: '2026-07-30 14:42:30 UTC',
    userAddress: 'GDQK...9X2A',
    userRole: 'SME',
    action: 'SEP-24 Anchor Off-Ramp (KES M-Pesa)',
    status: 'SUCCESS',
    details: 'Cashed out 4,140 USDC -> 536,130 KES via Stellar Anchor Rail'
  },
  {
    id: 'TX-106',
    txHash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
    ledger: 512450,
    timestamp: '2026-07-30 15:01:15 UTC',
    userAddress: 'GCH9...4B1Z',
    userRole: 'SME',
    action: 'InvoiceRegistry.submit_invoice',
    status: 'SUCCESS',
    details: 'Submitted Invoice INV-2026-002 ($8,200 USDC)'
  },
  {
    id: 'TX-107',
    txHash: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
    ledger: 512460,
    timestamp: '2026-07-30 15:10:00 UTC',
    userAddress: 'GBTR...7K9P',
    userRole: 'Verifier/Oracle',
    action: 'InvoiceRegistry.verify_and_tokenize',
    status: 'SUCCESS',
    details: 'Verified INV-2026-002 with 500 BPS discount (Tier A+)'
  },
  {
    id: 'TX-108',
    txHash: 'f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
    ledger: 512480,
    timestamp: '2026-07-30 15:30:22 UTC',
    userAddress: 'GBTR...7K9P',
    userRole: 'Verifier/Oracle',
    action: 'Settlement.process_repayment',
    status: 'SUCCESS',
    details: 'Buyer repaid INV-2026-003 ($3,100 USDC). Distributed principal + yield'
  },
  {
    id: 'TX-109',
    txHash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
    ledger: 512490,
    timestamp: '2026-07-30 15:45:10 UTC',
    userAddress: 'GBTR...7K9P',
    userRole: 'Verifier/Oracle',
    action: 'Reputation.record_fulfillment',
    status: 'SUCCESS',
    details: 'Updated SME Lagos Leatherworks score -> 825 (Tier A)'
  },
  {
    id: 'TX-110',
    txHash: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9',
    ledger: 512510,
    timestamp: '2026-07-30 16:05:00 UTC',
    userAddress: 'GA89...3M7N',
    userRole: 'Investor',
    action: 'FundingPool.withdraw',
    status: 'SUCCESS',
    details: 'Withdrew 2,500 USDC principal + earned yield'
  },
  {
    id: 'TX-111',
    txHash: 'c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0',
    ledger: 512535,
    timestamp: '2026-07-30 16:20:40 UTC',
    userAddress: 'GCKX...2P4M',
    userRole: 'SME',
    action: 'InvoiceRegistry.submit_invoice',
    status: 'SUCCESS',
    details: 'Submitted Invoice INV-2026-004 ($12,500 USDC)'
  },
  {
    id: 'TX-112',
    txHash: 'd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1',
    ledger: 512560,
    timestamp: '2026-07-30 16:40:12 UTC',
    userAddress: 'GCKX...2P4M',
    userRole: 'SME',
    action: 'SEP-24 Anchor Off-Ramp (BRL Pix)',
    status: 'SUCCESS',
    details: 'Cashed out advance -> 65,331 BRL via Pix Instant Rail'
  }
];

export const INITIAL_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'FB-001',
    timestamp: '2026-07-30 15:00 UTC',
    userRole: 'SME Exporter (Kenya)',
    rating: 5,
    usabilityScore: 9,
    comments: 'Cashing out via M-Pesa within 3 minutes was unbelievable. Standard bank factoring takes 45 days. Anchora saved our inventory run!'
  },
  {
    id: 'FB-002',
    timestamp: '2026-07-30 15:40 UTC',
    userRole: 'Yield Liquidity Provider',
    rating: 5,
    usabilityScore: 10,
    comments: 'Super clean real-world asset yield. Uncorrelated trade finance backed by real European and US buyer invoices on Stellar.'
  },
  {
    id: 'FB-003',
    timestamp: '2026-07-30 16:15 UTC',
    userRole: 'Trade Auditor / Verifier',
    rating: 4,
    usabilityScore: 8,
    comments: 'The on-chain IPFS document hash verification gives complete auditability. Looking forward to automatic ERP API integration.'
  }
];
