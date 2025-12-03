import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [notifyTraining, setNotifyTraining] = useState(false);
  const [notifyDocumentation, setNotifyDocumentation] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing with:', { email, notifyTraining, notifyDocumentation });
    alert(`Subscribed successfully!\nEmail: ${email}\nTraining: ${notifyTraining}\nDocumentation: ${notifyDocumentation}`);
    onClose();
    // Reset form
    setEmail('');
    setNotifyTraining(false);
    setNotifyDocumentation(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Modal Container - Centered */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4 sticky top-0 z-10">
          <h2 className="text-xl sm:text-2xl font-bold">Register for Updates</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Stay informed about new documentation and training materials for your machines.
            </p>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Send Email Notifications to:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
                autoComplete="email"
                className="h-11 w-full rounded-md border border-border bg-background px-4 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
              />
            </div>

            {/* Notification Preferences */}
            <div>
              <label className="mb-3 block text-sm font-medium">
                Notification Preferences:
              </label>
              <div className="space-y-3">
                {/* Training Checkbox */}
                <label className="flex items-start gap-3 rounded-md border border-border p-4 cursor-pointer transition-colors hover:bg-accent hover:border-destructive/50">
                  <input
                    type="checkbox"
                    checked={notifyTraining}
                    onChange={(e) => setNotifyTraining(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-destructive mt-0.5 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1">Training Updates</div>
                    <div className="text-xs text-muted-foreground">
                      New training modules and educational content
                    </div>
                  </div>
                </label>

                {/* Documentation Checkbox */}
                <label className="flex items-start gap-3 rounded-md border border-border p-4 cursor-pointer transition-colors hover:bg-accent hover:border-destructive/50">
                  <input
                    type="checkbox"
                    checked={notifyDocumentation}
                    onChange={(e) => setNotifyDocumentation(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-destructive mt-0.5 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1">Documentation Updates</div>
                    <div className="text-xs text-muted-foreground">
                      Manuals, drawings, and technical documents
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer - Buttons */}
        <div className="border-t border-border bg-background px-6 py-4 sticky bottom-0">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!email || (!notifyTraining && !notifyDocumentation)}
              className="flex-1 h-11"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
