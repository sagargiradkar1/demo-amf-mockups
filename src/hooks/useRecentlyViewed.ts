import { useState, useEffect } from 'react';
import { RecentDocument } from '../types';

const MAX_RECENT_ITEMS = 10;

export function useRecentlyViewed() {
  const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>(() => {
    const stored = localStorage.getItem('amf-recent-documents');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('amf-recent-documents', JSON.stringify(recentDocuments));
  }, [recentDocuments]);

  const addRecentDocument = (doc: Omit<RecentDocument, 'viewedAt'>) => {
    setRecentDocuments(prev => {
      const filtered = prev.filter(d => d.id !== doc.id);
      const newRecent: RecentDocument = {
        ...doc,
        viewedAt: new Date().toISOString(),
      };
      return [newRecent, ...filtered].slice(0, MAX_RECENT_ITEMS);
    });
  };

  return { recentDocuments, addRecentDocument };
}
