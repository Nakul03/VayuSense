"use client"
import Image from "next/image";
import { useState } from "react";
import LocationSelector from "./components/LocationSelector";
import AQICard from "./components/AQICard";
import AQIChart from "./components/AQIChart";
import ForecastChart from "./components/ForecastChart";
import HealthAdvice from "./components/HealthAdvice";
import AQIMap from "./components/AQIMap";
import WeatherWidget from "./components/WeatherWidget";
import PollutionBreakdown from "./components/PollutionBreakdown";
import AirQualityTrends from "./components/AirQualityTrends";
import NotificationSystem from "./components/NotificationSystem";

const MOCK_DATA = {
  // Indore Talukas
  indore_city: {
    name: "Indore City",
    city: "Indore",
    state: "Madhya Pradesh",
    aqi: 85,
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    history: [
      { date: "Mon", aqi: 75, pm25: 35, pm10: 65, no2: 25, co: 0.8 },
      { date: "Tue", aqi: 80, pm25: 38, pm10: 70, no2: 28, co: 0.9 },
      { date: "Wed", aqi: 85, pm25: 42, pm10: 75, no2: 30, co: 1.0 },
      { date: "Thu", aqi: 90, pm25: 45, pm10: 80, no2: 32, co: 1.1 },
      { date: "Fri", aqi: 88, pm25: 43, pm10: 78, no2: 31, co: 1.0 },
      { date: "Sat", aqi: 85, pm25: 40, pm10: 75, no2: 29, co: 0.9 },
      { date: "Sun", aqi: 82, pm25: 38, pm10: 72, no2: 27, co: 0.8 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 88, pm25: 45, pm10: 82, no2: 33, co: 1.2 },
      { date: "+2d", aqi: 92, pm25: 48, pm10: 85, no2: 35, co: 1.3 },
      { date: "+3d", aqi: 95, pm25: 50, pm10: 88, no2: 37, co: 1.4 },
    ],
  },
  mhow: {
    name: "Mhow",
    city: "Indore",
    state: "Madhya Pradesh",
    aqi: 72,
    temperature: 26,
    humidity: 70,
    windSpeed: 10,
    history: [
      { date: "Mon", aqi: 65, pm25: 28, pm10: 55, no2: 20, co: 0.6 },
      { date: "Tue", aqi: 68, pm25: 30, pm10: 58, no2: 22, co: 0.7 },
      { date: "Wed", aqi: 72, pm25: 33, pm10: 62, no2: 25, co: 0.8 },
      { date: "Thu", aqi: 75, pm25: 35, pm10: 65, no2: 27, co: 0.9 },
      { date: "Fri", aqi: 73, pm25: 34, pm10: 63, no2: 26, co: 0.8 },
      { date: "Sat", aqi: 70, pm25: 32, pm10: 60, no2: 24, co: 0.7 },
      { date: "Sun", aqi: 68, pm25: 30, pm10: 58, no2: 23, co: 0.6 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 75, pm25: 36, pm10: 68, no2: 28, co: 0.9 },
      { date: "+2d", aqi: 78, pm25: 38, pm10: 72, no2: 30, co: 1.0 },
      { date: "+3d", aqi: 80, pm25: 40, pm10: 75, no2: 32, co: 1.1 },
    ],
  },
  depalpur: {
    name: "Depalpur",
    city: "Indore",
    state: "Madhya Pradesh",
    aqi: 68,
    temperature: 27,
    humidity: 68,
    windSpeed: 8,
    history: [
      { date: "Mon", aqi: 60, pm25: 25, pm10: 50, no2: 18, co: 0.5 },
      { date: "Tue", aqi: 63, pm25: 27, pm10: 53, no2: 20, co: 0.6 },
      { date: "Wed", aqi: 68, pm25: 30, pm10: 58, no2: 23, co: 0.7 },
      { date: "Thu", aqi: 70, pm25: 32, pm10: 60, no2: 25, co: 0.8 },
      { date: "Fri", aqi: 69, pm25: 31, pm10: 59, no2: 24, co: 0.7 },
      { date: "Sat", aqi: 66, pm25: 29, pm10: 56, no2: 22, co: 0.6 },
      { date: "Sun", aqi: 64, pm25: 27, pm10: 54, no2: 21, co: 0.5 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 71, pm25: 33, pm10: 62, no2: 26, co: 0.8 },
      { date: "+2d", aqi: 73, pm25: 35, pm10: 65, no2: 28, co: 0.9 },
      { date: "+3d", aqi: 75, pm25: 37, pm10: 68, no2: 30, co: 1.0 },
    ],
  },
  sanwer: {
    name: "Sanwer",
    city: "Indore",
    state: "Madhya Pradesh",
    aqi: 78,
    temperature: 29,
    humidity: 62,
    windSpeed: 14,
    history: [
      { date: "Mon", aqi: 70, pm25: 32, pm10: 60, no2: 24, co: 0.7 },
      { date: "Tue", aqi: 73, pm25: 35, pm10: 63, no2: 26, co: 0.8 },
      { date: "Wed", aqi: 78, pm25: 38, pm10: 68, no2: 29, co: 0.9 },
      { date: "Thu", aqi: 82, pm25: 40, pm10: 72, no2: 31, co: 1.0 },
      { date: "Fri", aqi: 80, pm25: 39, pm10: 70, no2: 30, co: 0.9 },
      { date: "Sat", aqi: 76, pm25: 36, pm10: 66, no2: 28, co: 0.8 },
      { date: "Sun", aqi: 74, pm25: 34, pm10: 64, no2: 27, co: 0.7 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 83, pm25: 42, pm10: 75, no2: 33, co: 1.1 },
      { date: "+2d", aqi: 86, pm25: 45, pm10: 78, no2: 35, co: 1.2 },
      { date: "+3d", aqi: 88, pm25: 47, pm10: 82, no2: 37, co: 1.3 },
    ],
  },
  hatod: {
    name: "Hatod",
    city: "Indore",
    state: "Madhya Pradesh",
    aqi: 65,
    temperature: 25,
    humidity: 75,
    windSpeed: 6,
    history: [
      { date: "Mon", aqi: 58, pm25: 24, pm10: 48, no2: 17, co: 0.4 },
      { date: "Tue", aqi: 61, pm25: 26, pm10: 51, no2: 19, co: 0.5 },
      { date: "Wed", aqi: 65, pm25: 28, pm10: 55, no2: 22, co: 0.6 },
      { date: "Thu", aqi: 68, pm25: 30, pm10: 58, no2: 24, co: 0.7 },
      { date: "Fri", aqi: 66, pm25: 29, pm10: 56, no2: 23, co: 0.6 },
      { date: "Sat", aqi: 63, pm25: 27, pm10: 53, no2: 21, co: 0.5 },
      { date: "Sun", aqi: 60, pm25: 25, pm10: 50, no2: 20, co: 0.4 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 69, pm25: 31, pm10: 60, no2: 25, co: 0.7 },
      { date: "+2d", aqi: 71, pm25: 33, pm10: 62, no2: 27, co: 0.8 },
      { date: "+3d", aqi: 73, pm25: 35, pm10: 65, no2: 29, co: 0.9 },
    ],
  },
  betma: {
    name: "Betma",
    city: "Indore",
    state: "Madhya Pradesh",
    aqi: 70,
    temperature: 26,
    humidity: 72,
    windSpeed: 9,
    history: [
      { date: "Mon", aqi: 63, pm25: 27, pm10: 52, no2: 20, co: 0.5 },
      { date: "Tue", aqi: 66, pm25: 29, pm10: 55, no2: 22, co: 0.6 },
      { date: "Wed", aqi: 70, pm25: 32, pm10: 60, no2: 25, co: 0.7 },
      { date: "Thu", aqi: 73, pm25: 34, pm10: 63, no2: 27, co: 0.8 },
      { date: "Fri", aqi: 71, pm25: 33, pm10: 61, no2: 26, co: 0.7 },
      { date: "Sat", aqi: 68, pm25: 30, pm10: 58, no2: 24, co: 0.6 },
      { date: "Sun", aqi: 65, pm25: 28, pm10: 55, no2: 23, co: 0.5 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 74, pm25: 35, pm10: 65, no2: 28, co: 0.8 },
      { date: "+2d", aqi: 76, pm25: 37, pm10: 68, no2: 30, co: 0.9 },
      { date: "+3d", aqi: 78, pm25: 39, pm10: 72, no2: 32, co: 1.0 },
    ],
  },

  // Bhopal Talukas
  bhopal_city: {
    name: "Bhopal City",
    city: "Bhopal",
    state: "Madhya Pradesh",
    aqi: 95,
    temperature: 26,
    humidity: 70,
    windSpeed: 8,
    history: [
      { date: "Mon", aqi: 85, pm25: 40, pm10: 70, no2: 30, co: 1.0 },
      { date: "Tue", aqi: 90, pm25: 43, pm10: 75, no2: 32, co: 1.1 },
      { date: "Wed", aqi: 95, pm25: 47, pm10: 80, no2: 35, co: 1.2 },
      { date: "Thu", aqi: 100, pm25: 50, pm10: 85, no2: 38, co: 1.3 },
      { date: "Fri", aqi: 98, pm25: 48, pm10: 82, no2: 36, co: 1.2 },
      { date: "Sat", aqi: 95, pm25: 45, pm10: 78, no2: 34, co: 1.1 },
      { date: "Sun", aqi: 92, pm25: 42, pm10: 75, no2: 32, co: 1.0 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 102, pm25: 52, pm10: 88, no2: 40, co: 1.4 },
      { date: "+2d", aqi: 105, pm25: 55, pm10: 92, no2: 42, co: 1.5 },
      { date: "+3d", aqi: 108, pm25: 58, pm10: 95, no2: 45, co: 1.6 },
    ],
  },
  berasia: {
    name: "Berasia",
    city: "Bhopal",
    state: "Madhya Pradesh",
    aqi: 82,
    temperature: 25,
    humidity: 75,
    windSpeed: 7,
    history: [
      { date: "Mon", aqi: 75, pm25: 35, pm10: 65, no2: 28, co: 0.9 },
      { date: "Tue", aqi: 78, pm25: 37, pm10: 68, no2: 30, co: 1.0 },
      { date: "Wed", aqi: 82, pm25: 40, pm10: 72, no2: 32, co: 1.1 },
      { date: "Thu", aqi: 85, pm25: 42, pm10: 75, no2: 34, co: 1.2 },
      { date: "Fri", aqi: 83, pm25: 41, pm10: 73, no2: 33, co: 1.1 },
      { date: "Sat", aqi: 80, pm25: 38, pm10: 70, no2: 31, co: 1.0 },
      { date: "Sun", aqi: 77, pm25: 36, pm10: 67, no2: 29, co: 0.9 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 87, pm25: 44, pm10: 78, no2: 36, co: 1.3 },
      { date: "+2d", aqi: 90, pm25: 47, pm10: 82, no2: 38, co: 1.4 },
      { date: "+3d", aqi: 92, pm25: 49, pm10: 85, no2: 40, co: 1.5 },
    ],
  },

  // Nagpur Talukas
  nagpur_city: {
    name: "Nagpur City",
    city: "Nagpur",
    state: "Maharashtra",
    aqi: 110,
    temperature: 30,
    humidity: 55,
    windSpeed: 15,
    history: [
      { date: "Mon", aqi: 100, pm25: 48, pm10: 82, no2: 35, co: 1.2 },
      { date: "Tue", aqi: 105, pm25: 52, pm10: 85, no2: 38, co: 1.3 },
      { date: "Wed", aqi: 110, pm25: 55, pm10: 90, no2: 40, co: 1.4 },
      { date: "Thu", aqi: 115, pm25: 58, pm10: 95, no2: 43, co: 1.5 },
      { date: "Fri", aqi: 112, pm25: 56, pm10: 92, no2: 41, co: 1.4 },
      { date: "Sat", aqi: 108, pm25: 53, pm10: 88, no2: 39, co: 1.3 },
      { date: "Sun", aqi: 105, pm25: 50, pm10: 85, no2: 37, co: 1.2 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 118, pm25: 60, pm10: 98, no2: 45, co: 1.6 },
      { date: "+2d", aqi: 122, pm25: 63, pm10: 102, no2: 48, co: 1.7 },
      { date: "+3d", aqi: 125, pm25: 65, pm10: 105, no2: 50, co: 1.8 },
    ],
  },
  katol: {
    name: "Katol",
    city: "Nagpur",
    state: "Maharashtra",
    aqi: 95,
    temperature: 29,
    humidity: 60,
    windSpeed: 12,
    history: [
      { date: "Mon", aqi: 85, pm25: 40, pm10: 70, no2: 30, co: 1.0 },
      { date: "Tue", aqi: 88, pm25: 42, pm10: 73, no2: 32, co: 1.1 },
      { date: "Wed", aqi: 95, pm25: 45, pm10: 78, no2: 35, co: 1.2 },
      { date: "Thu", aqi: 98, pm25: 47, pm10: 82, no2: 37, co: 1.3 },
      { date: "Fri", aqi: 96, pm25: 46, pm10: 80, no2: 36, co: 1.2 },
      { date: "Sat", aqi: 93, pm25: 44, pm10: 77, no2: 34, co: 1.1 },
      { date: "Sun", aqi: 90, pm25: 42, pm10: 75, no2: 33, co: 1.0 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 100, pm25: 48, pm10: 85, no2: 38, co: 1.3 },
      { date: "+2d", aqi: 103, pm25: 50, pm10: 88, no2: 40, co: 1.4 },
      { date: "+3d", aqi: 105, pm25: 52, pm10: 90, no2: 42, co: 1.5 },
    ],
  },

  // Raipur Talukas
  raipur_city: {
    name: "Raipur City",
    city: "Raipur",
    state: "Chhattisgarh",
    aqi: 75,
    temperature: 29,
    humidity: 60,
    windSpeed: 10,
    history: [
      { date: "Mon", aqi: 65, pm25: 30, pm10: 55, no2: 20, co: 0.7 },
      { date: "Tue", aqi: 70, pm25: 33, pm10: 60, no2: 22, co: 0.8 },
      { date: "Wed", aqi: 75, pm25: 36, pm10: 65, no2: 25, co: 0.9 },
      { date: "Thu", aqi: 80, pm25: 38, pm10: 68, no2: 27, co: 1.0 },
      { date: "Fri", aqi: 78, pm25: 37, pm10: 66, no2: 26, co: 0.9 },
      { date: "Sat", aqi: 75, pm25: 35, pm10: 63, no2: 24, co: 0.8 },
      { date: "Sun", aqi: 72, pm25: 33, pm10: 60, no2: 23, co: 0.7 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 82, pm25: 40, pm10: 72, no2: 28, co: 1.1 },
      { date: "+2d", aqi: 85, pm25: 42, pm10: 75, no2: 30, co: 1.2 },
      { date: "+3d", aqi: 88, pm25: 45, pm10: 78, no2: 32, co: 1.3 },
    ],
  },
  abhanpur: {
    name: "Abhanpur",
    city: "Raipur",
    state: "Chhattisgarh",
    aqi: 68,
    temperature: 28,
    humidity: 65,
    windSpeed: 8,
    history: [
      { date: "Mon", aqi: 60, pm25: 25, pm10: 50, no2: 18, co: 0.6 },
      { date: "Tue", aqi: 63, pm25: 27, pm10: 53, no2: 20, co: 0.7 },
      { date: "Wed", aqi: 68, pm25: 30, pm10: 58, no2: 23, co: 0.8 },
      { date: "Thu", aqi: 70, pm25: 32, pm10: 60, no2: 25, co: 0.9 },
      { date: "Fri", aqi: 69, pm25: 31, pm10: 59, no2: 24, co: 0.8 },
      { date: "Sat", aqi: 66, pm25: 29, pm10: 56, no2: 22, co: 0.7 },
      { date: "Sun", aqi: 64, pm25: 27, pm10: 54, no2: 21, co: 0.6 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 71, pm25: 33, pm10: 62, no2: 26, co: 0.9 },
      { date: "+2d", aqi: 73, pm25: 35, pm10: 65, no2: 28, co: 1.0 },
      { date: "+3d", aqi: 75, pm25: 37, pm10: 68, no2: 30, co: 1.1 },
    ],
  },

  // Jabalpur Talukas
  jabalpur_city: {
    name: "Jabalpur City",
    city: "Jabalpur",
    state: "Madhya Pradesh",
    aqi: 90,
    temperature: 27,
    humidity: 68,
    windSpeed: 9,
    history: [
      { date: "Mon", aqi: 80, pm25: 38, pm10: 68, no2: 28, co: 0.9 },
      { date: "Tue", aqi: 85, pm25: 42, pm10: 72, no2: 30, co: 1.0 },
      { date: "Wed", aqi: 90, pm25: 45, pm10: 75, no2: 32, co: 1.1 },
      { date: "Thu", aqi: 95, pm25: 48, pm10: 80, no2: 35, co: 1.2 },
      { date: "Fri", aqi: 92, pm25: 46, pm10: 77, no2: 33, co: 1.1 },
      { date: "Sat", aqi: 88, pm25: 43, pm10: 73, no2: 31, co: 1.0 },
      { date: "Sun", aqi: 85, pm25: 40, pm10: 70, no2: 29, co: 0.9 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 98, pm25: 50, pm10: 85, no2: 37, co: 1.3 },
      { date: "+2d", aqi: 102, pm25: 53, pm10: 88, no2: 39, co: 1.4 },
      { date: "+3d", aqi: 105, pm25: 55, pm10: 92, no2: 42, co: 1.5 },
    ],
  },
  sihora: {
    name: "Sihora",
    city: "Jabalpur",
    state: "Madhya Pradesh",
    aqi: 78,
    temperature: 26,
    humidity: 72,
    windSpeed: 7,
    history: [
      { date: "Mon", aqi: 70, pm25: 32, pm10: 60, no2: 24, co: 0.7 },
      { date: "Tue", aqi: 73, pm25: 35, pm10: 63, no2: 26, co: 0.8 },
      { date: "Wed", aqi: 78, pm25: 38, pm10: 68, no2: 29, co: 0.9 },
      { date: "Thu", aqi: 82, pm25: 40, pm10: 72, no2: 31, co: 1.0 },
      { date: "Fri", aqi: 80, pm25: 39, pm10: 70, no2: 30, co: 0.9 },
      { date: "Sat", aqi: 76, pm25: 36, pm10: 66, no2: 28, co: 0.8 },
      { date: "Sun", aqi: 74, pm25: 34, pm10: 64, no2: 27, co: 0.7 },
    ],
    forecast: [
      { date: "Tomorrow", aqi: 83, pm25: 42, pm10: 75, no2: 33, co: 1.1 },
      { date: "+2d", aqi: 86, pm25: 45, pm10: 78, no2: 35, co: 1.2 },
      { date: "+3d", aqi: 88, pm25: 47, pm10: 82, no2: 37, co: 1.3 },
    ],
  },

  // Rural Areas
  // rural_cluster1: {
  //   name: "Village Cluster 1",
  //   city: "Rural Area",
  //   state: "Various States",
  //   aqi: 45,
  //   temperature: 25,
  //   humidity: 75,
  //   windSpeed: 5,
  //   history: [
  //     { date: "Mon", aqi: 40, pm25: 18, pm10: 35, no2: 12, co: 0.4 },
  //     { date: "Tue", aqi: 42, pm25: 20, pm10: 38, no2: 13, co: 0.5 },
  //     { date: "Wed", aqi: 45, pm25: 22, pm10: 40, no2: 15, co: 0.6 },
  //     { date: "Thu", aqi: 44, pm25: 21, pm10: 39, no2: 14, co: 0.5 },
  //     { date: "Fri", aqi: 43, pm25: 20, pm10: 37, no2: 13, co: 0.4 },
  //     { date: "Sat", aqi: 45, pm25: 22, pm10: 40, no2: 15, co: 0.6 },
  //     { date: "Sun", aqi: 46, pm25: 23, pm10: 42, no2: 16, co: 0.7 },
  //   ],
  //   forecast: [
  //     { date: "Tomorrow", aqi: 44, pm25: 21, pm10: 39, no2: 14, co: 0.5 },
  //     { date: "+2d", aqi: 45, pm25: 22, pm10: 40, no2: 15, co: 0.6 },
  //     { date: "+3d", aqi: 47, pm25: 24, pm10: 43, no2: 17, co: 0.7 },
  //   ],
  // },
  // rural_cluster2: {
  //   name: "Village Cluster 2",
  //   city: "Rural Area",
  //   state: "Various States",
  //   aqi: 42,
  //   temperature: 24,
  //   humidity: 78,
  //   windSpeed: 4,
  //   history: [
  //     { date: "Mon", aqi: 38, pm25: 17, pm10: 33, no2: 11, co: 0.3 },
  //     { date: "Tue", aqi: 40, pm25: 19, pm10: 36, no2: 12, co: 0.4 },
  //     { date: "Wed", aqi: 42, pm25: 20, pm10: 38, no2: 14, co: 0.5 },
  //     { date: "Thu", aqi: 41, pm25: 19, pm10: 37, no2: 13, co: 0.4 },
  //     { date: "Fri", aqi: 40, pm25: 18, pm10: 35, no2: 12, co: 0.3 },
  //     { date: "Sat", aqi: 42, pm25: 20, pm10: 38, no2: 14, co: 0.5 },
  //     { date: "Sun", aqi: 43, pm25: 21, pm10: 40, no2: 15, co: 0.6 },
  //   ],
  //   forecast: [
  //     { date: "Tomorrow", aqi: 41, pm25: 19, pm10: 37, no2: 13, co: 0.4 },
  //     { date: "+2d", aqi: 42, pm25: 20, pm10: 38, no2: 14, co: 0.5 },
  //     { date: "+3d", aqi: 44, pm25: 22, pm10: 41, no2: 16, co: 0.6 },
  //   ],
  // },
};

export default function Home() {
  const [location, setLocation] = useState("indore_city");
  const data = MOCK_DATA[location] || MOCK_DATA["indore_city"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                VayuSense
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl text-lg">
              Hyperlocal, real-time, and predictive air quality insights for mid-tier cities and rural areas across India.
            </p>
          </div>
        </div>
      </header>

      {/* Notification System */}
      <NotificationSystem 
        currentAQI={data.aqi} 
        currentLocation={data.name}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Selector */}
        <div className="mb-8">
          <LocationSelector value={location} onChange={setLocation} />
        </div>

        {/* Current Location Info */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{data.city}, {data.state} • Current Air Quality Status</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last updated</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Key Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <AQICard aqi={data.aqi} />
            <WeatherWidget 
              temperature={data.temperature}
              humidity={data.humidity}
              windSpeed={data.windSpeed}
            />
            <HealthAdvice aqi={data.aqi} />
          </div>

          {/* Right Column - Charts and Maps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AQIMap />
              <PollutionBreakdown data={data.history[data.history.length - 1]} />
            </div>
            <AQIChart data={data.history} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ForecastChart data={data.forecast} />
              <AirQualityTrends data={data.history} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
