import { Mail } from "lucide-react";
import { SidebarWidget } from "./SidebarWidget";
import { Button } from "@/components/ui/Button";

export function RegisterWidget() {
  return (
    <SidebarWidget icon={Mail} title="Register for Updates">
      <p className="mb-3 text-sm text-muted-foreground">
        Get notified when new documents are available for your machines.
      </p>
      <Button className="w-full" variant="secondary">
        Subscribe
      </Button>
    </SidebarWidget>
  );
}
