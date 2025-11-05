import React, { useState, useEffect } from 'react';
import Heatmap from './Heatmap';
import RiskChart from './RiskChart';
import PredictionsTable from './PredictionsTable';
import { fetchDashboardData } from '../services/api';
import { DistrictData, Prediction, ChartData, RiskLevel } from '../types';
import { MapPin, BarChart2, ShieldAlert, ShieldCheck } from './icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchDashboardData();
      setDistricts(data.districts);
      setPredictions(data.predictions);
      setChartData(data.chartData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
    
  const highRiskDistricts = districts.filter(d => d.riskLevel === RiskLevel.High).length;
  const totalDistricts = districts.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Districts Monitored" value={totalDistricts} icon={<MapPin className="w-6 h-6 text-white"/>} color="bg-blue-600" />
        <StatCard title="High-Risk Districts" value={highRiskDistricts} icon={<ShieldAlert className="w-6 h-6 text-white"/>} color="bg-red-600" />
        <StatCard title="Overall Risk Trend" value="Increasing" icon={<BarChart2 className="w-6 h-6 text-white"/>} color="bg-yellow-600" />
        <StatCard title="System Status" value="Operational" icon={<ShieldCheck className="w-6 h-6 text-white"/>} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">AMR Risk Heatmap</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <Heatmap data={districts} />
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Risk Level Trends</h2>
          <div className="h-96">
            <RiskChart data={chartData} />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Prediction Results</h2>
        <PredictionsTable predictions={predictions} />
      </div>
    </div>
  );
};

export default Dashboard;
