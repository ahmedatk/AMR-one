import React, { useEffect, useRef } from 'react';
import { DistrictData } from '../types';

// Since Leaflet and leaflet.heat are loaded from a CDN, we need to tell TypeScript about the 'L' global variable.
declare const L: any;

interface HeatmapProps {
  data: DistrictData[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = L.map(mapContainer.current, {
        center: [20.5937, 78.9629], // Centered on India
        zoom: 5,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map.current);
    }
    
    // Cleanup on unmount
    return () => {
        if (map.current) {
            map.current.remove();
            map.current = null;
        }
    };
  }, []);

  useEffect(() => {
    if (map.current && data.length > 0) {
      // Data for heatlayer should be in [lat, lng, intensity] format
      const heatData: [number, number, number][] = data.map(d => [d.lat, d.lon, d.riskScore]);
      
      const heatLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: { 0.2: 'blue', 0.4: 'lime', 0.6: 'yellow', 0.8: 'orange', 1: 'red' }
      }).addTo(map.current);
      
      // Add markers with popups
       data.forEach(d => {
         L.circleMarker([d.lat, d.lon], { radius: 3, color: '#fff', weight: 1, fillOpacity: 0.6 })
           .addTo(map.current)
           .bindPopup(`<b>${d.name}</b><br>Risk Score: ${d.riskScore.toFixed(2)}`);
       });

      return () => {
        if (map.current) {
          map.current.removeLayer(heatLayer);
        }
      };
    }
  }, [data]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Heatmap;
