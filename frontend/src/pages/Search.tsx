import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, MapPin, Calendar, Tag, AlertCircle, Phone, Mail } from 'lucide-react';

interface Item {
  _id: string;
  title: string;
  category: string;
  description?: string;
  public_description?: string;
  location: string;
  status: string;
  date_lost?: string;
  date_found?: string;
  user_id: {
    name: string;
    phone?: string;
    email?: string;
  };
  createdAt: string;
}

const Search = () => {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const endpoint = activeTab === 'lost' ? '/api/v1/lost-items' : '/api/v1/found-items';
      const url = `http://localhost:5000${endpoint}?search=${searchQuery}`;
      
      const response = await axios.get(url);
      setItems(response.data.data);
    } catch (err: any) {
      setError('Failed to fetch items. Make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch items when tab or search query changes (with debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">Database Search</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Search through our database of reported items across Ethiopia.
          </p>

          <div className="max-w-2xl mx-auto pt-6 flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <SearchIcon size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Instant search by keywords (e.g., iPhone, Wallet, Bole...)"
                className="input-field pl-12 bg-white shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 border-b border-slate-200 pb-px">
          <button
            onClick={() => setActiveTab('lost')}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'lost' 
                ? 'border-brand-500 text-brand-600 dark:text-brand-400' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Lost Items
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'found' 
                ? 'border-brand-500 text-brand-600 dark:text-brand-400' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Found Items
          </button>
        </div>

        {/* Results */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 glass-panel bg-transparent border-dashed border-2 border-slate-300 shadow-none">
            <SearchIcon size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-600">No items found</h3>
            <p className="text-slate-400 mt-1">Try adjusting your search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item._id} className="glass-card p-6 flex flex-col h-full hover:border-brand-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activeTab === 'lost' ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'
                  }`}>
                    {activeTab === 'lost' ? 'Lost' : 'Found'}
                  </span>
                  <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag size={12} />
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">{item.title}</h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                  {item.description || item.public_description}
                </p>
                
                <div className="space-y-3 pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="text-brand-500" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={16} className="text-brand-500" />
                    <span>
                      {activeTab === 'lost' && item.date_lost 
                        ? new Date(item.date_lost).toLocaleDateString() 
                        : item.date_found 
                          ? new Date(item.date_found).toLocaleDateString() 
                          : 'Date unknown'}
                    </span>
                  </div>

                  {/* Contact Info (Visible if phone or email is available) */}
                  {(item.user_id?.phone || item.user_id?.email) && (
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg mt-2 border border-slate-100 dark:border-slate-700">
                      {item.user_id.phone ? (
                        <>
                          <Phone size={16} className="text-slate-400 dark:text-slate-500" />
                          <span>Contact: {item.user_id.phone}</span>
                        </>
                      ) : (
                        <>
                          <Mail size={16} className="text-slate-400 dark:text-slate-500" />
                          <span>Contact: {item.user_id.email}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
