import React from 'react';
import { ChartData } from '../types';

interface RiskChartProps {
  data: ChartData[];
}

const RiskChart: React.FC<RiskChartProps> = ({ data }) => {
  // Recharts is loaded from a CDN and available on the window object
  const Recharts = (window as any).Recharts;

  if (!Recharts) {
    return (
        <div className="flex justify-center items-center h-full text-gray-400">
            Loading Chart...
        </div>
    );
  }
    
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
        <XAxis dataKey="month" tick={{ fill: '#A0AEC0' }} />
        <YAxis tick={{ fill: '#A0AEC0' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }}
          labelStyle={{ color: '#E2E8F0' }}
        />
        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
        <Bar dataKey="low" stackId="a" fill="#38A169" name="Low Risk"/>
        <Bar dataKey="medium" stackId="a" fill="#DD6B20" name="Medium Risk" />
        <Bar dataKey="high" stackId="a" fill="#E53E3E" name="High Risk" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiskChart;