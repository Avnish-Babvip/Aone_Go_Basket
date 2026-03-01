import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getRiderDashboard } from "../../features/actions/rider/user";

export const RiderDashboard = () => {
  const dispatch = useDispatch();
  const {dashboardData} = useSelector((state)=>state.rider_user);

  console.log(dashboardData)

  useEffect(() => {
    dispatch(getRiderDashboard())
    dispatch(setActiveAccountCenterTab("Dashboard"));
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Orders"
          value={dashboardData?.assigned_orders}
          icon="📦"
          trend="+2.3%"
          trendType="up"
          subtitle="Last Week"
        />
        <StatCard
          title="Picked Orders"
          value={dashboardData?.picked_orders}
          icon="🎯"
          trend="+8.1%"
          trendType="up"
          subtitle="Last Month"
        />
        <StatCard
          title="Delivered Today"
          value={dashboardData?.delivered_today}
          icon="💼"
          trend="-0.3%"
          trendType="down"
          subtitle="Last Month"
        />
        <StatCard
          title="Total Delivered"
          value={dashboardData?.total_delivered}
          icon="💰"
          trend="-10.5%"
          trendType="down"
          subtitle="Last Month"
        />
        <StatCard
          title="Today Earnings"
          value={dashboardData?.today_earnings}
          icon="💰"
          trend="-10.5%"
          trendType="down"
          subtitle="Last Month"
        />
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

      {/* <div className="mt-4 flex items-center gap-2 text-sm">
        <span
          className={`flex items-center gap-1 font-medium ${
            trendType === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trendType === "up" ? "▲" : "▼"} {trend}
        </span>
        <span className="text-gray-400">{subtitle}</span>
      </div> */}
    </div>
  );
};

/* ================= CHART ================= */




