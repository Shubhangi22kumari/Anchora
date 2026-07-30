'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { SMEReputation } from '../lib/types';

interface ReputationCardProps {
  reputation: SMEReputation;
}

export const ReputationCard: React.FC<ReputationCardProps> = ({ reputation }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A+': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'A': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'B': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'C': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-red-500/10 text-red-400 border-red-500/30';
    }
  };

  const discountPercent = (reputation.recommendedDiscountBps / 100).toFixed(1);

  return (
    <div className="rounded-2xl glass-card p-5 space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">On-Chain Risk & Credit Score</h4>
            <p className="text-xs text-slate-400">Powered by Soroban reputation contract</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTierColor(reputation.tier)}`}>
          Tier {reputation.tier}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Credit Score:</span>
          <span className="text-white font-bold font-mono">{reputation.score} / 1000</span>
        </div>
        <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(reputation.score / 1000) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80 text-xs">
        <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800/60">
          <div className="text-slate-400 text-[11px]">Recommended Discount</div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5">{discountPercent}%</div>
        </div>
        <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800/60">
          <div className="text-slate-400 text-[11px]">Fulfilled On-Time</div>
          <div className="text-sm font-bold text-white mt-0.5">{reputation.fulfilledOnTime} / {reputation.totalInvoices}</div>
        </div>
        <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800/60">
          <div className="text-slate-400 text-[11px]">Total Funded</div>
          <div className="text-sm font-bold text-blue-400 mt-0.5">${reputation.totalVolumeFunded.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
