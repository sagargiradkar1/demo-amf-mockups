import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { mockTrainingModules } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { VideoPlayer } from '../components/training/VideoPlayer';
import { TrainingModal } from '../components/training/TrainingModal';
import { Play, BookOpen, Award, ExternalLink, Video, Monitor, Youtube, ChevronRight } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

export default function TrainingPage() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isRegistered] = useState(false);
  const [activeTraining, setActiveTraining] = useState<{
    url: string;
    title: string;
  } | null>(null);
  
  const premiumModule = mockTrainingModules.find((m) => m.type === 'premium');
  const basicModules = mockTrainingModules.filter((m) => m.type !== 'premium');

  const handlePremiumClick = () => {
    if (isRegistered) {
      const width = 1280;
      const height = 720;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      window.open(
        '/training/premium/index.html',
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );
    } else {
      setShowPremiumModal(true);
    }
  };

  const handleLaunchTraining = (module: typeof basicModules[0]) => {
    const width = 1280;
    const height = 720;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      module.url,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'computer-based':
        return Monitor;
      default:
        return Play;
    }
  };

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide mb-2 sm:mb-3">
            AMF Training Resources
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
            Enhance your team's expertise with comprehensive training programs
          </p>
        </div>

        {/* Overview Video Section */}
        {/* <div className="mb-6 sm:mb-8 md:mb-10 rounded-xl border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-destructive/20 shrink-0">
              <Youtube className="h-5 w-5 sm:h-7 sm:w-7 text-destructive" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                AMFMethod System Overview
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Watch this video to learn about documentation, training, and features
              </p>
            </div>
          </div>

          <VideoPlayer
            videoId="N6L197bEEPU"
            title="AMFMethod Bakery Equipment Documentation and Training Program"
            description="Learn how to access documentation, register for updates, search for equipment manuals, and explore our premium training offerings."
          />
        </div> */}

        {/* Two-Path Layout */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 mb-6 sm:mb-8 md:mb-10">
          {/* AMF Method Premium Training Card */}
          {premiumModule && (
            <div className="relative overflow-hidden rounded-xl border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/5 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
                <Badge className="bg-yellow-500 text-yellow-950 font-bold px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs">
                  PREMIUM
                </Badge>
              </div>

              <div className="mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-destructive/20 shadow-md">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-destructive" />
              </div>

              <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                AMF Method Premium Training
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Interactive training modules and in-depth knowledge articles
              </p>

              <ul className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-destructive shrink-0" />
                  <span className="font-medium">Interactive training modules</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-destructive shrink-0" />
                  <span className="font-medium">In-depth knowledge articles</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-destructive shrink-0" />
                  <span className="font-medium">Professional certification programs</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-destructive shrink-0" />
                  <span className="font-medium">Priority technical support</span>
                </li>
              </ul>

              <Button 
                className="w-full h-11 sm:h-12 text-sm sm:text-base font-bold uppercase tracking-wide shadow-md hover:shadow-lg"
                size="lg"
                onClick={handlePremiumClick}
              >
                {isRegistered ? 'Access Premium Content' : 'Schedule a Demo'}
                <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              {!isRegistered && (
                <p className="mt-3 text-center text-[10px] sm:text-xs text-muted-foreground">
                  Contact AMFtraining@amfbakery.com to register
                </p>
              )}
            </div>
          )}

          {/* Basic Training Materials Card */}
          <div className="rounded-xl border-2 border-border bg-card p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-secondary shadow-md">
              <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-foreground" />
            </div>

            <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              Basic Training Materials
            </h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Self-paced learning resources available anytime
            </p>

            <div className="space-y-3 sm:space-y-4">
              {basicModules.map((module) => {
                const IconComponent = getModuleIcon(module.type);
                
                return (
                  <div
                    key={module.id}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-lg border-2 border-border bg-background p-4 sm:p-5 hover:bg-accent hover:border-destructive/30 transition-all cursor-pointer"
                    onClick={() => handleLaunchTraining(module)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-destructive/10 group-hover:bg-destructive/20 transition-colors shrink-0">
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base">{module.title}</h3>
                        {module.duration && (
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Duration: {module.duration}
                          </p>
                        )}
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          Interactive web-based training
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      {module.isNew && (
                        <Badge variant="new" className="font-bold text-[9px] sm:text-[10px] px-1.5 sm:px-2">
                          NEW
                        </Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="font-semibold group-hover:bg-destructive group-hover:text-white group-hover:border-destructive transition-all text-xs sm:text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchTraining(module);
                        }}
                      >
                        Launch
                        <ExternalLink className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="rounded-xl border border-border bg-muted/50 p-4 sm:p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-destructive/10 shrink-0">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-base sm:text-lg font-semibold">
                Need Help Getting Started?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Contact our training support team at{' '}
                <a 
                  href="mailto:AMFtraining@amfbakery.com" 
                  className="font-semibold text-destructive hover:underline break-all"
                >
                  AMFtraining@amfbakery.com
                </a>{' '}
                for assistance with course registration and access.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Player Modal */}
      {activeTraining && (
        <TrainingModal
          isOpen={true}
          onClose={() => setActiveTraining(null)}
          url={activeTraining.url}
          title={activeTraining.title}
        />
      )}

      {/* Premium Demo Modal */}
      <Modal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        title="Schedule a Premium Training Demo"
        size="lg"
      >
        <div className="space-y-4 sm:space-y-5">
          <p className="text-sm sm:text-base text-muted-foreground">
            AMF Method Premium Training features interactive training modules and in-depth knowledge articles. Contact our team to schedule a personalized demo.
          </p>

          <div className="rounded-lg border border-border bg-muted/50 p-4 sm:p-6">
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Contact Information:</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Email:{' '}
              <a 
                href="mailto:AMFtraining@amfbakery.com" 
                className="text-destructive font-semibold hover:underline break-all"
              >
                AMFtraining@amfbakery.com
              </a>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Our training team will respond within 24 hours to schedule your demo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPremiumModal(false)}
              className="flex-1 w-full"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                window.location.href = 'mailto:AMFtraining@amfbakery.com?subject=Premium Training Demo Request';
                setShowPremiumModal(false);
              }}
              className="flex-1 w-full"
            >
              Send Email
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
