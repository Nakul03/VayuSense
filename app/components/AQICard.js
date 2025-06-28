import React from "react";

function getAQIColor(aqi) {
  if (aqi <= 50) return { bg: "bg-gradient-to-br from-green-400 to-green-600", text: "text-green-800", border: "border-green-300" };
  if (aqi <= 100) return { bg: "bg-gradient-to-br from-yellow-300 to-yellow-500", text: "text-yellow-800", border: "border-yellow-300" };
  if (aqi <= 200) return { bg: "bg-gradient-to-br from-orange-400 to-orange-600", text: "text-orange-800", border: "border-orange-300" };
  if (aqi <= 300) return { bg: "bg-gradient-to-br from-red-400 to-red-600", text: "text-red-800", border: "border-red-300" };
  if (aqi <= 400) return { bg: "bg-gradient-to-br from-purple-500 to-purple-700", text: "text-purple-800", border: "border-purple-300" };
  return { bg: "bg-gradient-to-br from-red-700 to-red-900", text: "text-red-100", border: "border-red-600" };
}

function getAQILevel(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Unhealthy for Sensitive Groups";
  if (aqi <= 300) return "Unhealthy";
  if (aqi <= 400) return "Very Unhealthy";
  return "Hazardous";
}

function getAQIMessage(aqi) {
  if (aqi <= 50) return "Air quality is satisfactory, and air pollution poses little or no risk.";
  if (aqi <= 100) return "Air quality is acceptable; however, some pollutants may be a concern for a small number of people.";
  if (aqi <= 200) return "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
  if (aqi <= 300) return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.";
  if (aqi <= 400) return "Health alert: everyone may experience more serious health effects.";
  return "Health warning of emergency conditions: the entire population is more likely to be affected.";
}

function getAQIIcon(aqi) {
  if (aqi <= 50) return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
  if (aqi <= 100) return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}

export default function AQICard({ aqi }) {
  const colors = getAQIColor(aqi);
  const level = getAQILevel(aqi);
  const message = getAQIMessage(aqi);

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-xl border-2 ${colors.border} ${colors.bg} transform hover:scale-105 transition-all duration-300`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
          <div className="w-full h-full rounded-full bg-white"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-12 translate-y-12">
          <div className="w-full h-full rounded-full bg-white"></div>
        </div>
      </div>

      <div className="relative p-6 text-center">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4 ${colors.text}`}>
          {getAQIIcon(aqi)}
        </div>

        {/* AQI Value */}
        <div className="mb-2">
          <div className={`text-5xl font-bold ${colors.text} mb-1`}>
            {aqi}
          </div>
          <div className={`text-lg font-semibold ${colors.text}`}>
            {level}
          </div>
        </div>

        {/* Message */}
        <div className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
          {message}
        </div>

        {/* Status Indicator */}
        <div className="mt-4 flex justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm ${colors.text}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${colors.text.replace('text-', 'bg-')}`}></div>
            Real-time Data
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
    </div>
  );
} 