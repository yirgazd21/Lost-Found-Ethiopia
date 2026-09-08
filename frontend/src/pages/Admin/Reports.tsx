import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Report {
  _id: string;
  title: string;
  category: string;
  status: string;
  reportType: 'LOST' | 'FOUND';
  createdAt: string;
  user_id: {
    _id: string;
    name: string;
  };
}

const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/v1/admin/reports', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(res.data.data);
    } catch (err: any) {
      setError('Failed to load reports.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type.toLowerCase()} report?`)) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/v1/admin/reports/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(reports.filter(r => r._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete report.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/admin" className="text-slate-500 hover:text-brand-600 transition-colors">Admin Dashboard</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-800 dark:text-slate-200">Reports</span>
        </div>

        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Report Management</h1>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Title & Category</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Reported By</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">Loading reports...</td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No reports found.</td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          report.reportType === 'LOST' 
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' 
                            : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'
                        }`}>
                          {report.reportType}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{report.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{report.category}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {report.user_id ? report.user_id.name : <span className="italic text-slate-400">Deleted User</span>}
                        </p>
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Link
                            to="/search" // Currently there's no item detail page, so we link to search
                            className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors"
                            title="View Item (Search Page)"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(report.reportType, report._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete Report"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminReports;
