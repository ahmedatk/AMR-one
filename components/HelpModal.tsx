import React from 'react';
import { X } from './icons.tsx';

interface HelpModalProps {
  onClose: () => void;
}

const FeatureDescription: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Help & Support</h3>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <FeatureDescription title="Dashboard">
                The main hub for visualizing AMR data. Use the interactive map to see risk hotspots and click on districts for more details. Track trends over time with the resistance chart.
            </FeatureDescription>
            <FeatureDescription title="Upload Data">
                Add your own surveillance data in CSV format. The system will process your file and generate new predictions, which will then appear on the dashboard.
            </FeatureDescription>
             <FeatureDescription title="Search">
                Use the global search in the header to quickly find any district. Results will allow you to jump directly to the district's detailed view.
            </FeatureDescription>
            <FeatureDescription title="Settings & Profile">
                Customize the application's theme in the Settings page and view your user information in the Profile section.
            </FeatureDescription>
             <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Contact Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you encounter any issues, please email our support team at <a href="mailto:support@amr-one.mock" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@amr-one.mock</a>.
                </p>
             </div>
        </div>
         <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-right">
            <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Got it, thanks!
            </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
