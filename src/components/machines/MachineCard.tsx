import { Settings, FileText, FolderOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/Badge";

interface MachineCardProps {
  id: string;
  name: string;
  serialNumber: string;
  imageUrl?: string;
  hasNewDocuments?: boolean;
  documentCount?: number;
  isNew?: boolean;
}

export function MachineCard({
  id,
  name,
  serialNumber,
  imageUrl,
  hasNewDocuments = false,
  documentCount = 0,
  isNew = false,
}: MachineCardProps) {
  const navigate = useNavigate();

  const handleViewDocumentation = () => {
    navigate(`/documentation?machine=${id}&serial=${serialNumber}`);
  };

  const handleMachineClick = () => {
    navigate(`/machines/${id}`);
  };

  const handleSettings = () => {
    console.log('Settings clicked for', id);
    // Navigate to settings page or open settings modal
  };

  const handleArchive = () => {
    console.log('Archive/Folder clicked for', id);
    // Navigate to archive/files page
  };

  return (
    <div className="group relative flex w-full flex-col gap-3 sm:gap-4 rounded-lg border border-border bg-card p-4 sm:p-5 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer">
      {/* NEW Badge */}
      {isNew && (
        <Badge
          variant="new"
          className="absolute right-2 sm:right-3 top-2 sm:top-3 z-10 text-[9px] sm:text-[10px] px-1.5 sm:px-2"
        >
          NEW
        </Badge>
      )}

      {/* Machine Image */}
      <div
        onClick={handleMachineClick}
        className="flex h-[140px] sm:h-[160px] md:h-[180px] items-center justify-center overflow-hidden rounded-md"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground/20 w-full h-full">
            <svg
              className="w-3/4 h-3/4 max-w-md max-h-md"
              viewBox="0 0 200 100"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
            >
              <polygon points="50,10 150,10 100,90" />
              <text
                x="100"
                y="58"
                textAnchor="middle"
                stroke="white"
                strokeWidth="1.5"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                fontSize="48"
                fill="currentColor"
              >
                AMF
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Machine Info */}
      <div
        onClick={handleMachineClick}
        className="min-h-[50px] sm:min-h-[60px] text-center"
      >
        <h3 className="text-xs sm:text-sm font-bold leading-tight text-foreground uppercase tracking-wide line-clamp-2">
          {name}
        </h3>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground font-medium">
          {serialNumber}
        </p>
      </div>

      {/* Action Icons Row - 3 Icons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-1 sm:py-2">
        {/* Settings Icon */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            handleSettings();
          }}
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-border bg-background transition-all hover:border-destructive hover:bg-accent active:scale-95"
          aria-label="Machine settings"
          title="Machine settings"
        >
          <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
        </button> */}

        {/* Documentation Icon */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDocumentation();
          }}
          className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-md border-2 border-destructive bg-destructive transition-all hover:bg-destructive/90 hover:scale-105 active:scale-95"
          aria-label="View documentation"
          title="View documentation"
        >
          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          {documentCount > 0 && (
            <span className="absolute -right-0.5 sm:-right-1 -top-0.5 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary border-2 border-card text-[9px] sm:text-[10px] font-bold text-primary-foreground">
              {documentCount > 9 ? "9+" : documentCount}
            </span>
          )}
        </button> */}

        {/* Archive/Folder Icon */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            handleArchive();
          }}
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-border bg-background transition-all hover:border-destructive hover:bg-accent active:scale-95"
          aria-label="View files"
          title="View files"
        >
          <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5" />
        </button> */}
      </div>

      {/* Primary CTA Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleViewDocumentation();
        }}
        className="flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-md bg-destructive text-sm sm:text-base font-semibold text-white transition-all hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 shadow-md hover:shadow-lg active:scale-98"
      >
        <span className="hidden xs:inline">View Documentation</span>
        <span className="xs:hidden">View Docs</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
