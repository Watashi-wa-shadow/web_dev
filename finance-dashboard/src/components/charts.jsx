import { useMemo } from "react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from "recharts";
import "./charts.css";

const COLORS = ["#1e4e79", "#3d9bd0", "#9fd3f0", "#6cbf84", "#b7e28c", "#f2c14e"];

const formatCurrency = (val) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(val) || 0);
};

export function Charts({ monthlyCashflow }) {
  const data = monthlyCashflow || [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Get current month name for the header (e.g., "September 2026")
  const currentMonthName = now.toLocaleString("default", { month: "long" });

  const categoryData = useMemo(() => {
    const totals = {};

    data
      .filter((t) => {
        if (!t.date || t.category === "salary") return false;
        const parts = String(t.date).split("T")[0].split("-");
        if (parts.length >= 2) {
          const year = parseInt(parts[0], 10);
          const monthIndex = parseInt(parts[1], 10) - 1;
          return year === currentYear && monthIndex === currentMonth;
        }
        const txDate = new Date(t.date);
        // Match both current month and current year
        return (
          txDate.getMonth() === currentMonth &&
          txDate.getFullYear() === currentYear
        );
      })
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + (Number(t.amount) || 0);
      });

    return Object.entries(totals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [monthlyCashflow, currentMonth, currentYear]);

  return (
    <div className="charts-row">
      <div className="chart-card">
        <h3>Top Expense Categories ({currentMonthName} {currentYear})</h3>
        {categoryData.length === 0 ? (
          <p className="charts-empty" style={{ textAlign: "center", marginTop: "4rem" }}>
            No expenses found for {currentMonthName}.
          </p>
        ) : (
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
              <Tooltip formatter={(v) => [formatCurrency(v), "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}