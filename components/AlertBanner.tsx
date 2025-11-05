import React from 'react';
import { Prediction } from '../types.ts';
import { AlertTriangle } from './icons.tsx';

interface AlertBannerProps {
  prediction: Prediction;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ prediction }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md shadow-sm" role="alert">
      <div className="flex">
        <div className="py-1">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-4" />
        </div>
        <div>
          <p className="font-bold">High-Risk Alert</p>
          <p className="text-sm">
            A recent prediction on <strong>{prediction.date}</strong> shows a high risk for <strong>{prediction.bacteria}</strong> in <strong>{prediction.district}</strong> with a resistance rate of <strong>{(prediction.resistanceRate * 100).toFixed(1)}%</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
