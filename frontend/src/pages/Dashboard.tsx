import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Package, LogOut, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      // If not logged in, kick them back to the login page
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null; // Prevent flash of content before redirect

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        
        {/* Welcome Banner */}
        <div className="glass-panel p-8 bg-brand-600 border-none shadow-brand-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-brand-100">Here is a quick overview of your activity on the network.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-colors font-medium border border-white/20"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link to="/report-lost" className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 group">
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Report Lost Item</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Did you lose something?</p>
              </div>
            </Link>

            <Link to="/report-found" className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Report Found Item</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Did you find something?</p>
              </div>
            </Link>

            <Link to="/search" className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 group">
              <div className="w-14 h-14 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Browse Database</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Search through all items</p>
              </div>
            </Link>

          </div>
        </div>

        {/* Recent Reports Placeholder */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Your Recent Reports</h2>
          <div className="glass-card p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No recent reports</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Items you report will appear here.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
