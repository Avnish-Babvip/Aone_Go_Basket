import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveAccountCenterTab } from "../../features/slices/references";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveAccountCenterTab("Dashboard"));
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="13,647"
          icon="📦"
          trend="+2.3%"
          trendType="up"
          subtitle="Last Week"
        />
        <StatCard
          title="New Leads"
          value="9,526"
          icon="🎯"
          trend="+8.1%"
          trendType="up"
          subtitle="Last Month"
        />
        <StatCard
          title="Deals"
          value="976"
          icon="💼"
          trend="-0.3%"
          trendType="down"
          subtitle="Last Month"
        />
        <StatCard
          title="Booked Revenue"
          value="$123.6k"
          icon="💰"
          trend="-10.5%"
          trendType="down"
          subtitle="Last Month"
        />
      </div>

      {/* ================= CHART ROW ================= */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Page Views & Clicks
        </h3>

        <RevenueChart />
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon, trend, trendType, subtitle }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 text-xl">
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span
          className={`flex items-center gap-1 font-medium ${
            trendType === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trendType === "up" ? "▲" : "▼"} {trend}
        </span>
        <span className="text-gray-400">{subtitle}</span>
      </div>
    </div>
  );
};

/* ================= CHART ================= */

const data = [
  { name: "Jan", views: 32, clicks: 8 },
  { name: "Feb", views: 65, clicks: 14 },
  { name: "Mar", views: 45, clicks: 7 },
  { name: "Apr", views: 68, clicks: 16 },
  { name: "May", views: 48, clicks: 20 },
  { name: "Jun", views: 60, clicks: 10 },
  { name: "Jul", views: 40, clicks: 5 },
  { name: "Aug", views: 43, clicks: 9 },
  { name: "Sep", views: 75, clicks: 7 },
  { name: "Oct", views: 50, clicks: 28 },
  { name: "Nov", views: 62, clicks: 12 },
  { name: "Dec", views: 66, clicks: 33 },
];

const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        barCategoryGap={20}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          className="text-xs"
        />

        <YAxis tickLine={false} axisLine={false} className="text-xs" />

        <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />

        <Legend wrapperStyle={{ outline: "none" }} />

        {/* BAR */}
        <Bar
          dataKey="views"
          fill="#FF6B2C"
          radius={[6, 6, 0, 0]}
          name="Page Views"
          isAnimationActive
        />

        {/* LINE */}
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="#22C55E"
          strokeWidth={2}
          dot={false}
          activeDot={false}
          name="Clicks"
          isAnimationActive
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
