import React from 'react';
import { Prediction, RiskLevel } from '../types';

interface PredictionsTableProps {
  predictions: Prediction[];
}

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const levelStyles = {
    [RiskLevel.Low]: 'bg-green-600/50 text-green-200 border-green-500',
    [RiskLevel.Medium]: 'bg-yellow-600/50 text-yellow-200 border-yellow-500',
    [RiskLevel.High]: 'bg-red-600/50 text-red-200 border-red-500',
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${levelStyles[level]}`}>
      {level}
    </span>
  );
};

const PredictionsTable: React.FC<PredictionsTableProps> = ({ predictions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">District</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bacteria</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Resistance Rate</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Predicted Risk</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {predictions.map((p) => (
            <tr key={p.id} className="hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{p.district}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.bacteria}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{(p.resistanceRate * 100).toFixed(1)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <RiskBadge level={p.predictedRisk} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsTable;
