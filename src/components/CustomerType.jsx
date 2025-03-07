import { ChevronDown } from "lucide-react";

export default function CustomerType({ value, onChange }) {
  return (
    <div
      style={{
        width: "20rem",
        background: "#FFFFFF", // Solid white background for a formal look
        padding: "1.5rem",
        borderRadius: "0.5rem", // Slightly smaller radius for a sharper look
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Subtler shadow
        border: "1px solid #D1D5DB", // Neutral gray border
        transition: "box-shadow 0.3s", // Subtle hover effect on shadow instead of scale
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)")}
    >
      <h2
        style={{
          fontSize: "1.125rem", // Slightly smaller for a refined look
          fontWeight: "600",
          color: "#111827", // Darker, professional gray
          marginBottom: "1rem",
          fontFamily: "'Inter', sans-serif", // Assuming a clean, formal font
        }}
      >
        Customer Type
      </h2>
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem", // Balanced padding
            border: "1px solid #D1D5DB", // Consistent gray border
            borderRadius: "0.375rem", // Slightly smaller radius
            outline: "none",
            fontSize: "1rem",
            fontWeight: "400", // Normal weight for less emphasis
            color: "#1F2937", // Dark gray text
            backgroundColor: "#F9FAFB", // Light gray background for subtle contrast
            appearance: "none",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif", // Consistent typography
          }}
        >
          <option value="premium">Premium</option>
          <option value="normal">Normal</option>
          <option value="inactive">Inactive</option>
        </select>
        <ChevronDown
          style={{
            position: "absolute",
            right: "0.75rem", // Slightly closer to edge
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6B7280", // Neutral gray for the icon
            pointerEvents: "none",
            width: "1.25rem", // Slightly larger for visibility
            height: "1.25rem",
          }}
        />
      </div>
    </div>
  );
}