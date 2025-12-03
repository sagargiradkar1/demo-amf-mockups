import { TrainingPlayer } from './TrainingPlayer';

interface TrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function TrainingModal({ isOpen, onClose, url, title }: TrainingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="h-[90vh] w-[95vw] max-w-[1600px] overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
        <TrainingPlayer
          url={url}
          title={title}
          onClose={onClose}
          isFullscreen={false}
        />
      </div>
    </div>
  );
}
