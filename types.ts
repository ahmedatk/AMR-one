export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface DistrictData {
  id: string;
  name: string;
  population: number;
  area: number; // in sq km
  coordinates: [number, number];
  riskLevel: RiskLevel;
  activeCases: number;
}

export interface Prediction {
  id: string;
  district: string;
  bacteria: string;
  resistanceRate: number; // 0 to 1
  predictedRisk: RiskLevel;
  date: string; // YYYY-MM-DD
}

export interface ChartData {
  date: string;
  [key: string]: number | string; // e.g. { date: '2023-01', 'E. coli': 45, 'S. aureus': 30 }
}

export type SortKey = keyof Prediction | null;

export type SortOrder = 'asc' | 'desc';

export type Theme = 'light' | 'dark';

export type View = 'dashboard' | 'upload' | 'settings' | 'profile';

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}
