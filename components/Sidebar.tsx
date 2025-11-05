import React from 'react';
import { LayoutDashboard, Upload } from './icons';

type Page = 'dashboard' | 'upload';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Data', icon: Upload },
  ];

  return (
    <div className="w-16 md:w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="flex items-center justify-center md:justify-start h-20 border-b border-gray-700 px-4">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.88 1.88M14.12 14.12 16 16m-4-8a4 4 0 110 8 4 4 0 010-8z"></path></svg>
        </div>
        <h1 className="hidden md:block ml-3 text-xl font-bold text-white">AMR-One</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as Page)}
            className={`flex items-center w-full px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              currentPage === item.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="hidden md:block ml-4 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
