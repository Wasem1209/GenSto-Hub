'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, School, FileText, CheckSquare, 
  MessageSquare, Settings, LifeBuoy, Palette, 
  LogOut, Users, Bell, ClipboardList, Eye,
  LucideIcon, Briefcase, X
} from 'lucide-react';

type UserRole = 'regular' | 'admin' | 'admins' | 'instructor' | 'instructors' | 'worker' | 'workers';

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

const roleLinks: Record<string, NavLink[]> = {
  regular: [
    { name: 'Dashboard', href: '/regular', icon: LayoutDashboard },
    { name: 'My School', href: '/regular/my-school', icon: School },
    { name: 'My Class', href: '/regular/my-class', icon: Users },
    { name: 'Assignment', href: '/regular/assignments', icon: FileText },
    { name: 'Settings', href: '/regular/settings', icon: Settings },
    { name: 'Support', href: '/regular/support', icon: LifeBuoy },
  ],
  workers: [
    { name: 'Dashboard', href: '/workers', icon: LayoutDashboard },
    { name: 'Active Instructors', href: '/workers/instructors', icon: Users },
    { name: 'Active Users', href: '/workers/users', icon: Users },
    { name: 'Class', href: '/workers/class', icon: School },
    { name: 'Notifications', href: '/workers/notifications', icon: Bell },
    { name: 'Enrollments', href: '/workers/enrollments', icon: ClipboardList },
    { name: 'Tasks', href: '/workers/tasks', icon: CheckSquare },
    { name: 'Chats', href: '/workers/chat', icon: MessageSquare },
    { name: 'Monitor Users', href: '/workers/monitor', icon: Eye },
    { name: 'Settings', href: '/workers/settings', icon: Settings },
  ],
  instructors: [
    { name: 'Dashboard', href: '/instructors', icon: LayoutDashboard },
    { name: 'Assignment', href: '/instructors/assignments', icon: FileText },
    { name: 'Tasks', href: '/instructors/tasks', icon: CheckSquare },
    { name: 'Class', href: '/instructors/class', icon: Users },
    { name: 'Schools', href: '/instructors/schools', icon: School },
    { name: 'Chats', href: '/instructors/chat', icon: MessageSquare },
    { name: 'Settings', href: '/instructors/settings', icon: Settings },
    { name: 'Theme', href: '/instructors/theme', icon: Palette },
  ],
  admins: [
    { name: 'Dashboard', href: '/admins', icon: LayoutDashboard },
    { name: 'Monitor Users', href: '/admins/users', icon: Eye },
    { name: 'Monitor Instructors', href: '/admins/instructors', icon: Users },
    { name: 'Monitor Workers', href: '/admins/workers', icon: Briefcase },
    { name: 'Enrollments', href: '/admins/enrollments', icon: ClipboardList },
    { name: 'Schools', href: '/admins/schools', icon: School },
    { name: 'Class', href: '/admins/class', icon: Users },
    { name: 'Chats', href: '/admins/chat', icon: MessageSquare },
    { name: 'Support', href: '/admins/support', icon: LifeBuoy },
    { name: 'Theme', href: '/admins/theme', icon: Palette },
  ],
};

roleLinks.worker = roleLinks.workers;
roleLinks.admin = roleLinks.admins;
roleLinks.instructor = roleLinks.instructors;

export default function DashboardSidebar({ role = 'regular', isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const links = roleLinks[role] || roleLinks.regular;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
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
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tighter text-white leading-none">IN</span>
            <svg className="-mx-1 h-7 w-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sidebarInanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <path d="M50 15L90 85H10L50 15ZM50 42L65 70H35L50 42Z" fill="url(#sidebarInanGradient)" fillRule="evenodd" />
            </svg>
            <span className="text-2xl font-black tracking-tighter text-white leading-none">NST</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto scrollbar-hide">
          {links.map((link, index) => {
            const Icon = link.icon;
          
            // Fix: Check if current path is an exact match for the base role route 
            // otherwise check if it starts with the link href for sub-pages
            const isBaseRoute = ['/regular', '/workers', '/instructors', '/admins'].includes(link.href);
            const isActive = isBaseRoute ? pathname === link.href : pathname.startsWith(link.href);
            
            return (
              <Link 
                key={`${link.href}-${index}`} 
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
          <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-400 hover:bg-red-950/30 rounded-lg transition-colors">
            <LogOut size={18} />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}