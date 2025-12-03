import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { MachineCard } from '../components/machines/MachineCard';
import { mockMachines } from '../data/mockData';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Filter machines based on search term
  const filteredMachines = mockMachines.filter(
    (machine) =>
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort machines based on selected criteria
  const sortedMachines = [...filteredMachines].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'serial':
        return a.serialNumber.localeCompare(b.serialNumber);
      case 'date':
        return new Date(b.installationDate).getTime() - new Date(a.installationDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6">
        {/* Breadcrumb */}
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
          <span className="text-destructive hover:underline cursor-pointer">Home</span>
          <span className="mx-1 sm:mx-2 text-muted-foreground">{'>'}</span>
          <span className="text-destructive hover:underline cursor-pointer">Parts</span>
          <span className="mx-1 sm:mx-2 text-muted-foreground">{'>'}</span>
          <span className="text-foreground">MyMachines</span>
        </div>

        {/* Page Header - Mobile */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          {/* Title and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              MY MACHINES
            </h1>
            
            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Parts Order Template Button */}
              <button className="bg-destructive text-destructive-foreground px-4 xl:px-6 py-2.5 rounded text-sm font-semibold hover:bg-destructive/90 transition-colors uppercase tracking-wide shadow-sm whitespace-nowrap">
                PARTS ORDER TEMPLATE
              </button>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-border bg-background px-3 xl:px-4 py-2.5 text-sm font-medium focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 cursor-pointer"
              >
                <option value="name">Sort by</option>
                <option value="name">Machine Name</option>
                <option value="serial">Serial Number</option>
                <option value="date">Installation Date</option>
              </select>

              {/* Search Input */}
              <div className="relative w-64 xl:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search machines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 w-full rounded-md border border-border bg-background pl-10 pr-4 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border-2 border-border hover:border-destructive transition-colors text-sm font-semibold"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters & Search
            </button>
          </div>

          {/* Mobile Search and Filters */}
          {showFilters && (
            <div className="lg:hidden space-y-3 p-4 border border-border rounded-lg bg-card animate-slide-down">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Filters & Search
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-accent rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search machines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-4 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
                />
              </div>

              {/* Sort By Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-base font-medium focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 cursor-pointer"
                >
                  <option value="name">Machine Name</option>
                  <option value="serial">Serial Number</option>
                  <option value="date">Installation Date</option>
                </select>
              </div>

              {/* Parts Order Template Button - Mobile */}
              <button className="w-full bg-destructive text-destructive-foreground px-4 py-3 rounded-md text-base font-semibold hover:bg-destructive/90 transition-colors uppercase tracking-wide shadow-sm">
                PARTS ORDER TEMPLATE
              </button>
            </div>
          )}

          {/* Tablet Search Bar (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center gap-3 mt-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search machines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-4 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
              />
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 cursor-pointer"
            >
              <option value="name">Sort by</option>
              <option value="name">Machine Name</option>
              <option value="serial">Serial Number</option>
              <option value="date">Installation Date</option>
            </select>

            {/* Parts Button */}
            <button className="bg-destructive text-destructive-foreground px-5 py-2.5 rounded text-sm font-semibold hover:bg-destructive/90 transition-colors uppercase tracking-wide shadow-sm whitespace-nowrap">
              Parts Template
            </button>
          </div>
        </div>

        {/* Active Search Indicator */}
        {searchTerm && (
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Searching for:</span>
            <span className="font-semibold text-foreground bg-muted px-2 py-1 rounded">
              {searchTerm}
            </span>
            <button
              onClick={() => setSearchTerm('')}
              className="ml-1 text-destructive hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Machine Grid */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {sortedMachines.map((machine, index) => (
            <div
              key={machine.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MachineCard
                id={machine.id}
                name={machine.name}
                serialNumber={machine.serialNumber}
                imageUrl={machine.imageUrl}
                isNew={machine.isNew}
                documentCount={machine.documentCount}
                hasNewDocuments={machine.isNew}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedMachines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
            <div className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-muted-foreground/20">
              AMF
            </div>
            <p className="text-base sm:text-lg font-medium text-muted-foreground">
              No machines found
            </p>
            <p className="mt-2 text-sm text-muted-foreground text-center px-4">
              Try adjusting your search criteria
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-sm text-destructive hover:underline font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        {sortedMachines.length > 0 && (
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground">
            Showing {sortedMachines.length} of {mockMachines.length} machines
          </div>
        )}
      </div>
    </Layout>
  );
}
