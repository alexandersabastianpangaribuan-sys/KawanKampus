import React from 'react';
import { Home, ShoppingBag, Briefcase, Users, User, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
}) => {
  const items = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'market', label: 'Market', icon: ShoppingBag },
    { id: 'jasa', label: 'Jasa', icon: Briefcase },
    { id: 'komunitas', label: 'Komunitas', icon: Users },
    { 
      id: 'dashboard', 
      label: user.level === 'visitor' ? 'Masuk' : 'Profil', 
      icon: User, 
      action: user.level === 'visitor' ? onOpenAuth : undefined 
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-1.5 px-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors min-w-[56px] ${
                isActive
                  ? 'text-[#2563EB] font-semibold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                {item.id === 'dashboard' && user.verificationStatus === 'Terverifikasi' && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
