import { DistrictData, Prediction, ChartData, RiskLevel, Notification } from './types.ts';

export const MOCK_DISTRICT_DATA: DistrictData[] = [
  { id: 'd1', name: 'Mumbai', population: 12442373, area: 603, coordinates: [19.0760, 72.8777], riskLevel: RiskLevel.High, activeCases: 215 },
  { id: 'd2', name: 'Delhi', population: 11034555, area: 1484, coordinates: [28.7041, 77.1025], riskLevel: RiskLevel.High, activeCases: 190 },
  { id: 'd3', name: 'Bengaluru', population: 8443675, area: 741, coordinates: [12.9716, 77.5946], riskLevel: RiskLevel.Medium, activeCases: 110 },
  { id: 'd4', name: 'Hyderabad', population: 6993262, area: 650, coordinates: [17.3850, 78.4867], riskLevel: RiskLevel.Medium, activeCases: 95 },
  { id: 'd5', name: 'Ahmedabad', population: 5577940, area: 464, coordinates: [23.0225, 72.5714], riskLevel: RiskLevel.Low, activeCases: 25 },
  { id: 'd6', name: 'Chennai', population: 4646732, area: 426, coordinates: [13.0827, 80.2707], riskLevel: RiskLevel.High, activeCases: 155 },
  { id: 'd7', name: 'Kolkata', population: 4496694, area: 205, coordinates: [22.5726, 88.3639], riskLevel: RiskLevel.Medium, activeCases: 88 },
  { id: 'd8', name: 'Pune', population: 3124458, area: 516, coordinates: [18.5204, 73.8567], riskLevel: RiskLevel.High, activeCases: 140 },
  { id: 'd9', name: 'Jaipur', population: 3073350, area: 485, coordinates: [26.9124, 75.7873], riskLevel: RiskLevel.Medium, activeCases: 60 },
  { id: 'd10', name: 'Lucknow', population: 2817105, area: 349, coordinates: [26.8467, 80.9462], riskLevel: RiskLevel.Low, activeCases: 18 },
  { id: 'd11', name: 'Kanpur', population: 2765348, area: 403, coordinates: [26.4499, 80.3319], riskLevel: RiskLevel.Medium, activeCases: 52 },
  { id: 'd12', name: 'Nagpur', population: 2405665, area: 227, coordinates: [21.1458, 79.0882], riskLevel: RiskLevel.Low, activeCases: 15 },
  { id: 'd13', name: 'Indore', population: 1964086, area: 530, coordinates: [22.7196, 75.8577], riskLevel: RiskLevel.Medium, activeCases: 40 },
  { id: 'd14', name: 'Bhopal', population: 1798218, area: 285, coordinates: [23.2599, 77.4126], riskLevel: RiskLevel.Low, activeCases: 10 },
  { id: 'd15', name: 'Visakhapatnam', population: 1728128, area: 681, coordinates: [17.6868, 83.2185], riskLevel: RiskLevel.Low, activeCases: 5 },
];

export const MOCK_PREDICTIONS: Prediction[] = [
  { id: 'p1', district: 'Mumbai', bacteria: 'E. coli', resistanceRate: 0.85, predictedRisk: RiskLevel.High, date: '2023-10-26' },
  { id: 'p2', district: 'Bengaluru', bacteria: 'S. aureus', resistanceRate: 0.55, predictedRisk: RiskLevel.Medium, date: '2023-10-25' },
  { id: 'p3', district: 'Ahmedabad', bacteria: 'K. pneumoniae', resistanceRate: 0.20, predictedRisk: RiskLevel.Low, date: '2023-10-25' },
  { id: 'p4', district: 'Hyderabad', bacteria: 'E. coli', resistanceRate: 0.60, predictedRisk: RiskLevel.Medium, date: '2023-10-24' },
  { id: 'p5', district: 'Delhi', bacteria: 'S. aureus', resistanceRate: 0.78, predictedRisk: RiskLevel.High, date: '2023-10-23' },
  { id: 'p6', district: 'Chennai', bacteria: 'P. aeruginosa', resistanceRate: 0.90, predictedRisk: RiskLevel.High, date: '2023-10-26' },
  { id: 'p7', district: 'Nagpur', bacteria: 'E. coli', resistanceRate: 0.15, predictedRisk: RiskLevel.Low, date: '2023-10-22' },
  { id: 'p8', district: 'Kolkata', bacteria: 'K. pneumoniae', resistanceRate: 0.65, predictedRisk: RiskLevel.Medium, date: '2023-10-25' },
  { id: 'p9', district: 'Pune', bacteria: 'S. aureus', resistanceRate: 0.88, predictedRisk: RiskLevel.High, date: '2023-10-24' },
  { id: 'p10', district: 'Jaipur', bacteria: 'E. coli', resistanceRate: 0.48, predictedRisk: RiskLevel.Medium, date: '2023-10-23' },
  { id: 'p11', district: 'Lucknow', bacteria: 'S. aureus', resistanceRate: 0.22, predictedRisk: RiskLevel.Low, date: '2023-10-26' },
  { id: 'p12', district: 'Indore', bacteria: 'K. pneumoniae', resistanceRate: 0.51, predictedRisk: RiskLevel.Medium, date: '2023-10-21' },
];

export const MOCK_CHART_DATA: ChartData[] = [
    { date: '2023-01', Low: 120, Medium: 90, High: 40 },
    { date: '2023-02', Low: 110, Medium: 100, High: 45 },
    { date: '2023-03', Low: 100, Medium: 110, High: 55 },
    { date: '2023-04', Low: 95, Medium: 115, High: 60 },
    { date: '2023-05', Low: 90, Medium: 120, High: 70 },
    { date: '2023-06', Low: 85, Medium: 125, High: 75 },
    { date: '2023-07', Low: 80, Medium: 130, High: 80 },
    { date: '2023-08', Low: 75, Medium: 120, High: 90 },
    { date: '2023-09', Low: 80, Medium: 110, High: 95 },
    { date: '2023-10', Low: 85, Medium: 100, High: 100 },
    { date: '2023-11', Low: 90, Medium: 95, High: 105 },
    { date: '2023-12', Low: 95, Medium: 90, High: 110 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: 'New High-Risk Prediction', description: 'Mumbai has been flagged with a high resistance rate for E. coli.', time: '2 hours ago', read: false },
    { id: 2, title: 'Data Upload Complete', description: 'Your file `surveillance_q3.csv` has been processed.', time: '1 day ago', read: true },
    { id: 3, title: 'System Maintenance', description: 'Scheduled maintenance will occur tonight at 11 PM.', time: '3 days ago', read: true },
];
