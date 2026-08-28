import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
  onEnded?: () => void;
}

export default function VideoModal({ videoUrl, onClose, onEnded }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white z-50"
      >
        <X className="w-8 h-8" />
      </button>
      <div className="w-full max-w-5xl aspect-video px-4 animate-in fade-in zoom-in-95 duration-300">
        <video
          src={videoUrl}
          autoPlay
          controls
          onEnded={onEnded}
          className="w-full h-full rounded-lg shadow-2xl bg-black"
        />
      </div>
    </div>
  );
}
