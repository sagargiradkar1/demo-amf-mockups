import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('amf-favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('amf-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (documentId: string) => {
    setFavorites(prev =>
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const isFavorite = (documentId: string) => favorites.includes(documentId);

  return { favorites, toggleFavorite, isFavorite };
}
