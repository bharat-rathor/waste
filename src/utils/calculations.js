/**
 * Utility functions for waste and eco analytics
 * Note: Keeps unlike units strictly segregated (e.g. pieces vs kg vs grams vs Liters)
 */

export function calculateWasteTotals(records = []) {
  const byUnit = {};
  const byAction = {
    Reused: {},
    Recycled: {},
    Disposed: {},
    "Stored for Later Reuse": {}
  };
  const byCategory = {};

  records.forEach((record) => {
    const qty = Number(record.quantity) || 0;
    const unit = record.unit || "Pieces";
    const action = record.action || "Disposed";
    const category = record.category || "Uncategorized";

    // Overall by unit
    byUnit[unit] = (byUnit[unit] || 0) + qty;

    // By action per unit
    if (!byAction[action]) {
      byAction[action] = {};
    }
    byAction[action][unit] = (byAction[action][unit] || 0) + qty;

    // By category count and quantity breakdown
    if (!byCategory[category]) {
      byCategory[category] = { count: 0, units: {} };
    }
    byCategory[category].count += 1;
    byCategory[category].units[unit] = (byCategory[category].units[unit] || 0) + qty;
  });

  return {
    totalRecords: records.length,
    byUnit,
    byAction,
    byCategory
  };
}

/**
 * Format separated units for human display (e.g., "12 Pieces, 4.5 kg")
 */
export function formatUnitBreakdown(unitsMap = {}) {
  const entries = Object.entries(unitsMap).filter(([, val]) => val > 0);
  if (entries.length === 0) return "0 items";
  return entries
    .map(([unit, val]) => `${Number(val.toFixed(2))} ${unit}`)
    .join(" • ");
}

/**
 * Formats primary unit summary or multi-unit string
 */
export function formatActionTotal(actionMap = {}, actionName = "Reused") {
  const data = actionMap[actionName] || {};
  return formatUnitBreakdown(data);
}

/**
 * Prepare chart data for category breakdown
 */
export function getCategoryChartData(records = []) {
  const counts = {};
  records.forEach((rec) => {
    const cat = rec.category || "Other";
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return Object.keys(counts).map((category) => ({
    name: category,
    value: counts[category]
  }));
}

/**
 * Prepare chart data for action distribution
 */
export function getActionChartData(records = []) {
  const counts = {
    Reused: 0,
    Recycled: 0,
    Disposed: 0,
    "Stored for Later Reuse": 0
  };

  records.forEach((rec) => {
    if (counts[rec.action] !== undefined) {
      counts[rec.action] += 1;
    } else {
      counts.Disposed += 1;
    }
  });

  return [
    { name: "Reused", count: counts.Reused, fill: "#2e7d32" },
    { name: "Recycled", count: counts.Recycled, fill: "#0288d1" },
    { name: "Stored", count: counts["Stored for Later Reuse"], fill: "#f57c00" },
    { name: "Disposed", count: counts.Disposed, fill: "#78909c" }
  ];
}

/**
 * Get daily timeline data for charts (last 7 days or recorded dates)
 */
export function getTimelineChartData(records = []) {
  const map = {};
  records.forEach((rec) => {
    const date = rec.date ? rec.date.slice(0, 10) : new Date().toISOString().slice(0, 10);
    if (!map[date]) {
      map[date] = { date, count: 0, reused: 0, recycled: 0, disposed: 0 };
    }
    map[date].count += 1;
    if (rec.action === "Reused") map[date].reused += 1;
    else if (rec.action === "Recycled") map[date].recycled += 1;
    else map[date].disposed += 1;
  });

  return Object.values(map).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-10);
}

/**
 * Calculate user eco-rank based on points
 */
export function getEcoLevel(points = 0) {
  if (points >= 500) return { title: "Eco Champion", badge: "🌟", level: 4, nextThreshold: null };
  if (points >= 250) return { title: "Green Guardian", badge: "🛡️", level: 3, nextThreshold: 500 };
  if (points >= 100) return { title: "Eco Sprout", badge: "🌿", level: 2, nextThreshold: 250 };
  return { title: "Eco Seedling", badge: "🌱", level: 1, nextThreshold: 100 };
}
