import React, { useEffect, useRef, useState } from 'react';
import { DistrictData, RiskLevel } from '../types.ts';

declare const L: any; // Use 'any' for Leaflet since types aren't formally imported

interface HeatmapProps {
  districts: DistrictData[];
  onDistrictClick: (districtName: string) => void;
}

const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case RiskLevel.High: return '#ef4444'; // red-500
    case RiskLevel.Medium: return '#f59e0b'; // amber-500
    case RiskLevel.Low: return '#22c55e'; // green-500
    default: return '#6b7280'; // gray-500
  }
};

const Heatmap: React.FC<HeatmapProps> = ({ districts, onDistrictClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  useEffect(() => {
    // Observer for theme changes
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

  useEffect(() => {
    if (!mapContainerRef.current || typeof L === 'undefined') return;

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629], // Center on India
        zoom: 4, // Zoom for India view
        zoomControl: false,
      });
      L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    }
    
    const map = mapRef.current;
    
    // Clear existing layers
    map.eachLayer((layer: any) => {
        if (!!layer.toGeoJSON || layer instanceof L.Circle || layer instanceof L.LayerGroup) {
            map.removeLayer(layer);
        }
    });

    // Set tile layer based on theme
    const darkTile = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const lightTile = 'https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png';
    const tileUrl = theme === 'dark' ? darkTile : lightTile;
    
    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Add heatmap layer
    const heatData = districts.map(d => {
        const intensity = d.riskLevel === RiskLevel.High ? 1.0 : d.riskLevel === RiskLevel.Medium ? 0.7 : 0.4;
        return [...d.coordinates, intensity];
    });

    L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
    }).addTo(map);
    
    // Add circle markers for each district
    districts.forEach(district => {
      const color = getRiskColor(district.riskLevel);
      const radius = 20000 + (district.activeCases * 100); // Base size + size based on cases
      
      const circle = L.circle(district.coordinates, {
        color: color,
        fillColor: color,
        fillOpacity: 0.6,
        radius: radius,
      }).addTo(map);
      
      circle.bindTooltip(district.name, {
          permanent: false,
          direction: 'top'
      });
      
      circle.on('click', () => {
        onDistrictClick(district.name);
      });
    });

  }, [districts, onDistrictClick, theme]);

  return <div ref={mapContainerRef} className="w-full h-full rounded-md" />;
};

export default Heatmap;