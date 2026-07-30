'use client';

import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, CheckCircle2, RefreshCw, Smartphone, Landmark, Globe } from 'lucide-react';
import { Invoice } from '../lib/types';
import { ANCHOR_QUOTES } from '../lib/mockData';
import { addLocalInteraction } from '../lib/stellar';
import { logAnalyticsEvent } from '../lib/analytics';

interface SEP24AnchorModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSuccess: (invoiceId: string) => void;
}

export const SEP24AnchorModal: React.FC<SEP24AnchorModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sep24TxId, setSep24TxId] = useState<string>('');

  if (!isOpen || !invoice) return null;

  const corridorKey = invoice.anchorCorridor || 'KES';
  const quote = ANCHOR_QUOTES[corridorKey] || ANCHOR_QUOTES['KES'];

  const discountDecimal = invoice.discountRateBps / 10000;
  const advanceUsdc = invoice.amount * (1 - discountDecimal);
  const netUsdc = Math.max(0, advanceUsdc - quote.feeUsdc);
  const localFiatPayout = netUsdc * quote.exchangeRate;

  const handleStartSep24 = () => {
    if (!accountNumber) return;
    setStep(2);
  };

  const handleConfirmKyc = () => {
    setStep(3);
    setIsProcessing(true);

    setTimeout(() => {
      const txId = `SEP24-${Math.floor(100000 + Math.random() * 900000)}`;
      setSep24TxId(txId);
      setIsProcessing(false);
      setStep(4);

      addLocalInteraction({
        userAddress: invoice.smeAddress,
        userRole: 'SME',
        action: `SEP-24 Anchor Off-Ramp (${quote.assetCode})`,
        status: 'SUCCESS',
        details: `Cashed out ${advanceUsdc.toLocaleString()} USDC -> ${localFiatPayout.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${quote.assetCode} via Stellar Anchor Rail`
      });

      logAnalyticsEvent('SEP-24 Offramp Success', 'SEP24_OFFRAMP', {
        invoiceId: invoice.id,
        fiatAmount: localFiatPayout,
        asset: quote.assetCode
      });

      onSuccess(invoice.id);
    }, 1500);
  };

  const resetAndClose = () => {
    setStep(1);
    setAccountNumber('');
    setAccountName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121826] border border-slate-800 p-6 shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Stellar SEP-24 Anchor Off-Ramp
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Interactive</span>
              </h3>
              <p className="text-xs text-slate-400">Convert USDC advance directly to local fiat bank/mobile wallet</p>
            </div>
          </div>
          <button onClick={resetAndClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-6 px-2">
          {[
            { num: 1, label: 'Payout Rail' },
            { num: 2, label: 'Anchor KYC' },
            { num: 3, label: 'Settlement' },
            { num: 4, label: 'Complete' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step >= s.num
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {s.num}
              </div>
              <span className={`text-[11px] font-medium hidden sm:inline ${step >= s.num ? 'text-slate-200' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 text-sm">
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Invoice Reference:</span>
                <span className="font-mono text-white font-medium">{invoice.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Face Value:</span>
                <span className="text-slate-200">${invoice.amount.toLocaleString()} USDC</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Risk Discount ({(invoice.discountRateBps / 100).toFixed(2)}%):</span>
                <span className="text-amber-400">-${(invoice.amount * discountDecimal).toLocaleString()} USDC</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-300">Early Advance Amount:</span>
                <span className="text-sm font-bold text-emerald-400">${advanceUsdc.toLocaleString()} USDC</span>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20 p-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-blue-300 font-medium">{quote.country} Corridor ({quote.network})</div>
                <div className="text-lg font-extrabold text-white mt-0.5">
                  1 USDC = {quote.exchangeRate} {quote.assetCode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Est. Payout</div>
                <div className="text-sm font-bold text-emerald-400">
                  {localFiatPayout.toLocaleString(undefined, { maximumFractionDigits: 2 })} {quote.assetCode}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Local Mobile Wallet / Bank Account Number
              </label>
              <div className="relative">
                {corridorKey === 'KES' || corridorKey === 'PHP' ? (
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                ) : (
                  <Landmark className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                )}
                <input
                  type="text"
                  required
                  placeholder={corridorKey === 'KES' ? 'M-Pesa Number (+254...)' : 'Account / Phone Number'}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Account Holder Full Name</label>
              <input
                type="text"
                placeholder="e.g. Nairobi Fresh Produce Ltd"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleStartSep24}
              disabled={!accountNumber}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50"
            >
              Initiate SEP-24 Anchor Bridge <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-900 border border-blue-500/30 p-4 text-center">
              <ShieldCheck className="h-10 w-10 text-blue-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Stellar Regulated Anchor Gateway</h4>
              <p className="text-xs text-slate-400 mt-1">
                Authenticating SEP-24 session with licensed Stellar Anchor partner...
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs space-y-2">
              <div className="text-blue-400 font-semibold">[SEP-24 INTERACTIVE FLOW]</div>
              <div className="text-slate-300">GET /sep24/transaction/deposit/interactive</div>
              <div className="text-slate-400">Destination: {accountNumber}</div>
              <div className="text-slate-400">KYC Status: <span className="text-emerald-400 font-bold">APPROVED (Tier 1 SME)</span></div>
              <div className="text-slate-400">Anchor Fee: {quote.feeUsdc} USDC</div>
            </div>

            <button
              onClick={handleConfirmKyc}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
            >
              Authorize Soroban Transfer & Cash Out <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <RefreshCw className="h-12 w-12 text-blue-400 animate-spin" />
            <h4 className="text-base font-bold text-white">Executing Soroban & Anchor Settlement</h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Releasing ${advanceUsdc.toLocaleString()} USDC from funding pool to anchor payout engine...
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Fiat Payout Completed!</h4>
              <p className="text-xs text-slate-300 mt-1">
                {localFiatPayout.toLocaleString(undefined, { maximumFractionDigits: 2 })} {quote.assetCode} dispatched to {accountNumber}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">SEP-24 Tx ID:</span>
                <span className="text-blue-400 font-bold">{sep24TxId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Anchor Partner:</span>
                <span className="text-slate-200">Stellar Regulated Rails ({quote.country})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Arrival:</span>
                <span className="text-emerald-400 font-bold">{quote.estimatedTime}</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-medium text-xs hover:bg-slate-700 transition-all"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
