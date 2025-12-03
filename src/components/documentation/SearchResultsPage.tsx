import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { mockDocuments, mockMachines } from '../../data/mockData';
import { Search, X, Wrench, FileText, Link as LinkIcon, Package } from 'lucide-react';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  // Search across different categories
  const searchMachines = mockMachines.filter((machine) =>
    machine.name.toLowerCase().includes(query.toLowerCase()) ||
    machine.serialNumber.toLowerCase().includes(query.toLowerCase())
  );

  const searchDocuments = mockDocuments.filter((doc) =>
    doc.filename.toLowerCase().includes(query.toLowerCase()) ||
    doc.serialNumber.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/search');
  };

  const totalResults = searchMachines.length + searchDocuments.length;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground">
              Search results for "<span className="font-semibold">{query}</span>"
            </p>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Parts, Machines, Orders, Documents, Pages..."
              className="h-14 w-full rounded-lg border-2 border-border bg-background pl-12 pr-32 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
            />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-sm font-medium text-destructive hover:underline"
                >
                  Clear Results
                </button>
              )}
              <button
                type="submit"
                className="rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-white hover:bg-destructive/90"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {query && (
          <>
            {/* Results Summary */}
            <div className="mb-6 grid grid-cols-5 gap-4">
              {/* Machines */}
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Wrench className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase">
                  Machines
                </div>
                <div className="text-2xl font-bold">{searchMachines.length}</div>
              </div>

              {/* Parts */}
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase">
                  Parts
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>

              {/* Pages */}
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="rounded-full bg-purple-100 p-3">
                    <LinkIcon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase">
                  Pages
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>

              {/* Documents */}
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="rounded-full bg-blue-100 p-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase">
                  Documents
                </div>
                <div className="text-2xl font-bold">{searchDocuments.length}</div>
              </div>

              {/* Orders */}
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Package className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase">
                  Orders
                </div>
                <div className="text-2xl font-bold">0</div>
              </div>
            </div>

            {/* Results Sections */}
            {totalResults === 0 ? (
              <div className="py-20 text-center">
                <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
                <h3 className="mb-2 text-xl font-medium">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse our categories
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Machines Results */}
                {searchMachines.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
                      Machines
                    </h2>
                    <div className="space-y-2">
                      {searchMachines.map((machine) => (
                        <div
                          key={machine.id}
                          onClick={() => navigate(`/machines/${machine.id}`)}
                          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">{machine.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                SN: {machine.serialNumber}
                              </p>
                            </div>
                          </div>
                          <button className="text-sm text-destructive font-medium hover:underline">
                            View Details →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents Results */}
                {searchDocuments.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide">
                      Documents
                    </h2>
                    <div className="space-y-2">
                      {searchDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{doc.filename}</h3>
                                {doc.isNew && (
                                  <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {doc.serialNumber} • {doc.category}
                              </p>
                            </div>
                          </div>
                          <button className="text-sm text-destructive font-medium hover:underline">
                            View Document →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
