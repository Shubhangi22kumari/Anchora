'use client';

import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { Invoice } from '../lib/types';
import { addLocalInteraction } from '../lib/stellar';
import { logAnalyticsEvent } from '../lib/analytics';

interface InvoiceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated: (invoice: Invoice) => void;
}

export const InvoiceUploadModal: React.FC<InvoiceUploadModalProps> = ({
  isOpen,
  onClose,
  onInvoiceCreated,
}) => {
  const [smeName, setSmeName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerId, setBuyerId] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-30');
  const [corridor, setCorridor] = useState('KES');
  const [fileName, setFileName] = useState<string | null>(null);
  const [docHash, setDocHash] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const mockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setDocHash(mockHash);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newInv: Invoice = {
        id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
        smeName: smeName || 'Emerging Market Exporters Ltd',
        smeAddress: 'GDQK...9X2A',
        buyerName: buyerName || 'Global Retail Imports LLC',
        buyerId: buyerId || 'GLOBAL_IMPORT_US',
        country,
        currency: 'USDC',
        amount: parseFloat(amount),
        dueDate,
        discountRateBps: country === 'Philippines' ? 500 : country === 'Kenya' ? 800 : 1000,
        status: 'Pending',
        docHash: docHash || '0x7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f',
        anchorCorridor: corridor
      };

      addLocalInteraction({
        userAddress: newInv.smeAddress,
        userRole: 'SME',
        action: 'InvoiceRegistry.submit_invoice',
        status: 'SUCCESS',
        details: `Submitted Invoice ${newInv.id} ($${newInv.amount.toLocaleString()} USDC)`
      });

      logAnalyticsEvent('Submit Invoice', 'CONTRACT_CALL', { invoiceId: newInv.id, amount: newInv.amount });

      onInvoiceCreated(newInv);
      setIsSubmitting(false);
      setSuccessMsg(`Invoice ${newInv.id} successfully minted on Soroban Testnet!`);

      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121826] border border-slate-800 p-6 shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Tokenize New Invoice</h3>
              <p className="text-xs text-slate-400">Mint receivable claim on Soroban invoice registry</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white mb-1">Invoice Tokenized!</h4>
            <p className="text-xs text-slate-300">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">SME Exporter Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Nairobi Fresh Produce Exports"
                value={smeName}
                onChange={(e) => setSmeName(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Buyer / Debtor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EuroMarket BV"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Buyer ID / Reg Code</label>
                <input
                  type="text"
                  required
                  placeholder="EUROMKT_NL"
                  value={buyerId}
                  onChange={(e) => setBuyerId(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Amount (USDC)</label>
                <input
                  type="number"
                  required
                  step="100"
                  placeholder="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Payment Corridor</label>
                <select
                  value={corridor}
                  onChange={(e) => {
                    setCorridor(e.target.value);
                    if (e.target.value === 'KES') setCountry('Kenya');
                    if (e.target.value === 'PHP') setCountry('Philippines');
                    if (e.target.value === 'NGN') setCountry('Nigeria');
                    if (e.target.value === 'BRL') setCountry('Brazil');
                  }}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="KES">KES (Kenya)</option>
                  <option value="PHP">PHP (Philippines)</option>
                  <option value="NGN">NGN (Nigeria)</option>
                  <option value="BRL">BRL (Brazil)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Upload Invoice PDF / Bill of Lading</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500/50 bg-slate-900/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <UploadCloud className="h-6 w-6 text-blue-400 mb-1" />
                  <p className="text-xs text-slate-400">
                    {fileName ? <span className="text-emerald-400 font-medium">{fileName}</span> : 'Click or drag PDF invoice file'}
                  </p>
                </div>
                <input type="file" accept=".pdf,.png,.jpg" onChange={handleFileUpload} className="hidden" />
              </label>
              {docHash && (
                <div className="mt-1 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> IPFS Hash: {docHash.slice(0, 18)}...
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
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
                {isSubmitting ? 'Minting on Soroban...' : 'Mint & Submit Invoice'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
