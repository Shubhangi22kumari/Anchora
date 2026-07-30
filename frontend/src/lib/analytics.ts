import { FeedbackEntry } from './types';
import { INITIAL_FEEDBACK } from './mockData';

export interface AnalyticsEvent {
  name: string;
  category: 'NAVIGATION' | 'CONTRACT_CALL' | 'SEP24_OFFRAMP' | 'FEEDBACK' | 'WALLET_CONNECT';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export function logAnalyticsEvent(name: string, category: AnalyticsEvent['category'], metadata?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const event: AnalyticsEvent = {
    name,
    category,
    timestamp: new Date().toISOString(),
    metadata
  };
  const stored = localStorage.getItem('anchora_analytics_events');
  const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
  events.push(event);
  localStorage.setItem('anchora_analytics_events', JSON.stringify(events.slice(-100)));
}

export function getFeedbackEntries(): FeedbackEntry[] {
  if (typeof window === 'undefined') return INITIAL_FEEDBACK;
  const stored = localStorage.getItem('anchora_feedback_list');
  if (!stored) {
    localStorage.setItem('anchora_feedback_list', JSON.stringify(INITIAL_FEEDBACK));
    return INITIAL_FEEDBACK;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_FEEDBACK;
  }
}

export function saveFeedbackEntry(entry: Omit<FeedbackEntry, 'id' | 'timestamp'>): FeedbackEntry {
  const current = getFeedbackEntries();
  const newEntry: FeedbackEntry = {
    ...entry,
    id: `FB-${(current.length + 1).toString().padStart(3, '0')}`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
  };
  const updated = [newEntry, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem('anchora_feedback_list', JSON.stringify(updated));
  }
  logAnalyticsEvent('Feedback Submitted', 'FEEDBACK', { rating: entry.rating, role: entry.userRole });
  return newEntry;
}
