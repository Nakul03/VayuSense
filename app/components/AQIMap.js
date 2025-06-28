import React, { useState } from "react";

// Sample PM2.5 data for regions (μg/m³)
const REGION_DATA = [
  { name: "Punjab/Haryana/Delhi", pm25: 180, label: "Very Unhealthy", emoji: "😷", color: "#ff6666" },
  { name: "UP/Bihar", pm25: 120, label: "Unhealthy", emoji: "😷", color: "#ffb347" },
  { name: "Central India", pm25: 80, label: "Moderate", emoji: "😐", color: "#ffe066" },
  { name: "West India", pm25: 55, label: "Satisfactory", emoji: "🙂", color: "#b6e388" },
  { name: "South India", pm25: 28, label: "Good", emoji: "😊", color: "#4caf50" },
  { name: "East India", pm25: 65, label: "Moderate", emoji: "😐", color: "#ffe066" },
  { name: "North East", pm25: 22, label: "Good", emoji: "😊", color: "#4caf50" },
];

const ZONES = [
  // These are rough SVG polygons for demo purposes
  { name: "Punjab/Haryana/Delhi", points: "18,10 32,10 38,22 30,28 20,22", idx: 0 },
  { name: "UP/Bihar", points: "38,22 50,18 60,28 52,36 40,32 30,28", idx: 1 },
  { name: "Central India", points: "30,28 40,32 52,36 48,50 36,48 28,38", idx: 2 },
  { name: "West India", points: "18,40 28,38 36,48 32,60 20,58 14,48", idx: 3 },
  { name: "South India", points: "20,58 32,60 36,72 28,90 16,80 14,68", idx: 4 },
  { name: "East India", points: "52,36 60,28 70,38 66,52 56,54 48,50", idx: 5 },
  { name: "North East", points: "70,38 80,30 88,38 86,52 76,54 66,52", idx: 6 },
];

const LEGEND = [
  { label: "Good", range: "<30", color: "#4caf50", emoji: "😊" },
  { label: "Satisfactory", range: "31-60", color: "#b6e388", emoji: "🙂" },
  { label: "Moderate", range: "61-90", color: "#ffe066", emoji: "😐" },
  { label: "Unhealthy", range: "91-120", color: "#ffb347", emoji: "😷" },
  { label: "Very Unhealthy", range: "121-250", color: "#ff6666", emoji: "😷" },
  { label: "Hazardous", range: ">250", color: "#bdbdbd", emoji: "☠️" },
];

export default function AQIMap() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 w-full" style={{ minHeight: 520, minWidth: 520 }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-red-400 rounded-lg flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">India PM2.5 Heatmap</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">Concentration of Particulate Matter (PM2.5) by region</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* India Map SVG */}
        <div className="relative" style={{ width: 400, height: 480 }}>
          <svg viewBox="0 0 100 100" width={400} height={480} className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {/* India outline (simplified) */}
            <path d="M10,20 Q30,10 50,20 Q70,30 90,20 L85,40 Q80,60 70,80 Q50,90 30,80 Q20,60 15,40 Z" fill="#f5f5f5" stroke="#bbb" strokeWidth="1.5" />
            {/* Regions */}
            {ZONES.map((zone, i) => {
              const region = REGION_DATA[zone.idx];
              return (
                <polygon
                  key={zone.name}
                  points={zone.points}
                  fill={region.color}
                  stroke="#888"
                  strokeWidth={hovered === i ? 2.5 : 1.2}
                  opacity={hovered === i ? 0.95 : 0.8}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                />
              );
            })}
            {/* Region labels */}
            {ZONES.map((zone, i) => {
              const region = REGION_DATA[zone.idx];
              const [x, y] = zone.points.split(" ")[0].split(",").map(Number);
              return (
                <text
                  key={zone.name + "-label"}
                  x={x + 2}
                  y={y + 8}
                  fontSize={6}
                  fill="#222"
                  fontWeight="bold"
                  style={{ pointerEvents: "none" }}
                >
                  {region.emoji}
                </text>
              );
            })}
          </svg>
          {/* Tooltip */}
          {hovered !== null && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" style={{ minWidth: 180, background: "rgba(255,255,255,0.97)", borderRadius: 12, boxShadow: "0 4px 24px #0002", padding: 16, border: "1.5px solid #bbb" }}>
              <div className="font-bold text-lg mb-1">{REGION_DATA[ZONES[hovered].idx].name}</div>
              <div className="text-base mb-1">{REGION_DATA[ZONES[hovered].idx].emoji} <span className="font-semibold">{REGION_DATA[ZONES[hovered].idx].label}</span></div>
              <div className="text-sm text-gray-700">PM2.5: <span className="font-bold">{REGION_DATA[ZONES[hovered].idx].pm25} μg/m³</span></div>
            </div>
          )}
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600 shadow-md min-w-[200px]">
          <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Particulate Matter (PM2.5) in μg/m³</div>
          {LEGEND.map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xl" style={{ filter: "grayscale(0.2)" }}>{item.emoji}</span>
              <span className="w-6 h-4 rounded-sm inline-block" style={{ background: item.color, border: "1px solid #bbb" }}></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-24">{item.label}</span>
              <span className="text-xs text-gray-500">{item.range}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-xs text-gray-500 text-center">Source: India Air Quality Forecasts (urbanemission.info) • Demo data</div>
    </div>
  );
} 