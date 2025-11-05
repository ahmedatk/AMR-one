import React from 'react';
import { View } from '../types.ts';
import { LayoutDashboard, UploadCloud, SettingsIcon, UserCircle, HelpCircle, PlayCircle, X } from './icons.tsx';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onStartTour: () => void;
  onHelpClick: () => void;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 text-base font-normal rounded-lg transition-colors duration-150 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isSidebarOpen, setIsSidebarOpen, onStartTour, onHelpClick }) => {
    
    const handleViewChange = (view: View) => {
        onViewChange(view);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <aside 
                className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <a href="#" onClick={(e) => {e.preventDefault(); handleViewChange('dashboard');}} className="flex items-center">
                            <svg className="w-8 h-8 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">AMR-One</span>
                        </a>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium flex-grow">
                        <NavItem icon={LayoutDashboard} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => handleViewChange('dashboard')} />
                        <NavItem icon={UploadCloud} label="Upload Data" isActive={currentView === 'upload'} onClick={() => handleViewChange('upload')} />
                        <NavItem icon={SettingsIcon} label="Settings" isActive={currentView === 'settings'} onClick={() => handleViewChange('settings')} />
                        <NavItem icon={UserCircle} label="Profile" isActive={currentView === 'profile'} onClick={() => handleViewChange('profile')} />
                    </ul>
                    <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                         <a href="#" onClick={(e) => { e.preventDefault(); onStartTour(); }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <PlayCircle className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Restart Tour</span>
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onHelpClick(); }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <HelpCircle className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Help</span>
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
