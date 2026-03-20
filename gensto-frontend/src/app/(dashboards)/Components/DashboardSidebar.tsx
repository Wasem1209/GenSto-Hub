'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, School, FileText, CheckSquare, 
  MessageSquare, Settings, LifeBuoy, BarChart3, Palette, 
  LogOut, Users, Bell, ClipboardList, Activity, Eye,
  LucideIcon, Briefcase, X
} from 'lucide-react';

type UserRole = 'regular' | 'admin' | 'instructor' | 'worker';

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  role?: UserRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const roleLinks: Record<UserRole, NavLink[]> = {
  regular: [
    { name: 'Dashboard', href: '/regular', icon: LayoutDashboard },
    { name: 'My School', href: '/regular/my-school', icon: School },
    { name: 'My Class', href: '/regular/my-class', icon: Users },
    { name: 'Assignment', href: '/regular/assignments', icon: FileText },
    { name: 'Tasks', href: '/regular/tasks', icon: CheckSquare },
    { name: 'Chat', href: '/regular/chat', icon: MessageSquare },
    { name: 'Settings', href: '/regular/settings', icon: Settings },
    { name: 'Support', href: '/regular/support', icon: LifeBuoy },
    { name: 'Report', href: '/regular/report', icon: BarChart3 },
    { name: 'Theme', href: '/regular/theme', icon: Palette },
  ],
  worker: [
    { name: 'Dashboard', href: '/worker', icon: LayoutDashboard },
    { name: 'Active Instructors', href: '/worker/instructors', icon: Users },
    { name: 'Active Users', href: '/worker/users', icon: Users },
    { name: 'Class', href: '/worker/class', icon: School },
    { name: 'Notifications', href: '/worker/notifications', icon: Bell },
    { name: 'Supports', href: '/worker/support', icon: LifeBuoy },
    { name: 'Enrollments', href: '/worker/enrollments', icon: ClipboardList },
    { name: 'Tasks', href: '/worker/tasks', icon: CheckSquare },
    { name: 'Chats', href: '/worker/chat', icon: MessageSquare },
    { name: 'Activities', href: '/worker/activities', icon: Activity },
    { name: 'Monitor Users', href: '/worker/monitor', icon: Eye },
    { name: 'Settings', href: '/worker/settings', icon: Settings },
    { name: 'Theme', href: '/worker/theme', icon: Palette },
  ],
  instructor: [
    { name: 'Dashboard', href: '/instructor', icon: LayoutDashboard },
    { name: 'Assignment', href: '/instructor/assignments', icon: FileText },
    { name: 'Tasks', href: '/instructor/tasks', icon: CheckSquare },
    { name: 'Class', href: '/instructor/class', icon: Users },
    { name: 'Schools', href: '/instructor/schools', icon: School },
    { name: 'Chats', href: '/instructor/chat', icon: MessageSquare },
    { name: 'Settings', href: '/instructor/settings', icon: Settings },
    { name: 'Theme', href: '/instructor/theme', icon: Palette },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Monitor Users', href: '/admin/users', icon: Eye },
    { name: 'Monitor Instructors', href: '/admin/instructors', icon: Users },
    { name: 'Monitor Workers', href: '/admin/workers', icon: Briefcase },
    { name: 'Enrollments', href: '/admin/enrollments', icon: ClipboardList },
    { name: 'Schools', href: '/admin/schools', icon: School },
    { name: 'Class', href: '/admin/class', icon: Users },
    { name: 'Chats', href: '/admin/chat', icon: MessageSquare },
    { name: 'Support', href: '/admin/support', icon: LifeBuoy },
    { name: 'Theme', href: '/admin/theme', icon: Palette },
  ],
};

export default function DashboardSidebar({ role = 'regular', isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const links = roleLinks[role] || roleLinks.regular;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1c23] text-white flex flex-col border-r border-gray-800 shrink-0
        transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          
          {/* BRAND LOGO AREA */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tighter text-white leading-none">
              IN
            </span>
            
            <svg 
              className="-mx-1 h-7 w-auto" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sidebarInanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <path 
                d="M50 15L90 85H10L50 15ZM50 42L65 70H35L50 42Z" 
                fill="url(#sidebarInanGradient)" 
                fillRule="evenodd"
              />
            </svg>

            <span className="text-2xl font-black tracking-tighter text-white leading-none">
              NST
            </span>
          </Link>
          
          {/* Close Button: Tablet & Mobile only */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}