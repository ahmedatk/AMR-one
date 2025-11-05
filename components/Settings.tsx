import React from 'react';
import { Theme } from '../types.ts';
import { Sun, Moon } from './icons.tsx';

interface SettingsProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Toggle: React.FC<{ label: string; id: string; defaultChecked?: boolean }> = ({ label, id, defaultChecked }) => (
    <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-gray-700 dark:text-gray-300 select-none cursor-pointer">{label}</label>
        <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id={id} className="sr-only peer" defaultChecked={defaultChecked} />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
        </label>
    </div>
);


const Settings: React.FC<SettingsProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Appearance Settings</h2>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Theme</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose how AMR-One looks to you. Select a theme below.</p>
          </div>
          
          <div className="flex items-center space-x-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
            <button
              onClick={() => onThemeChange('light')}
              className={`flex items-center justify-center w-24 py-2 rounded-md text-sm font-medium transition-colors ${
                currentTheme === 'light'
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Sun className="w-5 h-5 mr-2" />
              Light
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex items-center justify-center w-24 py-2 rounded-md text-sm font-medium transition-colors ${
                currentTheme === 'dark'
                  ? 'bg-gray-900 text-white shadow'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Moon className="w-5 h-5 mr-2" />
              Dark
            </button>
          </div>
        </div>
      </div>

       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Notification Settings (Mock)</h2>
         <div className="space-y-4">
            <Toggle id="email-alerts" label="Email alerts for high-risk events" />
            <Toggle id="push-notifications" label="Push notifications on mobile" defaultChecked />
         </div>
      </div>

    </div>
  );
};

export default Settings;
