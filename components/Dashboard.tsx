import React, { useState, useEffect, useMemo } from 'react';
import { fetchDashboardData } from '../services/api.ts';
import { DistrictData, Prediction, ChartData, RiskLevel } from '../types.ts';
import DashboardSkeleton from './DashboardSkeleton.tsx';
import Heatmap from './Heatmap.tsx';
import RiskChart from './RiskChart.tsx';
import PredictionsTable from './PredictionsTable.tsx';
import DistrictDetailModal from './DistrictDetailModal.tsx';
import AlertBanner from './AlertBanner.tsx';
import { UserCircle, AlertTriangle, CheckCircle, Clock } from './icons.tsx';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; color: string; }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-lg shadow-sm flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDistricts(data.districts);
        setPredictions(data.predictions);
        setChartData(data.chartData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const highRiskPrediction = useMemo(() => {
    return predictions
      .filter(p => p.predictedRisk === RiskLevel.High)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }, [predictions]);

  const stats = useMemo(() => {
      if (isLoading) return { highRisk: 0, mediumRisk: 0, lowRisk: 0, total: 0 };
      const highRisk = districts.filter(d => d.riskLevel === RiskLevel.High).length;
      const mediumRisk = districts.filter(d => d.riskLevel === RiskLevel.Medium).length;
      const lowRisk = districts.filter(d => d.riskLevel === RiskLevel.Low).length;
      return {
          highRisk,
          mediumRisk,
          lowRisk,
          total: districts.length
      }
  }, [districts, isLoading]);

  const handleDistrictSelect = (districtName: string) => {
    const district = districts.find(d => d.name === districtName);
    if (district) {
      setSelectedDistrict(district);
    }
  };

  const handleCloseModal = () => {
    setSelectedDistrict(null);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return (
    <div className="space-y-8">
      {highRiskPrediction && <AlertBanner prediction={highRiskPrediction} />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Districts" value={stats.total} icon={UserCircle} color="bg-blue-500" />
        <StatCard title="High-Risk Districts" value={stats.highRisk} icon={AlertTriangle} color="bg-red-500" />
        <StatCard title="Medium-Risk Districts" value={stats.mediumRisk} icon={Clock} color="bg-yellow-500" />
        <StatCard title="Low-Risk Districts" value={stats.lowRisk} icon={CheckCircle} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Risk Hotspots</h2>
            <div className="h-[480px]">
              <Heatmap districts={districts} onDistrictClick={handleDistrictSelect} />
            </div>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Risk Trends Over Time</h2>
            <div className="h-[480px]">
              <RiskChart data={chartData} />
            </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Predictions</h2>
        <PredictionsTable predictions={predictions} onRowClick={handleDistrictSelect} />
      </div>

      {selectedDistrict && (
        <DistrictDetailModal 
          district={selectedDistrict} 
          predictions={predictions.filter(p => p.district === selectedDistrict.name)}
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Dashboard;
