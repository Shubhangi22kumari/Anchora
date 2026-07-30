'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Play } from 'lucide-react';
import { INITIAL_INVOICES } from '../../lib/mockData';
import { Invoice } from '../../lib/types';
import { addLocalInteraction } from '../../lib/stellar';
import { logAnalyticsEvent } from '../../lib/analytics';

export default function VerifierAdminPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(800);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const handleVerify = (invoiceId: string) => {
    setInvoices(invoices.map(inv => inv.id === invoiceId ? { ...inv, status: 'Verified', discountRateBps: selectedDiscount } : inv));
    
    addLocalInteraction({
      userAddress: 'GBTR...7K9P',
      userRole: 'Verifier/Oracle',
      action: 'InvoiceRegistry.verify_and_tokenize',
      status: 'SUCCESS',
      details: `Verified & tokenized ${invoiceId} with ${selectedDiscount} BPS discount`
    });

    logAnalyticsEvent('Verify Invoice', 'CONTRACT_CALL', { invoiceId, discountBps: selectedDiscount });
    setActionMsg(`Invoice ${invoiceId} verified and tokenized on Soroban testnet!`);
    setTimeout(() => setActionMsg(null), 2500);
  };

  const handleSimulateBuyerRepayment = (invoiceId: string) => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    setInvoices(invoices.map(i => i.id === invoiceId ? { ...i, status: 'Repaid' } : i));

    const advancePayout = inv.amount * (1 - inv.discountRateBps / 10000);
    const totalYield = inv.amount - advancePayout;
    const poolYield = totalYield * 0.8;
    const smeResidual = totalYield * 0.2;

    addLocalInteraction({
      userAddress: 'GBTR...7K9P',
      userRole: 'Verifier/Oracle',
      action: 'Settlement.process_repayment',
      status: 'SUCCESS',
      details: `Buyer repaid ${invoiceId} ($${inv.amount.toLocaleString()} USDC). Pool Principal: $${advancePayout.toLocaleString()} | Pool Yield: $${poolYield.toLocaleString()} | SME Residual: $${smeResidual.toLocaleString()}`
    });

    logAnalyticsEvent('Process Buyer Repayment', 'CONTRACT_CALL', { invoiceId, amount: inv.amount });
    setActionMsg(`Buyer settlement executed! Waterfall distributed for ${invoiceId}`);
    setTimeout(() => setActionMsg(null), 2500);
  };

  const pendingInvoices = invoices.filter(i => i.status === 'Pending');
  const fundedInvoices = invoices.filter(i => i.status === 'Funded' || i.status === 'Verified');

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <ShieldCheck className="h-4 w-4" /> TRADE AUDITOR & ORACLE PANEL
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Invoice Verification & Settlement Controller</h1>
          <p className="text-xs text-slate-400">Review off-chain IPFS document hashes, tokenize RWAs, and simulate buyer repayment oracle triggers</p>
        </div>

        {actionMsg && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium animate-fadeIn">
            <CheckCircle2 className="h-4 w-4" /> {actionMsg}
          </div>
        )}
      </div>

      <div className="rounded-2xl glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Pending Invoice Verification Queue
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                {pendingInvoices.length} Pending
              </span>
            </h3>
            <p className="text-xs text-slate-400">Verify buyer creditworthiness and approve on-chain Soroban tokenization</p>
          </div>
        </div>

        {pendingInvoices.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No pending invoices requiring manual verification. All submitted invoices are processed.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingInvoices.map((inv) => (
              <div key={inv.id} className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
                    {inv.id} <span className="text-xs font-sans text-slate-400">({inv.smeName})</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Buyer: <strong>{inv.buyerName}</strong> ({inv.buyerId}) | Amount: <strong>${inv.amount.toLocaleString()} USDC</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Doc IPFS Hash: {inv.docHash.slice(0, 24)}...
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <label className="block text-[10px] text-slate-400 mb-0.5">Discount Rate (BPS)</label>
                    <select
                      value={selectedDiscount}
                      onChange={(e) => setSelectedDiscount(parseInt(e.target.value))}
                      className="rounded-lg bg-slate-950 border border-slate-800 px-2 py-1 text-xs text-amber-400 focus:outline-none font-mono"
                    >
                      <option value={500}>500 BPS (5.00%)</option>
                      <option value={750}>750 BPS (7.50%)</option>
                      <option value={800}>800 BPS (8.00%)</option>
                      <option value={1000}>1000 BPS (10.00%)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleVerify(inv.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md hover:bg-blue-500 transition-all"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve & Tokenize
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Buyer Payment Oracle Simulator
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Trigger Settlement
              </span>
            </h3>
            <p className="text-xs text-slate-400">Simulate off-chain buyer payment arrival to trigger Soroban waterfall repayment distribution</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Invoice ID</th>
                <th className="py-3 px-3">SME & Country</th>
                <th className="py-3 px-3">Buyer ID</th>
                <th className="py-3 px-3">Invoice Amount</th>
                <th className="py-3 px-3">Discount BPS</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Oracle Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {fundedInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-white">{inv.id}</td>
                  <td className="py-3.5 px-3 text-slate-300">{inv.smeName} ({inv.country})</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{inv.buyerId}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-100">${inv.amount.toLocaleString()} USDC</td>
                  <td className="py-3.5 px-3 text-amber-400 font-mono">{(inv.discountRateBps / 100).toFixed(2)}%</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleSimulateBuyerRepayment(inv.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all"
                    >
                      <Play className="h-3 w-3 fill-white" /> Trigger Buyer Settlement
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
