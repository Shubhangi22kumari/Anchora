'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { INITIAL_POOL_STATS } from '../lib/mockData';
import { UserInteractionsLog } from '../components/UserInteractionsLog';

export default function HomePage() {
  return (
    <div className="space-y-12">
      
      <section className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 border border-slate-800/80 gradient-bg-stellar">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Zap className="h-3.5 w-3.5" />
            STELLAR SOROBAN RWA TRADE FINANCE
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Convert 30-90 Day Invoices Into <span className="gradient-text">Instant Working Capital</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Anchora connects emerging market SME exporters holding verifiable buyer receivables with global DeFi liquidity pools. Powered by Soroban smart contracts and Stellar SEP-24 Anchor off-ramps (KES, PHP, NGN, BRL).
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/sme"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              Get Early Advance (SMEs) <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/investor"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm hover:border-blue-500/50 hover:text-white transition-all"
            >
              Supply Capital ({INITIAL_POOL_STATS.currentApy}% APY) <TrendingUp className="h-4 w-4 text-emerald-400" />
            </Link>
          </div>

        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Total Liquidity Pool</div>
          <div className="text-2xl font-bold text-white mt-1">${INITIAL_POOL_STATS.totalLiquidity.toLocaleString()} USDC</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +14.2% this month
          </div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Active Receivables Funded</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">${INITIAL_POOL_STATS.allocatedCapital.toLocaleString()} USDC</div>
          <div className="text-[11px] text-slate-400 mt-1">{INITIAL_POOL_STATS.activeInvoicesCount} Active SME Invoices</div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Real-World Asset APY</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{INITIAL_POOL_STATS.currentApy}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Uncorrelated Trade Yield</div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Avg Fiat Off-Ramp Time</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">&lt; 3 Mins</div>
          <div className="text-[11px] text-purple-300 mt-1">SEP-24 Anchor Rails</div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">How Anchora Works End-to-End</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            From off-chain invoice submission to Soroban smart contract tokenization and local fiat anchor payouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl glass-card p-5 space-y-3 border border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold font-mono">
              01
            </div>
            <h3 className="text-sm font-bold text-white">Invoice Tokenization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              SME uploads invoice & supporting documents. IPFS document hash is minted into <code className="text-blue-300 font-mono">invoice_registry</code> on Soroban.
            </p>
          </div>

          <div className="rounded-2xl glass-card p-5 space-y-3 border border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-bold font-mono">
              02
            </div>
            <h3 className="text-sm font-bold text-white">Risk Tier & Capital Allocation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-indigo-300 font-mono">reputation</code> contract computes credit score and sets discount rate. <code className="text-indigo-300 font-mono">funding_pool</code> dispatches advance.
            </p>
          </div>

          <div className="rounded-2xl glass-card p-5 space-y-3 border border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-bold font-mono">
              03
            </div>
            <h3 className="text-sm font-bold text-white">SEP-24 Anchor Cash Out</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              SME off-ramps USDC directly to local mobile money (M-Pesa, GCash) or bank account via Stellar regulated anchor rails.
            </p>
          </div>

          <div className="rounded-2xl glass-card p-5 space-y-3 border border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-bold font-mono">
              04
            </div>
            <h3 className="text-sm font-bold text-white">Waterfall Settlement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When buyer pays on due date, <code className="text-purple-300 font-mono">settlement</code> contract returns principal + yield to pool and pays residual margin to SME.
            </p>
          </div>
        </div>
      </section>

      <section>
        <UserInteractionsLog />
      </section>

    </div>
  );
}
