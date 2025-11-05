import React, { useState } from 'react';
import { View } from '../types.ts';
import { Menu, Search, Bell } from './icons.tsx';
import NotificationsPanel from './NotificationsPanel.tsx';


interface HeaderProps {
  currentView: View;
  onToggleSidebar: () => void;
  onSearchClick: () => void;
}

const getTitleForView = (view: View): string => {
    switch (view) {
        case 'dashboard':
            return 'Dashboard Overview';
        case 'upload':
            return 'Upload Surveillance Data';
        case 'settings':
            return 'Application Settings';
        case 'profile':
            return 'User Profile';
        default:
            return 'AMR-One';
    }
}

const Header: React.FC<HeaderProps> = ({ currentView, onToggleSidebar, onSearchClick }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  return (
    <header className="relative z-20 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggleSidebar}
        className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{getTitleForView(currentView)}</h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
            <button onClick={onSearchClick} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <Search className="w-5 h-5 mr-2" />
                <span className="hidden md:block text-sm">Search...</span>
            </button>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                </button>
                {isNotificationsOpen && <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
