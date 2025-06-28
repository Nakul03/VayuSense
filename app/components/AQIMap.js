import React, { useState, useEffect } from "react";

// Sample heatmap data positioned on India map
const HEATMAP_DATA = [
  // Indore Region (Central India)
  { x: 35, y: 45, aqi: 85, name: "Indore City", region: "Indore" },
  { x: 38, y: 48, aqi: 72, name: "Mhow", region: "Indore" },
  { x: 32, y: 50, aqi: 68, name: "Depalpur", region: "Indore" },
  { x: 42, y: 42, aqi: 78, name: "Sanwer", region: "Indore" },
  { x: 28, y: 48, aqi: 65, name: "Hatod", region: "Indore" },
  { x: 45, y: 45, aqi: 70, name: "Betma", region: "Indore" },
  
  // Bhopal Region (Central India)
  { x: 40, y: 40, aqi: 95, name: "Bhopal City", region: "Bhopal" },
  { x: 45, y: 42, aqi: 82, name: "Berasia", region: "Bhopal" },
  { x: 35, y: 35, aqi: 88, name: "Huzur", region: "Bhopal" },
  { x: 50, y: 45, aqi: 79, name: "Phanda", region: "Bhopal" },
  { x: 55, y: 50, aqi: 85, name: "Vidisha", region: "Bhopal" },
  { x: 60, y: 42, aqi: 76, name: "Sehore", region: "Bhopal" },
  
  // Nagpur Region (Central India)
  { x: 65, y: 55, aqi: 110, name: "Nagpur City", region: "Nagpur" },
  { x: 70, y: 60, aqi: 95, name: "Katol", region: "Nagpur" },
  { x: 75, y: 50, aqi: 88, name: "Narkhed", region: "Nagpur" },
  { x: 80, y: 45, aqi: 92, name: "Kalmeshwar", region: "Nagpur" },
  { x: 85, y: 40, aqi: 105, name: "Kamptee", region: "Nagpur" },
  { x: 90, y: 50, aqi: 98, name: "Umred", region: "Nagpur" },
  
  // Raipur Region (Central India)
  { x: 30, y: 70, aqi: 75, name: "Raipur City", region: "Raipur" },
  { x: 35, y: 75, aqi: 68, name: "Abhanpur", region: "Raipur" },
  { x: 40, y: 80, aqi: 72, name: "Arang", region: "Raipur" },
  { x: 25, y: 85, aqi: 65, name: "Dharsiwa", region: "Raipur" },
  { x: 45, y: 70, aqi: 70, name: "Tilda", region: "Raipur" },
  { x: 50, y: 75, aqi: 73, name: "Bhatapara", region: "Raipur" },
  
  // Jabalpur Region (Central India)
  { x: 20, y: 90, aqi: 90, name: "Jabalpur City", region: "Jabalpur" },
  { x: 25, y: 95, aqi: 78, name: "Sihora", region: "Jabalpur" },
  { x: 30, y: 100, aqi: 82, name: "Patan", region: "Jabalpur" },
  { x: 35, y: 95, aqi: 75, name: "Kundam", region: "Jabalpur" },
  { x: 40, y: 90, aqi: 80, name: "Shahpura", region: "Jabalpur" },
  { x: 45, y: 95, aqi: 72, name: "Majholi", region: "Jabalpur" },
  
  // Rural Areas (scattered across India)
  { x: 10, y: 30, aqi: 45, name: "Rural Cluster 1", region: "Rural" },
  { x: 15, y: 35, aqi: 42, name: "Rural Cluster 2", region: "Rural" },
  { x: 20, y: 40, aqi: 48, name: "Rural Cluster 3", region: "Rural" },
  { x: 25, y: 45, aqi: 40, name: "Rural Cluster 4", region: "Rural" },
  { x: 30, y: 50, aqi: 46, name: "Rural Cluster 5", region: "Rural" },
  { x: 35, y: 55, aqi: 43, name: "Rural Cluster 6", region: "Rural" },
];

function getAQIColor(aqi) {
  if (aqi <= 50) return "rgba(0, 255, 0, 0.7)"; // Green
  if (aqi <= 100) return "rgba(255, 255, 0, 0.7)"; // Yellow
  if (aqi <= 200) return "rgba(255, 165, 0, 0.7)"; // Orange
  if (aqi <= 300) return "rgba(255, 0, 0, 0.7)"; // Red
  return "rgba(128, 0, 128, 0.7)"; // Purple
}

function getAQILevel(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default function AQIMap() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [animatedAQI, setAnimatedAQI] = useState(85);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animate AQI value
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setAnimatedAQI(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(30, Math.min(150, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Regional Air Quality Heatmap</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Real-time AQI distribution across India</p>
        </div>
      </div>

      {/* Interactive Heatmap with India Map */}
      <div className="relative mb-6">
        <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 relative overflow-hidden">
          {/* India Map Background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
              {/* Simplified India outline */}
              <path
                d="M20 30 Q25 25 30 30 Q35 35 40 30 Q45 25 50 30 Q55 35 60 30 Q65 25 70 30 Q75 35 80 30 Q85 25 90 30 L85 40 Q80 45 75 40 Q70 35 65 40 Q60 45 55 40 Q50 35 45 40 Q40 45 35 40 Q30 35 25 40 Q20 45 15 40 Z"
                fill="currentColor"
                className="text-gray-400"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* State boundaries (simplified) */}
              <path
                d="M30 35 Q35 30 40 35 Q45 40 50 35 Q55 30 60 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-gray-300"
              />
              <path
                d="M50 35 Q55 40 60 35 Q65 30 70 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-gray-300"
              />
              <path
                d="M25 40 Q30 45 35 40 Q40 35 45 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-gray-300"
              />
            </svg>
          </div>

          {/* Heatmap Points */}
          {HEATMAP_DATA.map((point, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-150 hover:z-10"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"
                style={{ backgroundColor: getAQIColor(point.aqi) }}
              ></div>
              
              {/* Hover Tooltip */}
              {hoveredPoint === point && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-3 z-20 min-w-32">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{point.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{point.region}</div>
                  <div className="text-lg font-bold" style={{ color: getAQIColor(point.aqi).replace('0.7)', '1)') }}>
                    AQI: {point.aqi}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{getAQILevel(point.aqi)}</div>
                </div>
              )}
            </div>
          ))}

          {/* Region Labels */}
          <div className="absolute top-2 left-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            Central India
          </div>
          <div className="absolute top-2 right-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            Maharashtra
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            Chhattisgarh
          </div>
          <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            Madhya Pradesh
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-3">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">AQI Levels</div>
            <div className="space-y-1">
              {[
                { level: "Good", range: "0-50", color: "rgba(0, 255, 0, 0.7)" },
                { level: "Moderate", range: "51-100", color: "rgba(255, 255, 0, 0.7)" },
                { level: "Unhealthy", range: "101-200", color: "rgba(255, 165, 0, 0.7)" },
                { level: "Very Unhealthy", range: "201-300", color: "rgba(255, 0, 0, 0.7)" },
                { level: "Hazardous", range: "301+", color: "rgba(128, 0, 128, 0.7)" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Moving AQI Graph */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-white">Live AQI Monitor</h4>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isAnimating 
                ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
            }`}
          >
            {isAnimating ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(animatedAQI)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getAQILevel(animatedAQI)} Air Quality
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
              <div className="text-lg font-semibold" style={{ color: getAQIColor(animatedAQI).replace('0.7)', '1)') }}>
                {getAQILevel(animatedAQI)}
              </div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.min((animatedAQI / 300) * 100, 100)}%`,
                backgroundColor: getAQIColor(animatedAQI).replace('0.7)', '1)')
              }}
            ></div>
          </div>

          {/* Real-time Indicators */}
          <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Good (0-50)</span>
            <span>Moderate (51-100)</span>
            <span>Unhealthy (101-200)</span>
            <span>Very Unhealthy (201-300)</span>
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {HEATMAP_DATA.filter(p => p.aqi <= 50).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Good</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {HEATMAP_DATA.filter(p => p.aqi > 50 && p.aqi <= 100).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Moderate</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {HEATMAP_DATA.filter(p => p.aqi > 100).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Poor</div>
          </div>
        </div>
      </div>
    </div>
  );
} 