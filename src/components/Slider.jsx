import { useState } from "react";
import { MoveHorizontal } from "lucide-react";

function PriceSlider({ title, value = 1, onChange }) {
  const [price, setPrice] = useState(value || 1);

  const handleSliderChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
    onChange(newPrice);
  };

  const handleInputChange = (e) => {
    let newPrice = Number(e.target.value);
    if (newPrice < 1) newPrice = 1;
    if (newPrice > 1000) newPrice = 1000;
    setPrice(newPrice);
    onChange(newPrice);
  };

  const percentage = ((price - 1) / 999) * 100;

  return (
    <div style={{ width: "24rem", background: "linear-gradient(to bottom right, white, #f9fafb, #f3f4f6)", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", border: "1px solid #e5e7eb", transition: "transform 0.3s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>{title}</h2>
        <MoveHorizontal style={{ color: "#9ca3af" }} />
      </div>

      <div style={{ position: "relative" }}>
        <p style={{ fontSize: "1.875rem", fontWeight: "800", color: "#047857", textAlign: "center", position: "relative", zIndex: 10, textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginBottom: "1rem" }}>
          ₹{(price || 1).toLocaleString()}
        </p>
      </div>

      <div style={{ position: "relative", width: "100%", height: "0.5rem", backgroundColor: "#e5e7eb", borderRadius: "9999px", overflow: "hidden", marginBottom: "0.5rem" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", backgroundColor: "#10b981", borderRadius: "9999px", transition: "width 0.3s ease-in-out", width: `${percentage}%` }}></div>
      </div>

      <input
        type="range"
        min="1"
        max="1000"
        value={price}
        onChange={handleSliderChange}
        style={{ width: "100%", appearance: "none", background: "transparent", cursor: "pointer", height: "0.5rem", outline: "none", position: "relative", zIndex: 20, margin: "0", padding: "0" }}
        className="custom-slider"
      />

      {/* Input Box for Manual Entry */}
      <input
        type="number"
        value={price}
        onChange={handleInputChange}
        min="1"
        max="1000"
        style={{ 
          width: "100%", 
          padding: "0.5rem", 
          border: "1px solid #10b981", 
          borderRadius: "0.5rem", 
          textAlign: "center", 
          fontSize: "1rem", 
          fontWeight: "bold",
          color: "#047857",
          marginTop: "1rem"
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
        <span>₹1</span>
        <span>₹1000</span>
      </div>

      <style jsx>{`
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          background: #10b981;
          border-radius: 9999px;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transform: translateY(-70%);
          position: relative;
          top: 50%;
        }

        .custom-slider::-moz-range-thumb {
          width: 1.25rem;
          height: 1.25rem;
          background: #10b981;
          border-radius: 9999px;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transform: translateY(-70%);
        }

        .custom-slider::-ms-thumb {
          width: 1.25rem;
          height: 1.25rem;
          background: #10b981;
          border-radius: 9999px;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transform: translateY(-70%);
        }
      `}</style>
    </div>
  );
}

export default function CompetitorPrices({ zeptoPrice = 1, instamartPrice = 1, onZeptoChange, onInstamartChange }) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <PriceSlider title="Zepto (Competitor 1) Price" value={zeptoPrice} onChange={onZeptoChange} />
      <PriceSlider title="Instamart (Competitor 2) Price" value={instamartPrice} onChange={onInstamartChange} />
    </div>
  );
}
