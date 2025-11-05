import { MOCK_DISTRICT_DATA, MOCK_PREDICTIONS, MOCK_CHART_DATA, MOCK_NOTIFICATIONS } from '../constants.ts';
import { DistrictData, Prediction, ChartData, RiskLevel, Notification } from '../types.ts';

export const fetchDashboardData = (): Promise<{
  districts: DistrictData[];
  predictions: Prediction[];
  chartData: ChartData[];
}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        districts: MOCK_DISTRICT_DATA,
        predictions: MOCK_PREDICTIONS,
        chartData: MOCK_CHART_DATA,
      });
    }, 1000); // Simulate 1 second network delay
  });
};

export const fetchNotifications = (): Promise<Notification[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(MOCK_NOTIFICATIONS);
        }, 500);
    });
};

export const runPrediction = (file: File): Promise<Prediction[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real app, you'd process the file and get real predictions.
            // Here, we just return a new set of mock predictions.
            const newPredictions: Prediction[] = [
                { id: `p${Math.random()}`, district: 'New Upload District', bacteria: 'P. aeruginosa', resistanceRate: Math.random(), predictedRisk: RiskLevel.High, date: new Date().toISOString().split('T')[0] },
                { id: `p${Math.random()}`, district: 'Another District', bacteria: 'E. coli', resistanceRate: Math.random(), predictedRisk: RiskLevel.Medium, date: new Date().toISOString().split('T')[0] },
            ];
            resolve(newPredictions);
        }, 2000); // Simulate 2 second processing time
    });
};
