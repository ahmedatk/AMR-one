import React, { useState, useMemo } from 'react';
import { Prediction, RiskLevel, SortKey, SortOrder } from '../types.ts';
import { ChevronsUpDown, ArrowUp, ArrowDown } from './icons.tsx';

interface PredictionsTableProps {
  predictions: Prediction[];
  onRowClick: (districtName: string) => void;
}

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const levelStyles = {
    [RiskLevel.Low]: 'bg-green-100 dark:bg-green-600/50 text-green-800 dark:text-green-200 border-green-300 dark:border-green-500',
    [RiskLevel.Medium]: 'bg-yellow-100 dark:bg-yellow-600/50 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-500',
    [RiskLevel.High]: 'bg-red-100 dark:bg-red-600/50 text-red-800 dark:text-red-200 border-red-300 dark:border-red-500',
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${levelStyles[level]}`}>
      {level}
    </span>
  );
};

const SortableHeader: React.FC<{
    label: string;
    sortKey: keyof Prediction;
    currentSortKey: SortKey;
    sortOrder: SortOrder;
    onSort: (key: keyof Prediction) => void;
}> = ({ label, sortKey, currentSortKey, sortOrder, onSort }) => {
    const isActive = sortKey === currentSortKey;
    const Icon = isActive ? (sortOrder === 'asc' ? ArrowUp : ArrowDown) : ChevronsUpDown;
    return (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            <button className="flex items-center space-x-1 group" onClick={() => onSort(sortKey)}>
                <span>{label}</span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-white'}`} />
            </button>
        </th>
    );
};


const PredictionsTable: React.FC<PredictionsTableProps> = ({ predictions, onRowClick }) => {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (key: keyof Prediction) => {
    if (sortKey === key) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
        setSortKey(key);
        setSortOrder('asc');
    }
  };

  const sortedPredictions = useMemo(() => {
    if (!sortKey) return predictions;
    
    return [...predictions].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal < bVal) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });
  }, [predictions, sortKey, sortOrder]);


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <SortableHeader label="District" sortKey="district" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bacteria</th>
            <SortableHeader label="Resistance Rate" sortKey="resistanceRate" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <SortableHeader label="Predicted Risk" sortKey="predictedRisk" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <SortableHeader label="Date" sortKey="date" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedPredictions.map((p) => (
            <tr 
              key={p.id} 
              className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() => onRowClick(p.district)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">{p.district}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{p.bacteria}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{(p.resistanceRate * 100).toFixed(1)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                <RiskBadge level={p.predictedRisk} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsTable;