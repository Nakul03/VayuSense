import React, { useState } from "react";

const LOCATIONS = [
  {
    name: "Indore",
    value: "indore",
    state: "Madhya Pradesh",
    talukas: [
      { name: "Indore City", value: "indore_city", aqi: 85, population: "2.1M" },
      { name: "Mhow", value: "mhow", aqi: 72, population: "85K" },
      { name: "Depalpur", value: "depalpur", aqi: 68, population: "45K" },
      { name: "Sanwer", value: "sanwer", aqi: 78, population: "62K" },
      { name: "Hatod", value: "hatod", aqi: 65, population: "38K" },
      { name: "Betma", value: "betma", aqi: 70, population: "52K" }
    ]
  },
  {
    name: "Bhopal",
    value: "bhopal",
    state: "Madhya Pradesh",
    talukas: [
      { name: "Bhopal City", value: "bhopal_city", aqi: 95, population: "1.8M" },
      { name: "Berasia", value: "berasia", aqi: 82, population: "75K" },
      { name: "Huzur", value: "huzur", aqi: 88, population: "95K" },
      { name: "Phanda", value: "phanda", aqi: 79, population: "68K" },
      { name: "Vidisha", value: "vidisha", aqi: 85, population: "155K" },
      { name: "Sehore", value: "sehore", aqi: 76, population: "108K" }
    ]
  },
  {
    name: "Nagpur",
    value: "nagpur",
    state: "Maharashtra",
    talukas: [
      { name: "Nagpur City", value: "nagpur_city", aqi: 110, population: "2.9M" },
      { name: "Katol", value: "katol", aqi: 95, population: "45K" },
      { name: "Narkhed", value: "narkhed", aqi: 88, population: "52K" },
      { name: "Kalmeshwar", value: "kalmeshwar", aqi: 92, population: "38K" },
      { name: "Kamptee", value: "kamptee", aqi: 105, population: "86K" },
      { name: "Umred", value: "umred", aqi: 98, population: "72K" }
    ]
  },
  {
    name: "Raipur",
    value: "raipur",
    state: "Chhattisgarh",
    talukas: [
      { name: "Raipur City", value: "raipur_city", aqi: 75, population: "1.4M" },
      { name: "Abhanpur", value: "abhanpur", aqi: 68, population: "42K" },
      { name: "Arang", value: "arang", aqi: 72, population: "58K" },
      { name: "Dharsiwa", value: "dharsiwa", aqi: 65, population: "35K" },
      { name: "Tilda", value: "tilda", aqi: 70, population: "48K" },
      { name: "Bhatapara", value: "bhatapara", aqi: 73, population: "82K" }
    ]
  },
  {
    name: "Jabalpur",
    value: "jabalpur",
    state: "Madhya Pradesh",
    talukas: [
      { name: "Jabalpur City", value: "jabalpur_city", aqi: 90, population: "1.2M" },
      { name: "Sihora", value: "sihora", aqi: 78, population: "65K" },
      { name: "Patan", value: "patan", aqi: 82, population: "45K" },
      { name: "Kundam", value: "kundam", aqi: 75, population: "38K" },
      { name: "Shahpura", value: "shahpura", aqi: 80, population: "52K" },
      { name: "Majholi", value: "majholi", aqi: 72, population: "42K" }
    ]
  },
  // {
  //   name: "Rural Area",
  //   value: "rural",
  //   state: "Various States",
  //   talukas: [
  //     { name: "Village Cluster 1", value: "rural_cluster1", aqi: 45, population: "15K" },
  //     { name: "Village Cluster 2", value: "rural_cluster2", aqi: 42, population: "12K" },
  //     { name: "Village Cluster 3", value: "rural_cluster3", aqi: 48, population: "18K" },
  //     { name: "Village Cluster 4", value: "rural_cluster4", aqi: 40, population: "10K" },
  //     { name: "Village Cluster 5", value: "rural_cluster5", aqi: 46, population: "14K" },
  //     { name: "Village Cluster 6", value: "rural_cluster6", aqi: 43, population: "11K" }
  //   ]
  // }
];

export default function LocationSelector({ value, onChange }) {
  const [expandedCity, setExpandedCity] = useState(null);
  const [selectedTaluka, setSelectedTaluka] = useState(null);

  const handleCityClick = (cityValue) => {
    if (expandedCity === cityValue) {
      setExpandedCity(null);
      setSelectedTaluka(null);
    } else {
      setExpandedCity(cityValue);
      setSelectedTaluka(null);
    }
  };

  const handleTalukaSelect = (talukaValue) => {
    setSelectedTaluka(talukaValue);
    onChange(talukaValue);
    setExpandedCity(null);
  };

  const getSelectedLocationInfo = () => {
    const selectedLocation = LOCATIONS.find(loc => 
      loc.value === value || loc.talukas.some(t => t.value === value)
    );
    
    if (!selectedLocation) return null;

    const selectedTaluka = selectedLocation.talukas.find(t => t.value === value);
    return {
      city: selectedLocation.name,
      taluka: selectedTaluka ? selectedTaluka.name : selectedLocation.name,
      aqi: selectedTaluka ? selectedTaluka.aqi : 85,
      population: selectedTaluka ? selectedTaluka.population : "2.1M"
    };
  };

  const selectedInfo = getSelectedLocationInfo();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Select Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Choose a city and taluka to view air quality data</p>
          </div>
        </div>

        {/* Selected Location Display */}
        {selectedInfo && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{selectedInfo.taluka}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{selectedInfo.city}, {LOCATIONS.find(l => l.name === selectedInfo.city)?.state}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">AQI: {selectedInfo.aqi}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pop: {selectedInfo.population}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LOCATIONS.map(loc => (
            <div key={loc.value} className="space-y-2">
              <button
                onClick={() => handleCityClick(loc.value)}
                className={`relative w-full p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  expandedCity === loc.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">{loc.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{loc.state}</div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${expandedCity === loc.value ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Talukas Dropdown */}
              {expandedCity === loc.value && (
                <div className="ml-4 space-y-1">
                  {loc.talukas.map(taluka => (
                    <button
                      key={taluka.value}
                      onClick={() => handleTalukaSelect(taluka.value)}
                      className={`w-full p-3 rounded-lg border transition-all duration-200 hover:shadow-sm text-left ${
                        value === taluka.value
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{taluka.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Population: {taluka.population}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${
                            taluka.aqi <= 50 ? 'text-green-600' :
                            taluka.aqi <= 100 ? 'text-yellow-600' :
                            taluka.aqi <= 200 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            AQI: {taluka.aqi}
                          </div>
                          {value === taluka.value && (
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1 ml-auto"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Stats</div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{LOCATIONS.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Cities</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {LOCATIONS.reduce((sum, loc) => sum + loc.talukas.length, 0)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Talukas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round(LOCATIONS.reduce((sum, loc) => 
                  sum + loc.talukas.reduce((tSum, t) => tSum + t.aqi, 0) / loc.talukas.length, 0
                ) / LOCATIONS.length)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Avg AQI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 