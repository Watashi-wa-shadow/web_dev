import { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import "./charts.css";

const COLORS = ["#1e4e79", "#3d9bd0", "#9fd3f0", "#6cbf84", "#b7e28c", "#f2c14e"];

// "2026-09" -> "Sep"
const monthLabel = (key) =>
  new Date(`${key}-01`).toLocaleString("en", { month: "short" });

export function Charts({ cashflow }) {
  // running balance per month (salary = income, everything else = expense)
  const cashFlowData = useMemo(() => {
    const monthly = {};
    cashflow.forEach((t) => {
      const key = t.date.slice(0, 7);
      if (!monthly[key]) monthly[key] = { key, net: 0 };
      monthly[key].net += t.category === "salary" ? t.amount : -t.amount;
    });

    let running = 0;
    return Object.values(monthly)
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((m) => {
        running += m.net;
        return { month: monthLabel(m.key), balance: running };
      });
  }, [cashflow]);

  // total spent per category, biggest first
  const categoryData = useMemo(() => {
    const totals = {};
    cashflow
      .filter((t) => t.category !== "salary")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });
    return Object.entries(totals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [cashflow]);

  if (cashflow.length === 0) {
    return <p className="charts-empty">No transactions yet, so there is nothing to chart.</p>;
  }

  return (
    <div className="charts-row">
      <div className="chart-card">
        <h3>Cash Flow Chart</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e4e79" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#1e4e79" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v) => [`$${v}`, "Balance"]} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#1e4e79"
              strokeWidth={2}
              fill="url(#flowFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Top Expense Categories</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={2}
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `$${v}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}