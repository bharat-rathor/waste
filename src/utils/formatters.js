export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, maxLength = 80) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function getActionBadgeClass(action) {
  switch (action) {
    case "Reused":
      return "badge-reused";
    case "Recycled":
      return "badge-recycled";
    case "Stored for Later Reuse":
      return "badge-stored";
    case "Disposed":
      return "badge-disposed";
    default:
      return "badge-default";
  }
}

export function getCategoryBadgeClass(category) {
  switch (category) {
    case "Wet Waste":
    case "Wet":
      return "badge-wet";
    case "Dry Waste":
    case "Dry":
      return "badge-dry";
    case "Recyclable Waste":
    case "Recyclable":
      return "badge-recyclable";
    case "Hazardous Waste":
    case "Hazardous":
      return "badge-hazardous";
    case "E-Waste":
      return "badge-ewaste";
    default:
      return "badge-default";
  }
}
