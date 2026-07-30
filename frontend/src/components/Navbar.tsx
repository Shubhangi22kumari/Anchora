'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, ShieldCheck, FileText, TrendingUp, Cpu, MessageSquare, ExternalLink, Zap } from 'lucide-react';
import { generateRandomWallet } from '../lib/stellar';
import { logAnalyticsEvent } from '../lib/analytics';

interface NavbarProps {
  onOpenFeedback: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFeedback }) => {
  const pathname = usePathname();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState<boolean>(false);

  const handleConnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      const demoWallet = generateRandomWallet();
      setWalletAddress(demoWallet.address);
      setIsConnecting(false);
      logAnalyticsEvent('Wallet Connected', 'WALLET_CONNECT', { address: demoWallet.address });
    }, 600);
  };

  const navLinks = [
    { name: 'Overview', href: '/', icon: FileText },
    { name: 'SME Portal', href: '/sme', icon: Zap },
    { name: 'Investor Pool', href: '/investor', icon: TrendingUp },
    { name: 'Verifier Admin', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B0E17]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ANCHORA <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">RWA</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider">STELLAR TRADE FINANCE</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Stellar Testnet
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFeedback}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
          >
            <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
            Feedback
          </button>

          {walletAddress ? (
            <div className="relative">
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium hover:border-slate-600 transition-all"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
              </button>

              {showWalletDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#121826] border border-slate-800 shadow-2xl p-3 z-50">
                  <div className="text-xs text-slate-400 mb-1">Connected Wallet</div>
                  <div className="text-xs font-mono text-slate-200 break-all bg-slate-900/80 p-2 rounded border border-slate-800 mb-3">
                    {walletAddress}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                    <span>Balance:</span>
                    <span className="font-semibold text-emerald-400">10,000.00 XLM</span>
                  </div>
                  <a
                    href={`https://stellar.expert/explorer/testnet/account/${walletAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1 w-full py-1.5 rounded bg-slate-800 text-xs text-blue-400 hover:bg-slate-700 transition-all mb-2"
                  >
                    View on Stellar Expert <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => {
                      setWalletAddress(null);
                      setShowWalletDropdown(false);
                    }}
                    className="w-full py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-all"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-md shadow-indigo-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95 disabled:opacity-50"
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? 'Connecting...' : 'Connect Stellar Wallet'}
            </button>
          )}
        </div>

      </div>

      <div className="lg:hidden flex items-center justify-around border-t border-slate-800/80 bg-[#0B0E17]/95 px-2 py-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-medium ${
                isActive ? 'text-blue-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
};
