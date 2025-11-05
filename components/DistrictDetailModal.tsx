import React from 'react';
import { DistrictData, Prediction, RiskLevel } from '../types.ts';
import { X } from './icons.tsx';

interface DistrictDetailModalProps {
  district: DistrictData;
  predictions: Prediction[];
  onClose: () => void;
}

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const levelStyles = {
    [RiskLevel.Low]: 'bg-green-100 dark:bg-green-600/50 text-green-800 dark:text-green-200',
    [RiskLevel.Medium]: 'bg-yellow-100 dark:bg-yellow-600/50 text-yellow-800 dark:text-yellow-200',
    [RiskLevel.High]: 'bg-red-100 dark:bg-red-600/50 text-red-800 dark:text-red-200',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelStyles[level]}`}>
      {level}
    </span>
  );
};

const DistrictDetailModal: React.FC<DistrictDetailModalProps> = ({ district, predictions, onClose }) => {
  if (!district) return null;
  
  const recentPredictions = predictions.slice(0, 3);

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{district.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">District Details</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Risk Level</h4>
                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                        <RiskBadge level={district.riskLevel} />
                    </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Population</h4>
                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{district.population.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Cases</h4>
                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{district.activeCases}</p>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Recent Predictions</h4>
                {recentPredictions.length > 0 ? (
                    <div className="space-y-3">
                        {recentPredictions.map(p => (
                            <div key={p.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-md flex justify-between items-center">
                               <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{p.bacteria}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Resistance Rate: <span className="font-semibold">{(p.resistanceRate * 100).toFixed(1)}%</span>
                                    </p>
                               </div>
                                <div className="text-right">
                                     <RiskBadge level={p.predictedRisk} />
                                     <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{p.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No prediction data available for this district.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictDetailModal;
