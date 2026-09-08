import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <Search size={20} />
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Lost & Found Ethiopia
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              A community-driven platform dedicated to reuniting people with their lost belongings across Ethiopia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Quick Links</h3>
            <Link to="/search" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors">Search Items</Link>
            <Link to="/report-lost" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors">Report Lost Item</Link>
            <Link to="/report-found" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors">Report Found Item</Link>
          </div>

          {/* Legal / Contact Placeholder */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Support</h3>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors">FAQ</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors">Terms of Service</a>
          </div>
          
        </div>

        <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Lost & Found Ethiopia. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social media icon placeholders could go here */}
            <span className="text-slate-400 dark:text-slate-500 text-sm">Built with ❤️ in Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
