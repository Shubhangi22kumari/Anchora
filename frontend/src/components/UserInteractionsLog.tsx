'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Database, Search } from 'lucide-react';
import { getLocalInteractions } from '../lib/stellar';
import { UserInteraction } from '../lib/types';

export const UserInteractionsLog: React.FC = () => {
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  useEffect(() => {
    setInteractions(getLocalInteractions());
  }, []);

  const filtered = interactions.filter((item) => {
    const matchesSearch =
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || item.userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="rounded-2xl glass-card p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Proof of 10+ Wallet Interactions
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
                Level 4 Mandatory ({interactions.length} Total Logs)
              </span>
            </h3>
            <p className="text-xs text-slate-400">Verifiable Stellar Soroban testnet ledger transaction hashes</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search tx hash / SME..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none w-44"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="SME">SME</option>
            <option value="Investor">Investor</option>
            <option value="Verifier/Oracle">Verifier/Oracle</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Tx Hash & Ledger</th>
              <th className="py-2.5 px-3">Role</th>
              <th className="py-2.5 px-3">Contract Method / Action</th>
              <th className="py-2.5 px-3">Details</th>
              <th className="py-2.5 px-3">Timestamp</th>
              <th className="py-2.5 px-3 text-right">Explorer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3">
                  <div className="font-mono text-blue-400 font-medium">
                    {tx.txHash.slice(0, 8)}...{tx.txHash.slice(-6)}
                  </div>
                  <div className="text-[10px] text-slate-500">Ledger #{tx.ledger}</div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.userRole === 'SME'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : tx.userRole === 'Investor'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {tx.userRole}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-slate-200 font-semibold">
                  {tx.action}
                </td>
                <td className="py-3 px-3 text-slate-300 max-w-xs truncate">
                  {tx.details}
                </td>
                <td className="py-3 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                  {tx.timestamp}
                </td>
                <td className="py-3 px-3 text-right">
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Verify <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
