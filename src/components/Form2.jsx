import { useState } from "react";

export function Form2({ nextStep, prevStep }) {
  const categories = [
    "Vegetables",
    "Grocery",
    "Biscuits",
    "Snacks",
    "Dairy",
    "Fruits",
  ];
  const productNames = [
    "Wheat ()",
    "Tea ()",
    "Bananas ()",
    "Oranges ()",
    "Tomatoes ()",
    "Atta ()",
    "Saffola Oil ()",
    "Dal ()",
    "Sugar ()",
    "Govardhan Paneer ()",
    "Rice ()",
    "Salt ()",
    "Bingo Mad Angles",
    "Oreo Biscuit",
    "Coffee ()",
    "Parle-G",
    "Amul Milk ()",
    "Apples ()",
  ];

  const [formData, setFormData] = useState({
    Product_Name: productNames[0],
    Category: categories[0],
    MRP: 0,
    Shelf_Life_days: 0,
    Min_Stock: 0,
    Max_Stock: 0,
    Weight_g: 0,
    Weight_Unit: "g",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (e.target.type === "number") {
      processedValue = value === "" ? 0 : parseFloat(value);
      if (isNaN(processedValue)) processedValue = 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save form data to localStorage
    localStorage.setItem("form2Data", JSON.stringify(formData));

    console.log("Form2 submitted, calling nextStep");

    if (typeof nextStep === "function") {
      nextStep();
    } else {
      console.error("nextStep is not a function", nextStep);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        background: "linear-gradient(to bottom right, #ffffff, #f9fafb)",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Category:
          </label>
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Product Name:
          </label>
          <select
            name="Product_Name"
            value={formData.Product_Name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          >
            {productNames.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            MRP (₹):
          </label>
          <input
            type="number"
            step="0.01"
            name="MRP"
            value={formData.MRP}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Shelf Life (days):
          </label>
          <input
            type="number"
            step="0.01"
            name="Shelf_Life_days"
            value={formData.Shelf_Life_days}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Min Stock:
          </label>
          <input
            type="number"
            step="0.01"
            name="Min_Stock"
            value={formData.Min_Stock}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Max Stock:
          </label>
          <input
            type="number"
            step="0.01"
            name="Max_Stock"
            value={formData.Max_Stock}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Weight (g):
          </label>
          <input
            type="number"
            step="0.01"
            name="Weight_g"
            value={formData.Weight_g}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#374151" }}>
            Weight Unit:
          </label>
          <select
            name="Weight_Unit"
            value={formData.Weight_Unit}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              marginTop: "0.25rem",
            }}
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            type="button"
            onClick={prevStep}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              backgroundColor: "#6b7280",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Previous
          </button>
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              backgroundColor: "#3b82f6",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
