import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, FileText, AlertCircle, Search } from 'lucide-react';

interface AdminStats {
  users: number;
  reports: {
    total: number;
    lost: number;
    found: number;
    activeLost: number;
    activeFound: number;
  };
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/v1/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (err: any) {
        setError('Failed to load statistics.');
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Admin Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Platform overview and management</p>
          </div>
          <div className="flex gap-4">
            <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
            <Link to="/admin/reports" className="btn-primary">Manage Reports</Link>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-brand-500">
              <div className="p-4 bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 rounded-xl">
                <Users size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Users</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stats.users}</h3>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-red-500">
              <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl">
                <Search size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Lost Items Reported</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stats.reports.lost}</h3>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-emerald-500">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <FileText size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Found Items Reported</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stats.reports.found}</h3>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
