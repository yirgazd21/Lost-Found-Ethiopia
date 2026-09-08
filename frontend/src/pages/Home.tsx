import { Link } from 'react-router-dom';
import { Search, PlusCircle, ShieldCheck, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-24 pb-32">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-brand-300 font-medium text-sm mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-brand-400"></span>
            Ethiopia's #1 Lost & Found Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Let's Reunite You With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">
              What Matters Most
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Lost a phone in Bole? Found a wallet in Piassa? Our community-driven platform connects finders with owners securely and quickly across Ethiopia.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/report-lost" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-semibold shadow-lg shadow-brand-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
            >
              <Search size={22} />
              I Lost Something
            </Link>
            
            <Link 
              to="/report-found" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
            >
              <PlusCircle size={22} />
              I Found Something
            </Link>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">Simple, secure, and effective. We take the hassle out of finding your lost items.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="glass-card p-8 text-center group">
              <div className="mx-auto w-16 h-16 bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">1. Report Item</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Provide details about what you lost or found, including the location and a description.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-8 text-center group">
              <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">2. We Match</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Our smart platform allows you to search through reports to find a matching lost or found item.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-8 text-center group">
              <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">3. Connect Securely</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Verify ownership privately using secret details without exposing personal information to the public.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
