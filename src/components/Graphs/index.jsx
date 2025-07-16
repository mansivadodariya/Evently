import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { STRINGS } from "../../constant/strings";

export default function DashboardStatsWithGraph({ events = [] }) {
  const total = events?.length || 0;
  const online = events.filter((e) => e.type === "Online").length;
  const offline = events.filter((e) => e.type === "Offline").length;

  const data = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const stats = days.map((day) => ({
      day,
      online: 0,
      offline: 0,
    }));

    events.forEach((event) => {
      try {
        if (!event?.startDate) return;
        const date = event.startDate?.toDate
          ? event.startDate.toDate()
          : new Date(event.startDate);

        const dayIndex = !isNaN(date.getDay()) ? date.getDay() : 0;

        if (event?.type === "Online") stats[dayIndex].online += 1;
        else if (event?.type === "Offline") stats[dayIndex].offline += 1;
      } catch (error) {
        console.warn("Skipping invalid event:", event, error);
      }
    });

    return stats;
  }, [events]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-xl text-center text-[#8F87F1] font-bold border border-[#8F87F1] bg-white shadow-md hover:bg-[#f3f3ff] transition cursor-pointer">
          {STRINGS.STATS.TOTAL} <br />
          <span className="text-2xl text-[#6f67d9]">{total}</span>
        </div>
        <div className="p-4 rounded-xl text-center text-white font-bold shadow-md bg-gradient-to-r from-[#8F87F1] via-[#6f67d9] to-[#8F87F1] hover:opacity-90 transition cursor-pointer">
          {STRINGS.STATS.ONLINE} <br />
          <span className="text-2xl font-extrabold">{online}</span>
        </div>
        <div className="p-4 rounded-xl text-center text-white font-bold shadow-md bg-gradient-to-r from-[#E9A5F1] via-[#C68EFD] to-[#8F87F1] hover:opacity-90 transition cursor-pointer">
          {STRINGS.STATS.OFFLINE} <br />
          <span className="text-2xl font-extrabold">{offline}</span>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold text-[#8F87F1] mb-2">
          {STRINGS.STATS.WEEKLY_TREND}
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8F87F1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8F87F1" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorOffline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E9A5F1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E9A5F1" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="day" stroke="#8F87F1" />
            <YAxis stroke="#8F87F1" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="online"
              stroke="#8F87F1"
              fillOpacity={1}
              fill="url(#colorOnline)"
            />
            <Area
              type="monotone"
              dataKey="offline"
              stroke="#E9A5F1"
              fillOpacity={1}
              fill="url(#colorOffline)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
