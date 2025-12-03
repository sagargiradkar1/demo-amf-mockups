import { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { unreadCount } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background shadow-sm">
        <div className="flex h-full items-center justify-between px-3 sm:px-4 md:px-6">
          {/* Left Section - Logo & Location */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* AMF Logo */}
            <Link to="/machines" className="flex items-center shrink-0">
              <img 
                src="/amf-logo.png" 
                alt="AMF Bakery Systems" 
                className="h-8 sm:h-10 w-auto object-contain hover:opacity-80 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'text-xl sm:text-2xl font-bold text-destructive';
                  fallback.textContent = 'AMF';
                  e.currentTarget.parentElement?.appendChild(fallback);
                }}
              />
            </Link>
            
            {/* Location Dropdown - Hidden on mobile */}
            <select className="hidden md:block min-w-[200px] lg:min-w-[280px] rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20">
              <option>Alpha Baking Co. - Lyndale Plant-Chicago</option>
              <option>Beta Foods - Main Facility</option>
              <option>Gamma Bakery - Production Site</option>
            </select>
          </div>

          {/* Center Search - Desktop */}
          <form 
            onSubmit={handleSearch} 
            className="hidden lg:flex relative w-full max-w-[600px] mx-4"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="h-10 w-full rounded-md border border-border bg-background pl-12 pr-4 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
            />
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Print Icon - Hidden on mobile */}
            {/* <button 
              className="hidden sm:flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-md transition-colors hover:bg-accent"
              aria-label="Print"
              onClick={() => window.print()}
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button> */}

            {/* Notification Bell */}
            {/* <button 
              className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-md transition-colors hover:bg-accent"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5 md:h-6 md:w-6" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 md:right-2 md:top-2 flex h-4 min-w-[16px] md:h-5 md:min-w-[20px] items-center justify-center rounded-full border-2 border-background bg-destructive px-1 text-[10px] md:text-[11px] font-semibold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button> */}

            {/* Desktop Links - Hidden on mobile/tablet */}
            <Link 
              to="/support" 
              className="hidden lg:block text-sm font-semibold uppercase tracking-wide hover:text-destructive transition-colors whitespace-nowrap"
            >
              Support
            </Link>
            <Link 
              to="/profile" 
              className="hidden xl:block text-sm font-semibold uppercase tracking-wide hover:text-destructive transition-colors whitespace-nowrap"
            >
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="hidden md:block rounded-md border border-border px-3 lg:px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-accent hover:border-destructive whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border bg-background p-3 lg:hidden animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="h-11 w-full rounded-md border border-border bg-background pl-11 pr-4 text-base focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20"
              />
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-64 border-r border-border bg-background shadow-xl lg:hidden animate-slide-in-left">
            <div className="flex h-full flex-col p-4">
              {/* Location Selector - Mobile */}
              <div className="mb-6">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Location
                </label>
                <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20">
                  <option>Alpha Baking Co. - Lyndale Plant</option>
                  <option>Beta Foods - Main Facility</option>
                  <option>Gamma Bakery - Production Site</option>
                </select>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 space-y-2">
                <Link
                  to="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-12 items-center rounded-md px-4 text-base font-medium hover:bg-accent transition-colors"
                >
                  Support
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-12 items-center rounded-md px-4 text-base font-medium hover:bg-accent transition-colors"
                >
                  Profile
                </Link>
                {/* <button
                  onClick={() => window.print()}
                  className="flex w-full h-12 items-center rounded-md px-4 text-base font-medium hover:bg-accent transition-colors text-left sm:hidden"
                >
                  Print
                </button> */}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-base font-semibold text-destructive hover:bg-destructive hover:text-white transition-colors"
              >
                Logout
              </button>

              {/* User Info */}
              {user && (
                <div className="mt-4 rounded-md border border-border bg-muted/50 p-3 text-xs">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
