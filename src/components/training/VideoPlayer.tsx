import { useState } from 'react';
import { X, Play } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

export function VideoPlayer({ videoId, title, description, thumbnail }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Generate YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {/* Video Thumbnail Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-border bg-card shadow-lg hover:shadow-xl transition-all hover:border-destructive/50"
      >
        {/* Thumbnail Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive shadow-2xl transition-transform group-hover:scale-110">
              <Play className="h-10 w-10 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Duration Badge (optional) */}
          <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
            Video Tutorial
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-semibold text-base line-clamp-2 mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size="lg"
      >
        <div className="space-y-4">
          {/* Responsive Video Container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title={title}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {description && (
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
