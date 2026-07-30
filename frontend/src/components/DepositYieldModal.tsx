'use client';

import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, CheckCircle2 } from 'lucide-react';
import { addLocalInteraction } from '../lib/stellar';
import { logAnalyticsEvent } from '../lib/analytics';

interface DepositYieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: (amount: number) => void;
}

export const DepositYieldModal: React.FC<DepositYieldModalProps> = ({
  isOpen,
  onClose,
  onDepositSuccess,
}) => {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      addLocalInteraction({
        userAddress: 'GCL1...9K2L',
        userRole: 'Investor',
        action: 'FundingPool.deposit',
        status: 'SUCCESS',
        details: `Deposited $${val.toLocaleString()} USDC into Trade Finance Liquidity Pool`
      });

      logAnalyticsEvent('Deposit Capital', 'CONTRACT_CALL', { amount: val });

      onDepositSuccess(val);

      setTimeout(() => {
        setIsSuccess(false);
        setAmount('');
        onClose();
      }, 1200);
    }, 1000);
  };

  const currentApy = 11.8;
  const numAmount = parseFloat(amount) || 0;
  const estimatedAnnualYield = numAmount * (currentApy / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#121826] border border-slate-800 p-6 shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Supply Capital to Pool</h3>
              <p className="text-xs text-slate-400">Earn {currentApy}% APY from real SME trade finance</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-base font-bold text-white">Deposit Confirmed!</h4>
            <p className="text-xs text-slate-300">
              ${numAmount.toLocaleString()} USDC added to liquidity pool. Shares minted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeposit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Deposit Amount (USDC)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  required
                  step="500"
                  placeholder="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Net APY:</span>
                <span className="text-emerald-400 font-bold">{currentApy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated 1-Year Return:</span>
                <span className="text-white font-medium">+${estimatedAnnualYield.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDC</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-blue-600/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Executing Soroban Deposit...' : 'Confirm Deposit'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
