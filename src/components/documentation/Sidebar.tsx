import { Mail, Star, Clock, X } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { mockDocuments } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/date';
import { getFileIcon } from '../../utils/fileIcons';

interface SidebarProps {
  onSubscribeClick: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ onSubscribeClick, onClose, isMobile = false }: SidebarProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const { recentDocuments } = useRecentlyViewed();

  const favoriteDocuments = mockDocuments.filter((doc) =>
    favorites.includes(doc.id)
  );

  const sidebarClasses = isMobile 
    ? "w-full space-y-4 sm:space-y-5" 
    : "w-80 xl:w-96 shrink-0 space-y-4 lg:space-y-6";

  return (
    <aside className={sidebarClasses}>
      {/* Register for Updates Widget */}
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-3 sm:mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 shrink-0">
            <Mail className="h-5 w-5 text-destructive" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Register for Updates
          </h3>
        </div>
        <p className="mb-3 sm:mb-4 text-sm leading-relaxed text-muted-foreground">
          Get notified when new documentation is available for your machines.
        </p>
        <button
          onClick={onSubscribeClick}
          className="w-full rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:border-destructive"
        >
          Subscribe
        </button>
      </div>

      {/* Favorites Widget */}
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 shrink-0">
              <Star className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Favorites
            </h3>
          </div>
          {favoriteDocuments.length > 0 && (
            <span className="text-xs font-semibold text-muted-foreground">
              {favoriteDocuments.length}
            </span>
          )}
        </div>
        {favoriteDocuments.length > 0 ? (
          <div className="space-y-1">
            {favoriteDocuments.slice(0, 5).map((doc) => {
              const IconComponent = getFileIcon(doc.fileType);
              return (
                <div
                  key={doc.id}
                  className="group flex items-center gap-2.5 rounded-md p-2 transition-colors hover:bg-accent cursor-pointer"
                >
                  <IconComponent className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate text-sm">{doc.filename}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(doc.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              );
            })}
            {favoriteDocuments.length > 5 && (
              <button className="w-full pt-2 text-xs text-destructive hover:underline font-medium">
                View all {favoriteDocuments.length} favorites →
              </button>
            )}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Star className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">No favorites yet</p>
            <p className="mt-1 text-xs text-muted-foreground px-2">
              Click the star icon on any document to save it here
            </p>
          </div>
        )}
      </div>

      {/* Recently Viewed Widget */}
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-3 sm:mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 shrink-0">
            <Clock className="h-5 w-5 text-destructive" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Recently Viewed
          </h3>
        </div>
        {recentDocuments.length > 0 ? (
          <div className="space-y-1">
            {recentDocuments.slice(0, 5).map((doc) => {
              const IconComponent = getFileIcon(doc.fileType);
              return (
                <div
                  key={doc.id}
                  className="flex items-start gap-2.5 rounded-md p-2 transition-colors hover:bg-accent cursor-pointer"
                >
                  <IconComponent className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{doc.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(doc.viewedAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Clock className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">No recent documents</p>
            <p className="mt-1 text-xs text-muted-foreground px-2">
              Documents viewed in the last 10 days will appear here
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
