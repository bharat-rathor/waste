import React from "react";

export default function Button({
  children,
  variant = "primary", // primary, secondary, outline, danger
  size = "md", // sm, md, lg
  icon: Icon,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === "md" ? "" : `btn-${size}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />}
      {children}
    </button>
  );
}
