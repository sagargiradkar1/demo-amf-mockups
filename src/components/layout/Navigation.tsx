import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, Bell, Menu, X, ChevronDown, User } from 'lucide-react';

const navItems = [
  { label: 'HOME', path: '/machines' },
  { label: 'DOCUMENTATION', path: '/documentation' },
  { label: 'TRAINING', path: '/training' },
  { label: 'SERVICE', path: '/service' },
];

export function Navigation() {
  const { unreadCount } = useNotifications();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-4 lg:px-6 h-14">
        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'px-4 lg:px-6 py-4 text-xs lg:text-sm font-semibold transition-colors hover:bg-destructive uppercase tracking-wide',
                  isActive ? 'bg-destructive' : ''
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Notification Bell */}
          <NavLink to="/notifications" className="relative group">
            <div className="p-2 rounded-md hover:bg-destructive/20 transition-colors">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold ring-2 ring-primary">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="relative group">
            <div className="p-2 rounded-md hover:bg-destructive/20 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold ring-2 ring-primary">
                0
              </span>
            </div>
          </NavLink>

          {/* User Welcome - Hidden on smaller desktops */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-primary-foreground/20">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">
              WELCOME, {user?.name.toUpperCase()}
            </span>
          </div>

          {/* User Initial on smaller desktops */}
          <div className="xl:hidden flex items-center justify-center h-9 w-9 rounded-full bg-destructive font-bold text-sm">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 h-14">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-destructive/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="text-sm font-semibold uppercase">Menu</span>
          </button>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <NavLink to="/notifications" className="relative p-2">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </NavLink>

            {/* Cart */}
            <NavLink to="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold">
                0
              </span>
            </NavLink>

            {/* User Avatar */}
            <NavLink to="/profile" className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive font-bold text-xs">
              {user?.name.charAt(0).toUpperCase()}
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-primary-foreground/20 bg-primary/95 backdrop-blur-sm animate-slide-down">
            <div className="px-4 py-3 space-y-1">
              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-md bg-destructive/20">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive font-bold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    {user?.name.toUpperCase()}
                  </div>
                  <div className="text-xs opacity-80">{user?.email}</div>
                </div>
              </div>

              {/* Nav Links */}
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors uppercase tracking-wide',
                      isActive 
                        ? 'bg-destructive' 
                        : 'hover:bg-destructive/20'
                    )
                  }
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </NavLink>
              ))}

              {/* Additional Mobile Links */}
              <NavLink
                to="/notifications"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold hover:bg-destructive/20 transition-colors uppercase tracking-wide"
              >
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-destructive px-2 text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </NavLink>

              {/* <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold hover:bg-destructive/20 transition-colors uppercase tracking-wide"
              >
                <span>Cart</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold">
                  0
                </span>
              </NavLink> */}
            </div>
          </div>
        )}
      </div>

      {/* Tablet Simplified View (optional alternative) */}
      {/* Uncomment if you want a different tablet layout
      <div className="hidden sm:flex md:hidden items-center justify-between px-4 h-14">
        <div className="flex items-center gap-1">
          {navItems.slice(0, 3).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'px-4 py-4 text-xs font-semibold transition-colors hover:bg-destructive uppercase',
                  isActive ? 'bg-destructive' : ''
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <ShoppingCart className="h-5 w-5" />
        </div>
      </div>
      */}
    </nav>
  );
}
