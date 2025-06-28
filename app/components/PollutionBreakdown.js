import React from "react";

function getPollutantColor(pollutant) {
  const colors = {
    pm25: { bg: "bg-red-500", text: "text-red-700", border: "border-red-200" },
    pm10: { bg: "bg-orange-500", text: "text-orange-700", border: "border-orange-200" },
    no2: { bg: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200" },
    co: { bg: "bg-purple-500", text: "text-purple-700", border: "border-purple-200" },
  };
  return colors[pollutant] || { bg: "bg-gray-500", text: "text-gray-700", border: "border-gray-200" };
}

function getPollutantName(pollutant) {
  const names = {
    pm25: "PM2.5",
    pm10: "PM10",
    no2: "NO₂",
    co: "CO",
  };
  return names[pollutant] || pollutant.toUpperCase();
}

function getPollutantUnit(pollutant) {
  const units = {
    pm25: "μg/m³",
    pm10: "μg/m³",
    no2: "ppb",
    co: "ppm",
  };
  return units[pollutant] || "";
}

function getPollutantStatus(value, pollutant) {
  const thresholds = {
    pm25: { good: 12, moderate: 35.4, unhealthy: 55.4 },
    pm10: { good: 54, moderate: 154, unhealthy: 254 },
    no2: { good: 53, moderate: 100, unhealthy: 360 },
    co: { good: 4.4, moderate: 9.4, unhealthy: 12.4 },
  };
  
  const threshold = thresholds[pollutant];
  if (!threshold) return { status: "Unknown", color: "text-gray-500" };
  
  if (value <= threshold.good) return { status: "Good", color: "text-green-600" };
  if (value <= threshold.moderate) return { status: "Moderate", color: "text-yellow-600" };
  if (value <= threshold.unhealthy) return { status: "Unhealthy", color: "text-orange-600" };
  return { status: "Very Unhealthy", color: "text-red-600" };
}

export default function PollutionBreakdown({ data }) {
  const pollutants = ['pm25', 'pm10', 'no2', 'co'];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Pollution Breakdown</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Individual pollutant levels</p>
        </div>
      </div>

      <div className="space-y-4">
        {pollutants.map((pollutant) => {
          const value = data[pollutant];
          const colors = getPollutantColor(pollutant);
          const status = getPollutantStatus(value, pollutant);
          
          return (
            <div key={pollutant} className={`p-4 rounded-xl border ${colors.border} bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">{getPollutantName(pollutant)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{getPollutantName(pollutant)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Particulate Matter</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {value} {getPollutantUnit(pollutant)}
                  </div>
                  <div className={`text-sm font-medium ${status.color}`}>
                    {status.status}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${colors.bg} transition-all duration-500`}
                  style={{ 
                    width: `${Math.min((value / 100) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              
              {/* Threshold Indicators */}
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Good</span>
                <span>Moderate</span>
                <span>Unhealthy</span>
                <span>Very Unhealthy</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">Overall Air Quality</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {data.aqi <= 50 ? "Good" : data.aqi <= 100 ? "Moderate" : data.aqi <= 200 ? "Unhealthy for Sensitive Groups" : "Unhealthy"}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Based on the highest concentration of any single pollutant
        </div>
      </div>
    </div>
  );
} 