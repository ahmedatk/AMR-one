import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UploadData from './components/UploadData';
import { AlertTriangle } from './components/icons';

type Page = 'dashboard' | 'upload';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login
    if (email === 'admin@amr.one' && password === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Use admin@amr.one and password.');
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-extrabold text-center text-white">AMR-One Platform</h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Antimicrobial Resistance Surveillance
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input id="email-address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address (admin@amr.one)" />
              </div>
              <div>
                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password (password)" />
              </div>
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-4 md:p-6 lg:p-8">
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6 flex items-center" role="alert">
                <AlertTriangle className="w-5 h-5 mr-3 text-red-400" />
                <span className="block sm:inline"><strong className="font-bold">High-Risk Alert:</strong> A new strain of resistant K. pneumoniae has been detected in Mumbai. Immediate investigation recommended.</span>
            </div>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'upload' && <UploadData />}
        </main>
      </div>
    </div>
  );
};

export default App;
