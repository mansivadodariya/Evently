import React from "react";
import { FaCalendarAlt, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function EventStats({ events }) {
  const total = events.length;
  const online = events.filter((e) => e.type === "Online").length;
  const offline = events.filter((e) => e.type === "Offline").length;

  const stats = [
    {
      title: "Total Events",
      count: total,
      icon: <FaCalendarAlt className="text-3xl" />,
      gradient: "from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1]",
    },
    {
      title: "Online Events",
      count: online,
      icon: <FaGlobe className="text-3xl" />,
      gradient: "from-[#C68EFD] via-[#E9A5F1] to-[#FED2E2]",
    },
    {
      title: "Offline Events",
      count: offline,
      icon: <FaMapMarkerAlt className="text-3xl" />,
      gradient: "from-[#FED2E2] via-[#E9A5F1] to-[#8F87F1]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-r ${stat.gradient} text-white rounded-xl shadow-lg p-6 
                      flex flex-col items-center justify-center transform 
                      hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
        >
          <div className="mb-2">{stat.icon}</div>
          <p className="text-lg font-medium tracking-wide">{stat.title}</p>
          <p className="text-4xl font-extrabold mt-1">{stat.count}</p>
        </div>
      ))}
    </div>
  );
}
