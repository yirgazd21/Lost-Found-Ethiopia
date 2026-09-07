import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, MapPin, Calendar, FileText, Tag, CheckCircle, AlertCircle, EyeOff } from 'lucide-react';

const ReportFound = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'OTHER',
    public_description: '',
    private_description: '',
    location: '',
    date_found: '',
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
        'http://localhost:5000/api/v1/found-items',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setStatus('success');
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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h2>
          <p className="text-slate-500">Your found item has been added securely to the database. You are helping someone today!</p>
          <p className="text-sm text-slate-400 mt-6">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto animate-fade-in">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Report a Found Item</h1>
          <p className="text-slate-500 mt-2">Thank you for finding this! Please be careful not to reveal private details publicly.</p>
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
                  placeholder="e.g., Black Leather Wallet"
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

            {/* Date Found */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Date Found</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  name="date_found"
                  required
                  value={formData.date_found}
                  onChange={handleChange}
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Location Found</label>
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
                placeholder="e.g., Near the main entrance of Entoto Park"
              />
            </div>
          </div>

          {/* Public Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Public Description</label>
            <textarea
              name="public_description"
              required
              rows={2}
              value={formData.public_description}
              onChange={handleChange}
              className="input-field"
              placeholder="A general description anyone can see (e.g., 'A black wallet found on a bench')"
            ></textarea>
          </div>

          {/* Private Description (Privacy Focused) */}
          <div className="space-y-2 p-4 bg-slate-100 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-brand-700 font-medium">
              <EyeOff size={18} />
              <label className="text-sm">Private Secret Description</label>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Describe a unique detail (like the exact cash amount, a hidden card, or lock screen photo). 
              This is <span className="font-bold">never shown to the public</span> and helps us verify the true owner.
            </p>
            <textarea
              name="private_description"
              required
              rows={3}
              value={formData.private_description}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Contains exactly 450 Birr and a receipt from Kaldi's Coffee."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full flex items-center justify-center gap-2 pt-4 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <PlusCircle size={18} />
                Submit Found Item Report
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportFound;
