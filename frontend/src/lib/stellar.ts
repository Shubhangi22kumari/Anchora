import { UserInteraction } from './types';
import { INITIAL_USER_INTERACTIONS } from './mockData';

export const STELLAR_TESTNET_CONFIG = {
  networkPassphrase: 'Test SDF Network ; September 2015',
  horizonUrl: 'https://horizon-testnet.stellar.org',
  rpcUrl: 'https://soroban-testnet.stellar.org',
  contracts: {
    invoiceRegistry: 'CBINVOICEREGISTRY7777777777777777777777777777777777777',
    fundingPool: 'CBFUNDINGPOOL8888888888888888888888888888888888888888',
    settlement: 'CBSETTLEMENT99999999999999999999999999999999999999999',
    reputation: 'CBREPUTATION6666666666666666666666666666666666666666'
  }
};

export function getLocalInteractions(): UserInteraction[] {
  if (typeof window === 'undefined') return INITIAL_USER_INTERACTIONS;
  const stored = localStorage.getItem('anchora_tx_logs');
  if (!stored) {
    localStorage.setItem('anchora_tx_logs', JSON.stringify(INITIAL_USER_INTERACTIONS));
    return INITIAL_USER_INTERACTIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_USER_INTERACTIONS;
  }
}

export function addLocalInteraction(interaction: Omit<UserInteraction, 'id' | 'txHash' | 'ledger' | 'timestamp'>): UserInteraction {
  const current = getLocalInteractions();
  const hexChars = '0123456789abcdef';
  let randomHash = '';
  for (let i = 0; i < 64; i++) {
    randomHash += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }

  const newEntry: UserInteraction = {
    ...interaction,
    id: `TX-${Date.now().toString().slice(-4)}`,
    txHash: randomHash,
    ledger: 512600 + current.length * 5 + Math.floor(Math.random() * 3),
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
  };

  const updated = [newEntry, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('anchora_tx_logs', JSON.stringify(updated));
  }
  return newEntry;
}

export function generateRandomWallet(): { address: string; secret: string } {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let address = 'G';
  for (let i = 0; i < 55; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return {
    address,
    secret: 'S...' + address.slice(4, 20)
  };
}
