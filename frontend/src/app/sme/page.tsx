'use client';

import React, { useState } from 'react';
import { Plus, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { Invoice, SMEReputation } from '../../lib/types';
import { INITIAL_INVOICES } from '../../lib/mockData';
import { InvoiceUploadModal } from '../../components/InvoiceUploadModal';
import { SEP24AnchorModal } from '../../components/SEP24AnchorModal';
import { ReputationCard } from '../../components/ReputationCard';

export default function SMEPortalPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isSep24Open, setIsSep24Open] = useState(false);

  const smeReputation: SMEReputation = {
    address: 'GDQK...9X2A',
    name: 'Nairobi Fresh Produce Exports',
    country: 'Kenya',
    score: 825,
    tier: 'A',
    totalInvoices: 12,
    fulfilledOnTime: 12,
    defaultedCount: 0,
    totalVolumeFunded: 48500,
    recommendedDiscountBps: 800
  };

  const handleInvoiceCreated = (newInv: Invoice) => {
    setInvoices([newInv, ...invoices]);
  };

  const handleOpenSep24 = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsSep24Open(true);
  };

  const handleSep24Success = (invId: string) => {
    setInvoices(invoices.map(inv => inv.id === invId ? { ...inv, status: 'Funded' } : inv));
  };

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Zap className="h-4 w-4" /> SME WORKING CAPITAL DASHBOARD
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Nairobi Fresh Produce Exports</h1>
          <p className="text-xs text-slate-400">Manage receivables, tokenize invoices, and cash out to local KES M-Pesa</p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="h-4 w-4" /> Tokenize New Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ReputationCard reputation={smeReputation} />
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="rounded-2xl glass-card p-5 border border-slate-800">
            <div className="text-xs text-slate-400">Total Receivables Tokenized</div>
            <div className="text-2xl font-bold text-white mt-1">
              ${invoices.reduce((acc, inv) => acc + inv.amount, 0).toLocaleString()} USDC
            </div>
            <div className="text-xs text-slate-400 mt-2">{invoices.length} Total Invoices</div>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-slate-800">
            <div className="text-xs text-slate-400">Early Advance Cash-Out Limit</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">$50,000 USDC</div>
            <div className="text-xs text-emerald-300/80 mt-2">Tier A Credit Approval</div>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-slate-800">
            <div className="text-xs text-slate-400">Funded & Cashed Out</div>
            <div className="text-2xl font-bold text-blue-400 mt-1">
              ${invoices.filter(i => i.status === 'Funded' || i.status === 'Repaid').reduce((a, b) => a + b.amount, 0).toLocaleString()} USDC
            </div>
            <div className="text-xs text-slate-400 mt-2">Via SEP-24 M-Pesa Rails</div>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-slate-800">
            <div className="text-xs text-slate-400">Active Pending Invoices</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {invoices.filter(i => i.status === 'Pending' || i.status === 'Verified').length}
            </div>
            <div className="text-xs text-slate-400 mt-2">Ready for Early Advance</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Your Receivables & Invoices</h3>
            <p className="text-xs text-slate-400">Soroban on-chain tokenized invoice claims</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Invoice ID</th>
                <th className="py-3 px-3">Buyer / Debtor</th>
                <th className="py-3 px-3">Amount (USDC)</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Discount BPS</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action / Off-Ramp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-white">{inv.id}</td>
                  <td className="py-3.5 px-3 text-slate-200">
                    <div>{inv.buyerName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{inv.buyerId}</div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-100">${inv.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-slate-300">{inv.dueDate}</td>
                  <td className="py-3.5 px-3 text-amber-400 font-mono">{(inv.discountRateBps / 100).toFixed(2)}%</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'Verified'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : inv.status === 'Funded'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : inv.status === 'Repaid'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {inv.status === 'Verified' ? (
                      <button
                        onClick={() => handleOpenSep24(inv)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-md hover:bg-emerald-500 transition-all"
                      >
                        Request Advance & Off-Ramp <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    ) : inv.status === 'Funded' ? (
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-end gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Advance Dispatched
                      </span>
                    ) : inv.status === 'Repaid' ? (
                      <span className="text-[11px] text-purple-400 font-medium">Fully Settled</span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Pending Admin Audit</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onInvoiceCreated={handleInvoiceCreated}
      />

      <SEP24AnchorModal
        isOpen={isSep24Open}
        onClose={() => setIsSep24Open(false)}
        invoice={selectedInvoice}
        onSuccess={handleSep24Success}
      />

    </div>
  );
}
