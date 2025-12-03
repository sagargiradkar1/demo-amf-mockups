import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchType, setSearchType] = useState<'all' | 'machine' | 'serial' | 'customer'>('all');

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            searchType === 'machine'
              ? 'Search by machine name...'
              : searchType === 'serial'
              ? 'Search by serial number...'
              : searchType === 'customer'
              ? 'Search by customer LN...'
              : 'Search by Machine Name, Serial Number, Customer LN, or Keyword'
          }
          className="h-12 w-full rounded-md border border-border bg-background pl-12 pr-24 text-base transition-all focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {value && (
            <button
              onClick={() => onChange('')}
              className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              showFilters ? 'bg-destructive text-white' : 'text-muted-foreground hover:bg-accent'
            }`}
            aria-label="Toggle filters"
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search Filters */}
      {showFilters && (
        <div className="rounded-md border border-border bg-card p-4 shadow-sm animate-fade-in">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Search By:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchType('all')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                searchType === 'all'
                  ? 'bg-destructive text-white'
                  : 'border border-border bg-background hover:bg-accent'
              }`}
            >
              All Fields
            </button>
            <button
              onClick={() => setSearchType('machine')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                searchType === 'machine'
                  ? 'bg-destructive text-white'
                  : 'border border-border bg-background hover:bg-accent'
              }`}
            >
              Machine Name
            </button>
            <button
              onClick={() => setSearchType('serial')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                searchType === 'serial'
                  ? 'bg-destructive text-white'
                  : 'border border-border bg-background hover:bg-accent'
              }`}
            >
              Serial Number
            </button>
            <button
              onClick={() => setSearchType('customer')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                searchType === 'customer'
                  ? 'bg-destructive text-white'
                  : 'border border-border bg-background hover:bg-accent'
              }`}
            >
              Customer LN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
