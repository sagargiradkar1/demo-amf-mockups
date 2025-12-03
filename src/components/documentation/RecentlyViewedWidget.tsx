import { Clock, FileText } from "lucide-react";
import { SidebarWidget } from "./SidebarWidget";
import { Button } from "@/components/ui/Button";

interface RecentItem {
  id: string;
  name: string;
  viewedAt: string;
}

interface RecentlyViewedWidgetProps {
  items: RecentItem[];
  onViewAll: () => void;
}

export function RecentlyViewedWidget({ items, onViewAll }: RecentlyViewedWidgetProps) {
  return (
    <SidebarWidget icon={Clock} title="Recently Viewed">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent items</p>
      ) : (
        <>
          <ul className="space-y-1">
            {items.slice(0, 5).map((item) => (
              <li 
                key={item.id} 
                className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent cursor-pointer"
              >
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm text-sidebar-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.viewedAt}</p>
                </div>
              </li>
            ))}
          </ul>
          {items.length > 5 && (
            <Button 
              variant="link" 
              className="mt-2 h-auto p-0 text-sm text-sidebar-primary"
              onClick={onViewAll}
            >
              View All
            </Button>
          )}
        </>
      )}
    </SidebarWidget>
  );
}
