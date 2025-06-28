import React from "react";

function getAdvice(aqi) {
  if (aqi <= 50) return {
    level: "Good",
    color: "green",
    icon: "😊",
    recommendations: [
      "Enjoy outdoor activities without restrictions",
      "Perfect conditions for outdoor exercise",
      "No health effects expected",
      "Ideal for children and elderly"
    ],
    activities: ["Outdoor sports", "Walking", "Cycling", "Gardening"]
  };
  if (aqi <= 100) return {
    level: "Moderate",
    color: "yellow",
    icon: "😐",
    recommendations: [
      "Sensitive individuals should consider reducing outdoor exertion",
      "Unusually sensitive people may experience respiratory symptoms",
      "Consider wearing a mask if you have respiratory conditions",
      "Monitor symptoms and reduce activity if needed"
    ],
    activities: ["Light outdoor activities", "Walking", "Avoid strenuous exercise"]
  };
  if (aqi <= 200) return {
    level: "Unhealthy for Sensitive Groups",
    color: "orange",
    icon: "😷",
    recommendations: [
      "People with heart/lung disease, children and older adults should limit prolonged exertion",
      "Consider wearing an N95 mask outdoors",
      "Reduce outdoor activities, especially during peak hours",
      "Use air purifiers indoors"
    ],
    activities: ["Indoor activities", "Short outdoor trips", "Avoid outdoor exercise"]
  };
  if (aqi <= 300) return {
    level: "Unhealthy",
    color: "red",
    icon: "🤢",
    recommendations: [
      "Everyone should reduce outdoor exertion",
      "Sensitive groups should avoid outdoor activities entirely",
      "Wear N95 masks when outdoors",
      "Keep windows closed and use air purifiers",
      "Consider staying indoors"
    ],
    activities: ["Indoor activities only", "Avoid all outdoor exercise", "Use air purifiers"]
  };
  if (aqi <= 400) return {
    level: "Very Unhealthy",
    color: "purple",
    icon: "🤮",
    recommendations: [
      "Avoid outdoor activities completely",
      "Everyone may experience serious health effects",
      "Wear N95 masks if you must go outside",
      "Use high-efficiency air purifiers",
      "Consider evacuating if possible"
    ],
    activities: ["Stay indoors", "Use air purifiers", "Avoid all outdoor activities"]
  };
  return {
    level: "Hazardous",
    color: "maroon",
    icon: "☠️",
    recommendations: [
      "Stay indoors at all times",
      "Use high-efficiency air purifiers",
      "Seek medical attention if feeling unwell",
      "Consider evacuating the area",
      "Emergency conditions - protect yourself"
    ],
    activities: ["Emergency shelter", "Medical attention if needed", "Evacuation if possible"]
  };
}

function getColorClasses(color) {
  const colors = {
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-700",
      text: "text-green-800 dark:text-green-200",
      icon: "bg-green-500"
    },
    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-700",
      text: "text-yellow-800 dark:text-yellow-200",
      icon: "bg-yellow-500"
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-700",
      text: "text-orange-800 dark:text-orange-200",
      icon: "bg-orange-500"
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-700",
      text: "text-red-800 dark:text-red-200",
      icon: "bg-red-500"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-700",
      text: "text-purple-800 dark:text-purple-200",
      icon: "bg-purple-500"
    },
    maroon: {
      bg: "bg-red-100 dark:bg-red-900/30",
      border: "border-red-300 dark:border-red-600",
      text: "text-red-900 dark:text-red-100",
      icon: "bg-red-700"
    }
  };
  return colors[color] || colors.green;
}

export default function HealthAdvice({ aqi }) {
  const advice = getAdvice(aqi);
  const colors = getColorClasses(advice.color);

  return (
    <div className={`rounded-2xl shadow-lg p-6 border-2 ${colors.border} ${colors.bg}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center text-white text-xl`}>
          {advice.icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Health Recommendations</h3>
          <p className={`text-sm font-medium ${colors.text}`}>{advice.level} Air Quality</p>
        </div>
      </div>

      {/* Key Recommendations */}
      <div className="space-y-3 mb-6">
        {advice.recommendations.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`w-2 h-2 ${colors.icon} rounded-full mt-2 flex-shrink-0`}></div>
            <p className={`text-sm ${colors.text} leading-relaxed`}>{item}</p>
          </div>
        ))}
      </div>

      {/* Recommended Activities */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recommended Activities</h4>
        <div className="flex flex-wrap gap-2">
          {advice.activities.map((activity, idx) => (
            <span 
              key={idx} 
              className={`px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-gray-700/50 ${colors.text} border ${colors.border}`}
            >
              {activity}
            </span>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      {aqi > 200 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-red-900 dark:text-red-100">Emergency Alert</div>
              <div className="text-xs text-red-700 dark:text-red-200">
                Seek medical attention if you experience breathing difficulties
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Health Tips */}
      <div className="mt-4 p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
        <div className="text-xs text-gray-600 dark:text-gray-300">
          <strong>Pro Tip:</strong> Check air quality before planning outdoor activities. 
          {aqi > 100 && " Consider using air purifiers and wearing appropriate masks."}
        </div>
      </div>
    </div>
  );
} 