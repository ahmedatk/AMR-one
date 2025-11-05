export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface DistrictData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  riskScore: number; // A value from 0 to 1
  riskLevel: RiskLevel;
}

export interface Prediction {
  id: string;
  district: string;
  bacteria: string;
  resistanceRate: number;
  predictedRisk: RiskLevel;
  date: string;
}

export interface ChartData {
  month: string;
  low: number;
  medium: number;
  high: number;
}
