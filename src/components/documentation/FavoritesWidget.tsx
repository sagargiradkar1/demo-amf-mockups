import { Star, FileText, X } from "lucide-react";
import { SidebarWidget } from "./SidebarWidget";
import { Button } from "@/components/ui/Button";

interface Favorite {
  id: string;
  name: string;
}

interface FavoritesWidgetProps {
  favorites: Favorite[];
  onRemove: (id: string) => void;
  onClick: (id: string) => void;
}

export function FavoritesWidget({ favorites, onRemove, onClick }: FavoritesWidgetProps) {
  return (
    <SidebarWidget icon={Star} title="Favorites">
      {favorites.length === 0 ? (
        <p className="text-sm text-muted-foreground">No favorites yet</p>
      ) : (
        <ul className="space-y-1">
          {favorites.map((fav) => (
            <li 
              key={fav.id} 
              className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent cursor-pointer"
              onClick={() => onClick(fav.id)}
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate text-sm text-sidebar-foreground">
                {fav.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(fav.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </SidebarWidget>
  );
}
