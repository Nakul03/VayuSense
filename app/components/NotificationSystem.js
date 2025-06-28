import React, { useState, useEffect } from "react";

// Demo notification data
const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    type: "warning",
    title: "High AQI Alert",
    message: "Air quality in Indore City has reached unhealthy levels (AQI: 95). Consider reducing outdoor activities.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    location: "Indore City",
    aqi: 95,
    read: false
  },
  {
    id: 2,
    type: "info",
    title: "Weather Advisory",
    message: "High humidity levels detected. This may worsen air quality conditions in the next few hours.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    location: "Regional",
    read: false
  },
  {
    id: 3,
    type: "success",
    title: "Air Quality Improved",
    message: "AQI levels in Mhow have improved from 78 to 65. Outdoor activities can be resumed.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    location: "Mhow",
    aqi: 65,
    read: true
  },
  {
    id: 4,
    type: "danger",
    title: "Emergency Alert",
    message: "Critical air quality levels detected in Nagpur City (AQI: 125). Avoid all outdoor activities immediately.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    location: "Nagpur City",
    aqi: 125,
    read: false
  }
];

// Precaution messages based on AQI levels
const PRECAUTION_MESSAGES = {
  good: {
    title: "Good Air Quality",
    message: "Air quality is satisfactory. Enjoy outdoor activities as usual.",
    icon: "🌤️",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  moderate: {
    title: "Moderate Air Quality",
    message: "Sensitive individuals should consider reducing prolonged outdoor activities.",
    icon: "🌤️",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  unhealthy: {
    title: "Unhealthy Air Quality",
    message: "Reduce outdoor activities. Sensitive groups should avoid outdoor exertion.",
    icon: "😷",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  veryUnhealthy: {
    title: "Very Unhealthy Air Quality",
    message: "Avoid outdoor activities. Everyone may experience health effects.",
    icon: "⚠️",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  hazardous: {
    title: "Hazardous Air Quality",
    message: "Emergency conditions. Avoid all outdoor activities. Stay indoors.",
    icon: "🚨",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  }
};

function getAQILevel(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "veryUnhealthy";
  return "hazardous";
}

function getNotificationIcon(type) {
  switch (type) {
    case "warning": return "⚠️";
    case "info": return "ℹ️";
    case "success": return "✅";
    case "danger": return "🚨";
    default: return "📢";
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "info": return "text-blue-600 bg-blue-50 border-blue-200";
    case "success": return "text-green-600 bg-green-50 border-green-200";
    case "danger": return "text-red-600 bg-red-50 border-red-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export default function NotificationSystem({ currentAQI, currentLocation }) {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrecaution, setShowPrecaution] = useState(true);
  const [permission, setPermission] = useState("default");
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Update unread count
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Demo: Generate new notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldGenerate = Math.random() < 0.3; // 30% chance every 10 seconds
      if (shouldGenerate) {
        generateDemoNotification();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const generateDemoNotification = () => {
    const types = ["warning", "info", "success", "danger"];
    const locations = ["Indore City", "Bhopal City", "Nagpur City", "Raipur City", "Jabalpur City"];
    const type = types[Math.floor(Math.random() * types.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    const messages = {
      warning: `AQI levels in ${location} are approaching unhealthy levels. Monitor air quality closely.`,
      info: `Weather conditions may affect air quality in ${location} in the next few hours.`,
      success: `Air quality in ${location} has improved significantly.`,
      danger: `Critical air quality alert for ${location}. Take immediate precautions.`
    };

    const newNotification = {
      id: Date.now(),
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
      message: messages[type],
      timestamp: new Date(),
      location,
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications

    // Show browser notification if permission granted
    if (permission === "granted") {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: "/favicon.ico",
        badge: "/favicon.ico"
      });
    }
  };

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const currentPrecaution = PRECAUTION_MESSAGES[getAQILevel(currentAQI)];

  return (
    <div className="fixed top-20 right-4 z-50 space-y-4">
      {/* Precaution Message */}
      {showPrecaution && (
        <div className={`w-80 p-4 rounded-xl border ${currentPrecaution.bgColor} ${currentPrecaution.borderColor} shadow-lg`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">{currentPrecaution.icon}</div>
            <div className="flex-1">
              <div className={`font-semibold ${currentPrecaution.color} mb-1`}>
                {currentPrecaution.title}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                {currentPrecaution.message}
              </div>
              <div className="text-xs text-gray-500">
                Location: {currentLocation}
              </div>
            </div>
            <button
              onClick={() => setShowPrecaution(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <div className="relative">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v3.75l1.5 1.5H3l1.5-1.5V9.75a6 6 0 0 1 6-6z" />
            </svg>
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </div>
        </button>

        {/* Notification Panel */}
        {showNotifications && (
          <div className="absolute top-14 right-0 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {permission !== "granted" && (
                    <button
                      onClick={requestPermission}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      Enable
                    </button>
                  )}
                  <button
                    onClick={markAllAsRead}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                  >
                    Mark all read
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500 text-xs"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.location}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {unreadCount} unread • Auto-updating every 10s
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 