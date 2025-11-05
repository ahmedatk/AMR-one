import React from 'react';
import { UserCircle, LogOut } from './icons';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-gray-900 border-b border-gray-700">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-right">
            <div>
                <p className="font-semibold text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@amr.one</p>
            </div>
            <UserCircle className="w-10 h-10 ml-3 text-gray-400" />
        </div>
        <button onClick={onLogout} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <LogOut className="w-6 h-6"/>
        </button>
      </div>
    </header>
  );
};

export default Header;
