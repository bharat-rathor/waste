import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const COLORS = ["#2e7d32", "#0288d1", "#f57c00", "#d32f2f", "#7b1fa2", "#546e7a"];

export function CategoryPieChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div style={{ height: "240px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        No category waste records yet.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem"
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span style={{ fontSize: "0.8rem", color: "var(--text-main)" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActionBarChart({ data = [] }) {
  if (data.length === 0 || data.every((d) => d.count === 0)) {
    return (
      <div style={{ height: "240px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        No action records yet.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8e0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#52606d" }} />
          <YAxis tick={{ fontSize: 12, fill: "#52606d" }} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(46, 125, 50, 0.05)" }}
            contentStyle={{
              background: "#ffffff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem"
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActivityAreaChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div style={{ height: "240px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        No timeline data recorded yet.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
          <defs>
            <linearGradient id="reusedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="recycledGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0288d1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0288d1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8e0" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#52606d" }} />
          <YAxis tick={{ fontSize: 11, fill: "#52606d" }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem"
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Area type="monotone" dataKey="reused" name="Reused" stroke="#2e7d32" fillOpacity={1} fill="url(#reusedGrad)" />
          <Area type="monotone" dataKey="recycled" name="Recycled" stroke="#0288d1" fillOpacity={1} fill="url(#recycledGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
