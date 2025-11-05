import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
        <div className="flex items-center space-x-6 mb-8">
            <img 
                className="h-24 w-24 rounded-full object-cover" 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                alt="User avatar" 
            />
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dr. Evelyn Reed</h2>
                <p className="text-indigo-600 dark:text-indigo-400">Epidemiologist</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Metropolis Health Department</p>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-800 dark:text-gray-200">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">Email:</span>
                    <p className="text-gray-700 dark:text-gray-300">e.reed@metropolishealth.gov</p>
                </div>
                <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">Phone:</span>
                    <p className="text-gray-700 dark:text-gray-300">(555) 123-4567</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
