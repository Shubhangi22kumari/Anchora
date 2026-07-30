'use client';

import React, { useState } from 'react';
import { X, Star, MessageSquare, CheckCircle2, Download } from 'lucide-react';
import { saveFeedbackEntry, getFeedbackEntries } from '../lib/analytics';
import { FeedbackEntry } from '../lib/types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(5);
  const [usabilityScore, setUsabilityScore] = useState(9);
  const [userRole, setUserRole] = useState('SME Exporter');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>(getFeedbackEntries());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    saveFeedbackEntry({
      userRole,
      rating,
      usabilityScore,
      comments
    });

    setSubmitted(true);
    setFeedbackList(getFeedbackEntries());

    setTimeout(() => {
      setSubmitted(false);
      setComments('');
      onClose();
    }, 1500);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(feedbackList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "anchora_user_feedback_summary.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121826] border border-slate-800 p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Level 4 User Feedback Portal
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Mandatory</span>
              </h3>
              <p className="text-xs text-slate-400">Collect real user testing feedback & usability evaluations</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-base font-bold text-white">Feedback Submitted!</h4>
            <p className="text-xs text-slate-300">Thank you for validating Anchora's trade finance platform.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Role / Persona</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-slate-200 focus:border-purple-500 focus:outline-none"
                >
                  <option value="SME Exporter (Kenya)">SME Exporter (Kenya)</option>
                  <option value="SME Supplier (Philippines)">SME Supplier (Philippines)</option>
                  <option value="Yield Liquidity Provider">Yield Liquidity Provider</option>
                  <option value="Trade Auditor / Verifier">Trade Auditor / Verifier</option>
                  <option value="Stellar Ecosystem Reviewer">Stellar Ecosystem Reviewer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Overall Product Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>UX & Onboarding Ease Score</span>
                  <span className="text-purple-400 font-bold">{usabilityScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={usabilityScore}
                  onChange={(e) => setUsabilityScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">User Feedback & Validation Notes</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience regarding SEP-24 off-ramping, Soroban settlement speed, or UI usability..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 transition-all"
                >
                  <Download className="h-3.5 w-3.5" /> Export All Feedback JSON
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-600/20"
                >
                  Submit Feedback
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-3 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-300">Collected Onboarded User Feedback ({feedbackList.length})</h4>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {feedbackList.map((item) => (
                  <div key={item.id} className="rounded-xl bg-slate-900/80 border border-slate-800 p-2.5 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-purple-300">{item.userRole}</span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400" /> {item.rating}/5
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px] italic">"{item.comments}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
