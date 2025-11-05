import { DistrictData, Prediction, ChartData, RiskLevel } from './types';

export const MOCK_DISTRICT_DATA: DistrictData[] = [
  { id: 'd1', name: 'North Delhi', lat: 28.7041, lon: 77.1025, riskScore: 0.85, riskLevel: RiskLevel.High },
  { id: 'd2', name: 'South Delhi', lat: 28.5173, lon: 77.2201, riskScore: 0.65, riskLevel: RiskLevel.Medium },
  { id: 'd3', name: 'Mumbai', lat: 19.0760, lon: 72.8777, riskScore: 0.92, riskLevel: RiskLevel.High },
  { id: 'd4', name: 'Bangalore Urban', lat: 12.9716, lon: 77.5946, riskScore: 0.75, riskLevel: RiskLevel.High },
  { id: 'd5', name: 'Chennai', lat: 13.0827, lon: 80.2707, riskScore: 0.55, riskLevel: RiskLevel.Medium },
  { id: 'd6', name: 'Kolkata', lat: 22.5726, lon: 88.3639, riskScore: 0.68, riskLevel: RiskLevel.Medium },
  { id: 'd7', name: 'Pune', lat: 18.5204, lon: 73.8567, riskScore: 0.45, riskLevel: RiskLevel.Low },
  { id: 'd8', name: 'Hyderabad', lat: 17.3850, lon: 78.4867, riskScore: 0.81, riskLevel: RiskLevel.High },
  { id: 'd9', name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, riskScore: 0.35, riskLevel: RiskLevel.Low },
  { id: 'd10', name: 'Jaipur', lat: 26.9124, lon: 75.7873, riskScore: 0.25, riskLevel: RiskLevel.Low },
];

export const MOCK_PREDICTIONS: Prediction[] = [
  { id: 'p1', district: 'North Delhi', bacteria: 'E. coli', resistanceRate: 0.82, predictedRisk: RiskLevel.High, date: '2024-07-20' },
  { id: 'p2', district: 'Mumbai', bacteria: 'K. pneumoniae', resistanceRate: 0.88, predictedRisk: RiskLevel.High, date: '2024-07-20' },
  { id: 'p3', district: 'Bangalore Urban', bacteria: 'A. baumannii', resistanceRate: 0.71, predictedRisk: RiskLevel.High, date: '2024-07-19' },
  { id: 'p4', district: 'South Delhi', bacteria: 'S. aureus', resistanceRate: 0.61, predictedRisk: RiskLevel.Medium, date: '2024-07-19' },
  { id: 'p5', district: 'Pune', bacteria: 'E. coli', resistanceRate: 0.41, predictedRisk: RiskLevel.Low, date: '2024-07-18' },
  { id: 'p6', district: 'Chennai', bacteria: 'K. pneumoniae', resistanceRate: 0.58, predictedRisk: RiskLevel.Medium, date: '2024-07-18' },
];

export const MOCK_CHART_DATA: ChartData[] = [
    { month: 'Jan', low: 40, medium: 24, high: 14 },
    { month: 'Feb', low: 30, medium: 13, high: 22 },
    { month: 'Mar', low: 20, medium: 38, high: 25 },
    { month: 'Apr', low: 27, medium: 29, high: 28 },
    { month: 'May', low: 18, medium: 40, high: 32 },
    { month: 'Jun', low: 23, medium: 30, high: 35 },
    { month: 'Jul', low: 25, medium: 28, high: 41 },
];
