import { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface TrainingPlayerProps {
  url: string;
  title: string;
  onClose?: () => void;
  isFullscreen?: boolean;
}

export function TrainingPlayer({ url, title, onClose, isFullscreen = false }: TrainingPlayerProps) {
  const [isFullScreen, setIsFullScreen] = useState(isFullscreen);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Handle ESC key to exit fullscreen
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullScreen]);

  const handleReload = () => {
    setKey(prev => prev + 1); // Force iframe reload
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to exit this training? Your progress may not be saved.')) {
      onClose?.();
    }
  };

  return (
    <div
      className={`
        ${isFullScreen 
          ? 'fixed inset-0 z-50 bg-background' 
          : 'relative w-full h-full'
        }
      `}
    >
      {/* Training Player Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <h3 className="font-semibold text-base">{title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Reload Button */}
          <button
            onClick={handleReload}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
            title="Restart Training"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
            title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullScreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          {/* Close Button */}
          {onClose && (
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-destructive hover:text-white transition-colors"
              title="Close Training"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Training Content iframe */}
      <div className={`
        ${isFullScreen ? 'h-[calc(100vh-57px)]' : 'h-[calc(100vh-200px)]'}
        w-full bg-muted
      `}>
        <iframe
          key={key}
          src={url}
          title={title}
          className="h-full w-full border-0"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
        />
      </div>

      {/* Progress/Info Bar (Optional) */}
      <div className="border-t border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Training in progress...</span>
          <span>Press ESC to exit fullscreen</span>
        </div>
      </div>
    </div>
  );
}
