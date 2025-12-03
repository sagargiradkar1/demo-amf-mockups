import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { DocumentTable } from '../components/documentation/DocumentTable';
import { CategoryTabs } from '../components/documentation/CategoryTabs';
import { SearchBar } from '../components/documentation/SearchBar';
import { Sidebar } from '../components/documentation/Sidebar';
import { SubscribeModal } from '../components/documentation/SubscribeModal';
import { mockDocuments } from '../data/mockData';
import { DocumentCategory } from '../data/types/types';
import { useFavorites } from '../hooks/useFavorites';
import { X } from 'lucide-react';

// Helper function to check if document is new (< 3 months old)
const isDocumentNew = (uploadDate: string): boolean => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const docDate = new Date(uploadDate);
  return docDate >= threeMonthsAgo;
};

export default function DocumentationPage() {
  const [searchParams] = useSearchParams();
  const machineId = searchParams.get('machine');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('manuals');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Filter documents
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesCategory = doc.category === selectedCategory;
    const matchesMachine = !machineId || doc.machineId === machineId;
    const matchesSearch =
      searchTerm === '' ||
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesMachine && matchesSearch;
  });

  // Update favorites status and add isNew flag
  const documentsWithFavorites = filteredDocuments.map((doc) => ({
    ...doc,
    isFavorite: isFavorite(doc.id),
    isNew: isDocumentNew(doc.uploadDate), // Add isNew flag based on upload date
  }));

  const handleDownloadSelected = (documentIds: string[]) => {
    console.log('Downloading documents:', documentIds);
    alert(`Downloading ${documentIds.length} document(s)`);
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6 p-3 sm:p-4 md:p-6">
        {/* Left Sidebar - Desktop Only */}
        <div className="hidden lg:block">
          <Sidebar onSubscribeClick={() => setIsSubscribeModalOpen(true)} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Category Tabs - Scrollable on mobile */}
          <div className="overflow-x-auto scrollbar-hide -mx-3 sm:-mx-4 md:-mx-6 lg:mx-0">
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Search Bar */}
          <div className="my-4 sm:my-6">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Active Filters Display */}
          {(searchTerm || machineId) && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 sm:px-3 py-1.5">
                  <span className="font-medium">Search: {searchTerm}</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {machineId && (
                <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 sm:px-3 py-1.5">
                  <span className="font-medium">Machine filtered</span>
                </div>
              )}
            </div>
          )}

          {/* Document Table */}
          <div className="overflow-hidden">
            <DocumentTable
              documents={documentsWithFavorites}
              onToggleFavorite={toggleFavorite}
              onDownloadSelected={handleDownloadSelected}
            />
          </div>

          {/* Results Summary */}
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            {documentsWithFavorites.length} {documentsWithFavorites.length === 1 ? 'document' : 'documents'} found
          </div>

          {/* Mobile Sidebar - Shows at Bottom */}
          <div className="lg:hidden mt-8">
            <Sidebar isMobile onSubscribeClick={() => setIsSubscribeModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* Subscribe Modal - Rendered at Page Level */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </Layout>
  );
}
