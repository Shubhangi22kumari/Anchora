import { Invoice, PoolStats, InvestorPosition, AnchorQuote, UserInteraction, FeedbackEntry } from './types';

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-001',
    smeName: 'Nairobi Fresh Produce Exports',
    smeAddress: 'GCPY...MD3L',
    buyerName: 'EuroMarket Supermarkets Retail BV',
    buyerId: 'EUROMKT_NL',
    country: 'Kenya',
    currency: 'USDC',
    amount: 4500,
    dueDate: '2026-08-30',
    discountRateBps: 800,
    status: 'Verified',
    docHash: '0x8f3c7b2a9e1d4f6a5b8c3d2e1f4a7b9c0d3e2f1a4b7c8d9e0f1a2b3c4d5e6f7a',
    verifiedBy: 'GCDA...SNV6',
    anchorCorridor: 'KES'
  },
  {
    id: 'INV-2026-002',
    smeName: 'Manila AgroTech Solutions Inc',
    smeAddress: 'GA7K...W5E6',
    buyerName: 'Pacific Rim Importers Corp',
    buyerId: 'PACRIM_US',
    country: 'Philippines',
    currency: 'USDC',
    amount: 8200,
    dueDate: '2026-09-15',
    discountRateBps: 500,
    status: 'Funded',
    docHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    verifiedBy: 'GCDA...SNV6',
    fundedTimestamp: 1785400000,
    anchorCorridor: 'PHP'
  },
  {
    id: 'INV-2026-003',
    smeName: 'Lagos Leatherworks & Crafts',
    smeAddress: 'GCPY...MD3L',
    buyerName: 'Nordic Fashion Distributors AB',
    buyerId: 'NORDIC_SE',
    country: 'Nigeria',
    currency: 'USDC',
    amount: 3100,
    dueDate: '2026-08-10',
    discountRateBps: 1000,
    status: 'Repaid',
    docHash: '0x9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    verifiedBy: 'GCDA...SNV6',
    fundedTimestamp: 1784000000,
    settledTimestamp: 1785300000,
    anchorCorridor: 'NGN'
  },
  {
    id: 'INV-2026-004',
    smeName: 'São Paulo EcoTextiles Exporters',
    smeAddress: 'GA7K...W5E6',
    buyerName: 'Americas Retail Group LLC',
    buyerId: 'AMERICAS_US',
    country: 'Brazil',
    currency: 'USDC',
    amount: 12500,
    dueDate: '2026-10-01',
    discountRateBps: 750,
    status: 'Verified',
    docHash: '0x3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b',
    verifiedBy: 'GCDA...SNV6',
    anchorCorridor: 'BRL'
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
    address: 'GD44...J6Y3',
    depositedAmount: 100000,
    poolShares: 100000,
    earnedYield: 7420,
    lastDepositDate: '2026-06-01'
  },
  {
    address: 'GCDA...SNV6',
    depositedAmount: 75000,
    poolShares: 75000,
    earnedYield: 5560,
    lastDepositDate: '2026-06-15'
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
    txHash: '3bc8be4190b90ac3d58bebb42f5c50cd78ff38ae1fdc73ffb8b3e5f5dab60f31',
    ledger: 3879524,
    timestamp: '2026-07-30 13:06:45 UTC',
    userAddress: 'GCPYJ3WXZQZ7OMPRGTP3EPQLR2HAL3PPCN56ZFISAJ6JBOXUNLE6MD3L',
    userRole: 'SME',
    action: 'InvoiceRegistry.submit_invoice',
    status: 'SUCCESS',
    details: 'Submitted Invoice INV-2026-001 ($4,500 USDC) from Kenya SME'
  },
  {
    id: 'TX-102',
    txHash: 'c1b0a3c5bc85d9121722b7a143a7025ef69f283eb5a8c9fd61302da0bafb961a',
    ledger: 3879525,
    timestamp: '2026-07-30 13:06:50 UTC',
    userAddress: 'GCPYJ3WXZQZ7OMPRGTP3EPQLR2HAL3PPCN56ZFISAJ6JBOXUNLE6MD3L',
    userRole: 'SME',
    action: 'Stellar.change_trust',
    status: 'SUCCESS',
    details: 'Established USDC trustline for SME account'
  },
  {
    id: 'TX-103',
    txHash: '6dd4e95eccba465f88ac5c642fc248cd7af73d5426388a9c0c591d949bf9add3',
    ledger: 3879526,
    timestamp: '2026-07-30 13:06:55 UTC',
    userAddress: 'GD44PIKYENYFBMHXZHE3CC7TRSRPFK5A6EWBU6MQ4UXM2XPF7B5XJ6Y3',
    userRole: 'Investor',
    action: 'Stellar.change_trust',
    status: 'SUCCESS',
    details: 'Established USDC trustline for Investor account'
  },
  {
    id: 'TX-104',
    txHash: '2bb45989274c31520a4db354a71d2e0cd7317b332de0dbce9364a69468336305',
    ledger: 3879527,
    timestamp: '2026-07-30 13:07:00 UTC',
    userAddress: 'GCDAPDQIVRJP2FG7QDLXVKQHLHRPCD4E7FRPZPI7SDQUQ7PLPIBGSNV6',
    userRole: 'Verifier/Oracle',
    action: 'FundingPool.deposit_mint',
    status: 'SUCCESS',
    details: 'Minted 100,000 USDC liquidity to investor vault'
  },
  {
    id: 'TX-105',
    txHash: 'ae7a9cb041e4a19a78800b95c5474b47586b1819fff4345acb599065a84509b9',
    ledger: 3879528,
    timestamp: '2026-07-30 13:07:05 UTC',
    userAddress: 'GD44PIKYENYFBMHXZHE3CC7TRSRPFK5A6EWBU6MQ4UXM2XPF7B5XJ6Y3',
    userRole: 'Investor',
    action: 'FundingPool.deposit',
    status: 'SUCCESS',
    details: 'Deposited 50,000 USDC into Trade Finance Liquidity Pool'
  },
  {
    id: 'TX-106',
    txHash: 'f01507c5d5c09c808a02214ce0749c96c63a69a94554b9577257d46a0b724b03',
    ledger: 3879529,
    timestamp: '2026-07-30 13:07:10 UTC',
    userAddress: 'GCDAPDQIVRJP2FG7QDLXVKQHLHRPCD4E7FRPZPI7SDQUQ7PLPIBGSNV6',
    userRole: 'Verifier/Oracle',
    action: 'InvoiceRegistry.verify_and_tokenize',
    status: 'SUCCESS',
    details: 'Verified & tokenized INV-2026-001 with 800 BPS discount (Tier A)'
  },
  {
    id: 'TX-107',
    txHash: '96f26be51532f8426e1a61e1e30617d0cae98f091330eee2a87efad9a27cba14',
    ledger: 3879530,
    timestamp: '2026-07-30 13:07:15 UTC',
    userAddress: 'GCDAPDQIVRJP2FG7QDLXVKQHLHRPCD4E7FRPZPI7SDQUQ7PLPIBGSNV6',
    userRole: 'Verifier/Oracle',
    action: 'FundingPool.allocate_to_invoice',
    status: 'SUCCESS',
    details: 'Dispatched $4,140 USDC advance to Nairobi Fresh Produce'
  },
  {
    id: 'TX-108',
    txHash: 'f5da8478cf116ea714a2dff1d8f219bbe4179542b1835ef8ca23482526630ed9',
    ledger: 3879531,
    timestamp: '2026-07-30 13:07:20 UTC',
    userAddress: 'GCPYJ3WXZQZ7OMPRGTP3EPQLR2HAL3PPCN56ZFISAJ6JBOXUNLE6MD3L',
    userRole: 'SME',
    action: 'SEP-24 Anchor Off-Ramp (KES M-Pesa)',
    status: 'SUCCESS',
    details: 'Cashed out 4,140 USDC -> 536,130 KES via Stellar Anchor Rail'
  },
  {
    id: 'TX-109',
    txHash: '396c41b5f2368f1928b16517e055467814a655376836853c7e6e8ad899839637',
    ledger: 3879532,
    timestamp: '2026-07-30 13:07:25 UTC',
    userAddress: 'GA7KN4UURRZ663NQUOD7FMOR4HHYLKP6Q2IRTNEY5AQSPXF7H5HNW5E6',
    userRole: 'SME',
    action: 'InvoiceRegistry.submit_invoice',
    status: 'SUCCESS',
    details: 'Submitted Invoice INV-2026-002 ($8,200 USDC) from Philippines SME'
  },
  {
    id: 'TX-110',
    txHash: '23e304df0e06c55ecfca61539de4468797b8577b2dd4b9ecb049089392f9e9b3',
    ledger: 3879533,
    timestamp: '2026-07-30 13:07:30 UTC',
    userAddress: 'GCDAPDQIVRJP2FG7QDLXVKQHLHRPCD4E7FRPZPI7SDQUQ7PLPIBGSNV6',
    userRole: 'Verifier/Oracle',
    action: 'InvoiceRegistry.verify_and_tokenize',
    status: 'SUCCESS',
    details: 'Verified INV-2026-002 with 500 BPS discount (Tier A+)'
  },
  {
    id: 'TX-111',
    txHash: '0ac414674ba64436a94d211380a11e9742c9658d03d7dae46598a226c304d34f',
    ledger: 3879534,
    timestamp: '2026-07-30 13:07:35 UTC',
    userAddress: 'GCDAPDQIVRJP2FG7QDLXVKQHLHRPCD4E7FRPZPI7SDQUQ7PLPIBGSNV6',
    userRole: 'Verifier/Oracle',
    action: 'Settlement.process_repayment',
    status: 'SUCCESS',
    details: 'Buyer repaid INV-2026-003 ($5,000 USDC). Returned principal + yield to pool'
  },
  {
    id: 'TX-112',
    txHash: '419bbcced183461804cafd9552546f0a3a8eab9122de080ab34e510eba99978d',
    ledger: 3879535,
    timestamp: '2026-07-30 13:07:40 UTC',
    userAddress: 'GCDAPDQIVRJP2FG7QDLXVKQHLHRPCD4E7FRPZPI7SDQUQ7PLPIBGSNV6',
    userRole: 'Verifier/Oracle',
    action: 'Reputation.record_fulfillment',
    status: 'SUCCESS',
    details: 'Updated SME Nairobi Fresh score -> 825 (Tier A)'
  }
];

export const INITIAL_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'FB-001',
    timestamp: '2026-07-30 13:10 UTC',
    userRole: 'SME Exporter (Kenya)',
    rating: 5,
    usabilityScore: 9,
    comments: 'Cashing out via M-Pesa within 3 minutes was unbelievable. Standard bank factoring takes 45 days. Anchora saved our inventory run!'
  },
  {
    id: 'FB-002',
    timestamp: '2026-07-30 13:15 UTC',
    userRole: 'Yield Liquidity Provider',
    rating: 5,
    usabilityScore: 10,
    comments: 'Super clean real-world asset yield. Uncorrelated trade finance backed by real European and US buyer invoices on Stellar.'
  },
  {
    id: 'FB-003',
    timestamp: '2026-07-30 13:20 UTC',
    userRole: 'Trade Auditor / Verifier',
    rating: 4,
    usabilityScore: 8,
    comments: 'The on-chain IPFS document hash verification gives complete auditability. Looking forward to automatic ERP API integration.'
  }
];
