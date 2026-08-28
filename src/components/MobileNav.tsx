import { Home, Clapperboard, Tv, Compass } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 z-50 flex justify-around items-center py-3 pb-6 text-gray-400">
      <div 
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${activeTab === 'home' ? 'text-white' : 'hover:text-white'}`}
        onClick={() => onTabChange('home')}
      >
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-medium">Home</span>
      </div>
      <div 
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${activeTab === 'ondemand' ? 'text-white' : 'hover:text-white'}`}
        onClick={() => onTabChange('ondemand')}
      >
        <Clapperboard className="w-6 h-6" />
        <span className="text-[10px] font-medium">On Demand</span>
      </div>
      <div 
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${activeTab === 'shows' ? 'text-white' : 'hover:text-white'}`}
        onClick={() => onTabChange('shows')}
      >
        <Tv className="w-6 h-6" />
        <span className="text-[10px] font-medium">Shows</span>
      </div>
      <div 
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${activeTab === 'discover' ? 'text-white' : 'hover:text-white'}`}
        onClick={() => onTabChange('discover')}
      >
        <Compass className="w-6 h-6" />
        <span className="text-[10px] font-medium">Discover</span>
      </div>
    </div>
  );
}
