import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Calendar, FileText, Tag, CheckCircle, AlertCircle } from 'lucide-react';

const ReportLost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'OTHER',
    description: '',
    location: '',
    date_lost: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check auth on mount
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/v1/lost-items',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setStatus('success');
      // Redirect to dashboard after a short delay
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err.response?.data?.message || 'Failed to submit report. Please try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="glass-card p-10 text-center animate-slide-up max-w-md w-full">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Report Submitted!</h2>
          <p className="text-slate-500">Your lost item has been added to the database. We will notify you if there is a match.</p>
          <p className="text-sm text-slate-400 mt-6">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto animate-fade-in">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Report a Lost Item</h1>
          <p className="text-slate-500 mt-2">Provide as much detail as possible to help us find a match.</p>
        </div>

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FileText size={18} />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field pl-11"
                  placeholder="e.g., iPhone 13 Pro Max - Black"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Category</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Tag size={18} />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field pl-11 appearance-none"
                >
                  <option value="ELECTRONICS">Electronics (Phones, Laptops)</option>
                  <option value="DOCUMENTS">Documents (IDs, Passports)</option>
                  <option value="WALLET">Wallet & Cash</option>
                  <option value="KEYS">Keys</option>
                  <option value="JEWELRY">Jewelry</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            {/* Date Lost */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Date Lost</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  name="date_lost"
                  required
                  value={formData.date_lost}
                  onChange={handleChange}
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Last Known Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="input-field pl-11"
                placeholder="e.g., Bole International Airport, Terminal 2"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Detailed Description</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              placeholder="Describe the item in detail (brand, model, scratches, case color, etc.)"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full flex items-center justify-center gap-2 pt-4"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search size={18} />
                Submit Lost Item Report
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportLost;
