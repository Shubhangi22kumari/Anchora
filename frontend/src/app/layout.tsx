'use client';

import React, { useState } from 'react';
import '../styles/globals.css';
import { Navbar } from '../components/Navbar';
import { FeedbackModal } from '../components/FeedbackModal';
import { AnalyticsTracker } from '../components/AnalyticsTracker';
import { Cpu, ExternalLink } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Anchora | Cross-Border RWA Invoice Factoring on Stellar</title>
        <meta name="description" content="Soroban-powered real-world trade finance and invoice factoring platform with SEP-24 anchor fiat rails for emerging market SMEs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-[#0B0E17] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        
        <Navbar onOpenFeedback={() => setIsFeedbackOpen(true)} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {children}
        </main>

        <footer className="border-t border-slate-800/80 bg-[#070A10] py-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-200">Anchora RWA Factoring</span>
              <span className="text-slate-600">|</span>
              <span>Level 4 Green Belt Stellar Production MVP</span>
            </div>

            <div className="flex items-center gap-4">
              <AnalyticsTracker />
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="hover:text-purple-400 transition-colors underline"
              >
                Feedback Portal
              </button>
              <a
                href="https://stellar.org/soroban"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                Powered by Soroban <ExternalLink className="h-3 w-3" />
              </a>
            </div>

          </div>
        </footer>

        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      </body>
    </html>
  );
}
