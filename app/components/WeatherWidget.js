import React from "react";

export default function WeatherWidget({ temperature, humidity, windSpeed }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Weather Conditions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Current atmospheric data</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Temperature */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Temperature</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{temperature}°C</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Feels like</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{temperature + 2}°C</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Humidity</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{humidity}%</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Dew point</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{Math.round(temperature - (100 - humidity) / 5)}°C</div>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Wind Speed</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{windSpeed} km/h</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Direction</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">NE</div>
          </div>
        </div>
      </div>

      {/* Weather Summary */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">Weather Summary</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {temperature > 30 ? "Hot" : temperature > 20 ? "Warm" : temperature > 10 ? "Cool" : "Cold"}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {humidity > 70 ? "High humidity" : humidity > 40 ? "Moderate humidity" : "Low humidity"} • 
          {windSpeed > 15 ? " Strong winds" : windSpeed > 8 ? " Moderate winds" : " Light winds"}
        </div>
      </div>
    </div>
  );
} 