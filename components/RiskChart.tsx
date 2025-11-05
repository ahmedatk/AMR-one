import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { ChartData } from '../types.ts';

interface RiskChartProps {
    data: ChartData[];
}

const RiskChart: React.FC<RiskChartProps> = ({ data }) => {
    const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    const newTheme = (mutation.target as HTMLElement).classList.contains('dark') ? 'dark' : 'light';
                    setTheme(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const colors = {
        light: {
            grid: '#e5e7eb',
            text: '#374151',
            high: '#ef4444',
            medium: '#f59e0b',
            low: '#22c55e',
        },
        dark: {
            grid: '#374151',
            text: '#d1d5db',
            high: '#f87171',
            medium: '#fbbf24',
            low: '#4ade80',
        }
    };
    
    const currentColors = colors[theme];
    
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
            <p className="font-bold text-gray-800 dark:text-gray-200">{`Month: ${label}`}</p>
            {payload.map((p: any) => (
                <p key={p.name} style={{ color: p.color }}>{`${p.name}: ${p.value}`}</p>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke={currentColors.grid} />
                <XAxis dataKey="date" stroke={currentColors.text} fontSize={12} />
                <YAxis stroke={currentColors.text} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize: "14px"}} />
                <Line type="monotone" dataKey="High" stroke={currentColors.high} strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Medium" stroke={currentColors.medium} strokeWidth={2} />
                <Line type="monotone" dataKey="Low" stroke={currentColors.low} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RiskChart;
