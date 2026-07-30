'use client';

import React, { useState } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { INITIAL_POOL_STATS, INITIAL_INVOICES, INITIAL_INVESTORS } from '../../lib/mockData';
import { PoolStats, InvestorPosition } from '../../lib/types';
import { DepositYieldModal } from '../../components/DepositYieldModal';

export default function InvestorPortalPage() {
  const [stats, setStats] = useState<PoolStats>(INITIAL_POOL_STATS);
  const [investors, setInvestors] = useState<InvestorPosition[]>(INITIAL_INVESTORS);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  const handleDepositSuccess = (amount: number) => {
    setStats(prev => ({
      ...prev,
      totalLiquidity: prev.totalLiquidity + amount,
    }));
    setInvestors([
      {
        address: 'GCL1...9K2L',
        depositedAmount: (investors[0]?.depositedAmount || 0) + amount,
        poolShares: (investors[0]?.poolShares || 0) + amount,
        earnedYield: investors[0]?.earnedYield || 0,
        lastDepositDate: 'Just Now'
      },
      ...investors.slice(1)
    ]);
  };

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <TrendingUp className="h-4 w-4" /> REAL-WORLD ASSET DEFI LIQUIDITY POOL
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Anchora Yield Pool #1 (USDC)</h1>
          <p className="text-xs text-slate-400">Pooled capital financing diversified emerging market trade invoices</p>
        </div>

        <button
          onClick={() => setIsDepositOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          <Plus className="h-4 w-4" /> Supply Capital & Earn Yield
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400">Total Value Locked (TVL)</div>
          <div className="text-2xl font-bold text-white mt-1">${stats.totalLiquidity.toLocaleString()} USDC</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">100% Soroban SAC Vault</div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400">Net Annual Percentage Yield</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.currentApy}% APY</div>
          <div className="text-xs text-slate-400 mt-2">Uncorrelated Trade Finance</div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Active Allocated Capital</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">${stats.allocatedCapital.toLocaleString()} USDC</div>
          <div className="text-xs text-slate-400 mt-2">{stats.activeInvoicesCount} Tokenized Invoices</div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Historical Default Rate</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{stats.defaultRate}%</div>
          <div className="text-xs text-purple-300 mt-2">Backed by Verified Buyers</div>
        </div>
      </div>

      <div className="rounded-2xl glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Underlying Funded Receivables Portfolio</h3>
            <p className="text-xs text-slate-400">Diversified pool of trade invoices from Kenya, Philippines, Nigeria, Brazil</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Invoice & SME</th>
                <th className="py-3 px-3">Corridor</th>
                <th className="py-3 px-3">Buyer ID</th>
                <th className="py-3 px-3">Face Value</th>
                <th className="py-3 px-3">Risk Tier & Yield</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {INITIAL_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white font-mono">{inv.id}</div>
                    <div className="text-[11px] text-slate-400">{inv.smeName}</div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-300">{inv.country} ({inv.anchorCorridor})</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{inv.buyerId}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-100">${inv.amount.toLocaleString()} USDC</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {(inv.discountRateBps / 100).toFixed(2)}% Trade Yield
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">{inv.dueDate}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'Funded'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : inv.status === 'Repaid'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl glass-card p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Active Pool Liquidity Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {investors.map((inv, idx) => (
            <div key={idx} className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 flex items-center justify-between">
              <div>
                <div className="font-mono text-sm font-bold text-blue-400">{inv.address}</div>
                <div className="text-xs text-slate-400 mt-1">Deposited: ${inv.depositedAmount.toLocaleString()} USDC</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-emerald-400 font-bold">+${inv.earnedYield.toLocaleString()} USDC Yield</div>
                <div className="text-[10px] text-slate-500 mt-1">Last Deposit: {inv.lastDepositDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DepositYieldModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDepositSuccess={handleDepositSuccess}
      />

    </div>
  );
}
