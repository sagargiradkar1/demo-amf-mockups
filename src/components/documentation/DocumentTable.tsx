import { useState, useMemo } from 'react';
import { Star, Download, FileText, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Document } from '../../data/types/types';
import { Badge } from '../ui/Badge';
import { getFileIcon } from '../../utils/fileIcons';
import { formatDate, parseDate } from '../../utils/date';

interface DocumentTableProps {
  documents: Document[];
  onToggleFavorite: (id: string) => void;
  onDownloadSelected: (documentIds: string[]) => void;
}

type SortField = 'filename' | 'serialNumber' | 'dateModified';
type SortDirection = 'asc' | 'desc' | null;

export function DocumentTable({
  documents,
  onToggleFavorite,
  onDownloadSelected,
}: DocumentTableProps) {
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const toggleSelectAll = () => {
    if (selectedDocs.size === documents.length) {
      setSelectedDocs(new Set());
    } else {
      setSelectedDocs(new Set(documents.map((doc) => doc.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedDocs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDocs(newSelected);
  };

  const handleDownload = () => {
    if (selectedDocs.size > 0) {
      onDownloadSelected(Array.from(selectedDocs));
      setSelectedDocs(new Set());
    }
  };

  // Handle column sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort documents
  const sortedDocuments = useMemo(() => {
    if (!sortField || !sortDirection) return documents;

    return [...documents].sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      if (sortField === 'dateModified') {
        aValue = parseDate(a.dateModified);
        bValue = parseDate(b.dateModified);
      } else {
        aValue = a[sortField].toLowerCase();
        bValue = b[sortField].toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [documents, sortField, sortDirection]);

  // Render sort icon
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="h-4 w-4 text-destructive" />;
    }
    return <ChevronDown className="h-4 w-4 text-destructive" />;
  };

  return (
    <div className="w-full">
      {/* Action Bar */}
      {selectedDocs.size > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-muted p-3 sm:p-4">
          <span className="text-sm font-medium">
            {selectedDocs.size} document{selectedDocs.size !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-white hover:bg-destructive/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Selected
          </button>
        </div>
      )}

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedDocs.size === documents.length && documents.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 cursor-pointer accent-destructive"
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('filename')}
              >
                <div className="flex items-center gap-2">
                  <span>Filename</span>
                  <SortIcon field="filename" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('serialNumber')}
              >
                <div className="flex items-center gap-2">
                  <span>Serial Number</span>
                  <SortIcon field="serialNumber" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('dateModified')}
              >
                <div className="flex items-center gap-2">
                  <span>Date</span>
                  <SortIcon field="dateModified" />
                </div>
              </th>
              <th className="w-24 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {sortedDocuments.map((doc) => {
              const FileIcon = getFileIcon(doc.fileType);
              return (
                <tr
                  key={doc.id}
                  className="hover:bg-accent transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDocs.has(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="h-4 w-4 cursor-pointer accent-destructive"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-5 w-5 text-destructive shrink-0" />
                      <span className="font-medium">{doc.filename}</span>
                      {doc.isNew && (
                        <Badge variant="new" className="text-[10px] px-2 py-0.5 shrink-0">
                          NEW
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {doc.serialNumber}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {formatDate(doc.dateModified)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(doc.id);
                        }}
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                        aria-label="Toggle favorite"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            doc.isFavorite
                              ? 'fill-destructive text-destructive'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Download', doc.id);
                        }}
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                        aria-label="Download document"
                      >
                        <Download className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {sortedDocuments.map((doc) => {
          const FileIcon = getFileIcon(doc.fileType);
          return (
            <div
              key={doc.id}
              className="rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedDocs.has(doc.id)}
                  onChange={() => toggleSelect(doc.id)}
                  className="h-4 w-4 cursor-pointer accent-destructive mt-1 shrink-0"
                />
                <FileIcon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{doc.filename}</h3>
                    {doc.isNew && (
                      <Badge variant="new" className="text-[9px] px-1.5 py-0.5 shrink-0">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{doc.serialNumber}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(doc.dateModified)}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(doc.id)}
                    className="p-2 hover:bg-muted rounded-md"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        doc.isFavorite
                          ? 'fill-destructive text-destructive'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-md">
                    <Download className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
