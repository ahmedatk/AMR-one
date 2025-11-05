import React from 'react';

const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mr-4"></div>
            <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            </div>
        </div>
    </div>
);

const SkeletonBlock = ({ className = '' }: { className?: string }) => (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg ${className}`}>
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
        <div className="h-full w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
    </div>
);

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SkeletonBlock className="lg:col-span-2 h-[480px]" />
        <SkeletonBlock className="h-[480px]" />
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            <div className="flex space-x-2">
                <div className="h-10 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
                <div className="h-10 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
                <div className="h-10 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
            </div>
        </div>
        <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
