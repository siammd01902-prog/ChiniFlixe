import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#141414] text-gray-400 py-10 px-4 md:px-12 mt-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6 mb-6">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Instagram className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Twitter className="w-6 h-6 cursor-pointer hover:text-white transition" />
          <Youtube className="w-6 h-6 cursor-pointer hover:text-white transition" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          <a href="#" className="hover:underline">Audio Description</a>
          <a href="#" className="hover:underline">Help Centre</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Media Centre</a>
          <a href="#" className="hover:underline">Investor Relations</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Legal Notices</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        
        <button className="border border-gray-400 text-gray-400 px-4 py-2 hover:text-white hover:border-white transition mb-6 text-sm">
          Service Code
        </button>
        
        <p className="text-xs">© 2026 CineNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
