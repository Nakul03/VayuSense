import React, { useState, useEffect } from "react";

function getTrendDirection(data) {
  if (data.length < 2) return { direction: "stable", color: "text-gray-500", icon: "→" };
  
  const recent = data.slice(-3).reduce((sum, item) => sum + item.aqi, 0) / 3;
  const earlier = data.slice(0, 3).reduce((sum, item) => sum + item.aqi, 0) / 3;
  
  const change = recent - earlier;
  const percentChange = (change / earlier) * 100;
  
  if (Math.abs(percentChange) < 5) return { direction: "stable", color: "text-gray-500", icon: "→" };
  if (percentChange > 0) return { direction: "increasing", color: "text-red-500", icon: "↗" };
  return { direction: "decreasing", color: "text-green-500", icon: "↘" };
}

function getAQIColor(aqi) {
  if (aqi <= 50) return "bg-green-400";
  if (aqi <= 100) return "bg-yellow-400";
  if (aqi <= 200) return "bg-orange-400";
  if (aqi <= 300) return "bg-red-400";
  return "bg-purple-500";
}

export default function AirQualityTrends({ data }) {
  const [liveData, setLiveData] = useState(data);
  const [isLive, setIsLive] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate live moving data
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveData(prevData => {
        const newData = [...prevData];
        
        // Update current data point with random variation
        const currentPoint = newData[currentIndex];
        const variation = (Math.random() - 0.5) * 8; // ±4 AQI variation
        const newAQI = Math.max(30, Math.min(150, currentPoint.aqi + variation));
        
        newData[currentIndex] = {
          ...currentPoint,
          aqi: Math.round(newAQI),
          pm25: Math.round(currentPoint.pm25 + (Math.random() - 0.5) * 4),
          pm10: Math.round(currentPoint.pm10 + (Math.random() - 0.5) * 6),
          no2: Math.round(currentPoint.no2 + (Math.random() - 0.5) * 3),
          co: Math.round((currentPoint.co + (Math.random() - 0.5) * 0.2) * 10) / 10
        };

        // Move to next data point
        setCurrentIndex((prev) => (prev + 1) % newData.length);
        
        return newData;
      });
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval);
  }, [isLive, currentIndex]);

  const trend = getTrendDirection(liveData);
  const maxAQI = Math.max(...liveData.map(d => d.aqi));
  const minAQI = Math.min(...liveData.map(d => d.aqi));
  const avgAQI = Math.round(liveData.reduce((sum, d) => sum + d.aqi, 0) / liveData.length);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Live Air Quality Trends</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Real-time 7-day historical analysis</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            isLive 
              ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' 
              : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
          }`}
        >
          {isLive ? 'Live' : 'Paused'}
        </button>
      </div>

      {/* Live Status Indicator */}
      {isLive && (
        <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Data Streaming</span>
            <span className="text-xs text-green-600 dark:text-green-400">• Updating every 1.5s</span>
          </div>
        </div>
      )}

      {/* Trend Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{trend.icon}</span>
            <span className={`text-sm font-medium ${trend.color}`}>
              {trend.direction.charAt(0).toUpperCase() + trend.direction.slice(1)}
            </span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Trend Direction</div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{avgAQI}</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Average AQI</div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{maxAQI}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Peak</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{minAQI}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Lowest</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{maxAQI - minAQI}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Range</div>
        </div>
      </div>

      {/* Live Mini Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live AQI Values</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Last 7 days</span>
        </div>
        <div className="flex items-end justify-between h-24 gap-1">
          {liveData.map((item, index) => {
            const height = (item.aqi / maxAQI) * 100;
            const isActive = index === currentIndex && isLive;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t transition-all duration-500 ${getAQIColor(item.aqi)} ${
                    isActive ? 'animate-pulse shadow-lg' : ''
                  }`}
                  style={{ height: `${Math.max(height, 10)}%` }}
                >
                  {isActive && (
                    <div className="w-full h-full bg-white/20 animate-ping rounded-t"></div>
                  )}
                </div>
                <div className={`text-xs mt-1 transition-colors ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.date}
                </div>
                {isActive && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {item.aqi}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality Distribution */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality Distribution</div>
        <div className="space-y-2">
          {[
            { label: "Good", range: "0-50", count: liveData.filter(d => d.aqi <= 50).length, color: "bg-green-400" },
            { label: "Moderate", range: "51-100", count: liveData.filter(d => d.aqi > 50 && d.aqi <= 100).length, color: "bg-yellow-400" },
            { label: "Unhealthy", range: "101-200", count: liveData.filter(d => d.aqi > 100 && d.aqi <= 200).length, color: "bg-orange-400" },
            { label: "Very Unhealthy", range: "201+", count: liveData.filter(d => d.aqi > 200).length, color: "bg-red-400" },
          ].map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{category.label}</span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {category.count} days
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Live Trend Insight</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {isLive ? (
                <>
                  {trend.direction === "increasing" 
                    ? "Air quality is currently deteriorating. Consider reducing outdoor activities."
                    : trend.direction === "decreasing"
                    ? "Air quality is improving. Conditions are getting better."
                    : "Air quality has remained relatively stable."
                  }
                  <br />
                  <span className="font-medium">Current AQI: {liveData[currentIndex]?.aqi || avgAQI}</span>
                </>
              ) : (
                "Data streaming paused. Click 'Live' to resume real-time updates."
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Data Update Info */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span>Active point: {liveData[currentIndex]?.date || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
} 