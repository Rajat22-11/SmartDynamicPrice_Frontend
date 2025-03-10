import React, { useState, useEffect } from "react";
import { ChevronRight, TrendingUp, PieChart } from "lucide-react";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "/api" // Uses Vite proxy in local development
    : "https://smartdynamicprice-backend.onrender.com"; // Uses the real backend in production

// API fetch functions with error handling
const fetchProductData = async (productName) => {
  try {
    const response = await fetch(`${BASE_URL}/product/${encodeURIComponent(productName)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("Product Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {};
  }
};

const fetchDiscountData = async (formData) => {
  try {
    console.log("Sending Form Data to API:", formData);
    const response = await fetch(`${BASE_URL}/predict_discount/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("Discount Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching discount data:", error);
    return null;
  }
};

const fetchStockTrend = async (location, productName) => {
  try {
    console.log(`Fetching stock trend for ${productName} in ${location}...`);
    const response = await fetch(
      `${BASE_URL}/stock_trend?location=${encodeURIComponent(location)}&product=${encodeURIComponent(productName)}`
    );
    
    if (!response.ok) {
      console.log(`Stock trend API returned status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text(); // Get HTML as text
    console.log("Stock trend data received:", data.substring(0, 100) + "..."); // Log beginning of response
    console.log("Stock trend HTML length:", data.length);
    
    return data;
  } catch (error) {
    console.error("Error fetching stock trend:", error);
    console.log("Failed to retrieve stock trend data");
    return "";
  }
};

const cleanProductName = (productName) => {
  if (!productName) return "";
  
  // Remove empty parentheses (including any whitespace inside them)
  return productName.replace(/\s*\(\s*\)\s*/g, '').trim();
};

// Create a CSS style element for keyframe animation
const createStyleElement = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top: 4px solid #3182ce;
      animation: spin 1s linear infinite;
    }
  `;
  return styleEl;
};

export default function NextPage() {
  const [formData, setFormData] = useState({
    Product_Name: "",
    Category: "",
    Location: "",
    MRP: 0,
    Blinkit_Price: 0,
    Zepto_Price: 0,
    Instamart_Price: 0,
    Margin: 0,
    Festive_Seasonal_Impact: "",
    Shelf_Life_days: 0,
    Min_Stock: 0,
    Max_Stock: 0,
    Customer_Sentiment: "",
    Weight_g: 0,
    Weight_Unit: "",
    Order_Date: "",
    Order_Hour: 0,
    customer_type: "",
  });
  const [productData, setProductData] = useState({});
  const [discountData, setDiscountData] = useState(null);
  const [stockTrend, setStockTrend] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Add the keyframe animation style to document
  useEffect(() => {
    // Check if we need to add the style element
    if (!document.querySelector('style[data-spinner-style]')) {
      const styleEl = createStyleElement();
      styleEl.setAttribute('data-spinner-style', 'true');
      document.head.appendChild(styleEl);
    }
    
    // Clean up on component unmount
    return () => {
      const styleEl = document.querySelector('style[data-spinner-style]');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  // Load form data from localStorage
  useEffect(() => {
    try {
      const form1Data = JSON.parse(localStorage.getItem("form1Data") || "{}");
      const form2Data = JSON.parse(localStorage.getItem("form2Data") || "{}");
      const form3Data = JSON.parse(localStorage.getItem("form3Data") || "{}");

      const safeNumericParse = (obj) => {
        const result = { ...obj };

        const numericFields = [
          "MRP",
          "Blinkit_Price",
          "Zepto_Price",
          "Instamart_Price",
          "Margin",
          "Shelf_Life_days",
          "Min_Stock",
          "Max_Stock",
          "Weight_g",
          "Order_Hour",
        ];

        numericFields.forEach((field) => {
          if (
            field in result &&
            (result[field] === null || isNaN(Number(result[field])))
          ) {
            result[field] = 0;
          }
        });

        return result;
      };

      const safeForm1 = safeNumericParse(form1Data);
      const safeForm2 = safeNumericParse(form2Data);
      const safeForm3 = safeNumericParse(form3Data);

      const combinedFormData = {
        ...formData,
        ...safeForm1,
        ...safeForm2,
        ...safeForm3,
      };

      console.log("Combined Form Data:", combinedFormData);
      setFormData(combinedFormData);
    } catch (error) {
      console.error("Error parsing form data from localStorage:", error);
    }
  }, []);

  // Fetch data when Product_Name and Location are available
  useEffect(() => {
    if (formData.Product_Name && formData.Location) {
      setIsLoading(true);
      
      const fetchAllData = async () => {
        try {
          const [product, discount, stock] = await Promise.all([
            fetchProductData(formData.Product_Name),
            fetchDiscountData(formData),
            fetchStockTrend(formData.Location, formData.Product_Name)
          ]);
          
          setProductData(product);
          setDiscountData(discount);
          setStockTrend(stock);
        } catch (error) {
          console.error("API fetch failed:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAllData();
    }
  }, [formData.Product_Name, formData.Location]);

  // Add effect to handle Plotly chart rendering
  useEffect(() => {
    if (stockTrend && !isLoading) {
      // Find the chart container
      const chartContainer = document.getElementById('stock-trend-container');
      if (chartContainer) {
        // Execute any scripts in the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(stockTrend, 'text/html');
        
        // Extract scripts from parsed HTML
        const scripts = doc.querySelectorAll('script');
        
        // First, add all non-script content
        chartContainer.innerHTML = stockTrend;
        
        // Then, execute scripts manually to ensure they run
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          document.body.appendChild(newScript);
        });
      }
    }
  }, [stockTrend, isLoading]);

  // Calculate optimal price by subtracting the max discount from MRP
  const optimalPrice = 
    discountData?.max_discount !== undefined
      ? (formData.MRP - discountData.max_discount).toFixed(2)
      : (formData.MRP ? (formData.MRP * 0.9).toFixed(2) : 0);

  // Get product image URL
  const getProductImageUrl = () => {
    // First check if product data has an image URL
    if (productData && productData.product_image_link) {
      return productData.product_image_link;
    }
    
    // If no product image from API, use the specified fallback image
    return "https://img.freepik.com/free-vector/hand-drawn-pasta-cartoon-illustration_23-2150645133.jpg?semt=ais_hybrid";
  };

  // Loading spinner component with CSS class for animation
  const LoadingSpinner = () => (
    <div style={styles.loadingSpinner}>
      <div className="loading-spinner"></div>
      <p style={{marginTop: '10px'}}>Loading data...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.leftSection}>
          <div style={styles.productImageContainer}>
            {isLoading ? (
              <div style={styles.placeholderImage}>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <img
                  src={getProductImageUrl()}
                  onError={(e) => {
                    console.log("Image failed to load, using fallback");
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = `${BASE_URL}/placeholder/400/400`;
                    
                    // Add a timeout to handle cases where the fallback also fails
                    const imgTimeout = setTimeout(() => {
                      if (!e.target.complete || e.target.naturalHeight === 0) {
                        console.log("Fallback image also failed");
                        clearTimeout(imgTimeout);
                        
                        // Replace with a div containing text when all image attempts fail
                        const parent = e.target.parentNode;
                        if (parent) {
                          while (parent.firstChild) {
                            parent.removeChild(parent.firstChild);
                          }
                          
                          const fallbackText = document.createElement('div');
                          fallbackText.style.width = '100%';
                          fallbackText.style.height = '100%';
                          fallbackText.style.display = 'flex';
                          fallbackText.style.justifyContent = 'center';
                          fallbackText.style.alignItems = 'center';
                          fallbackText.style.backgroundColor = '#f3f4f6';
                          fallbackText.textContent = formData.Product_Name || "Product Image Unavailable";
                          
                          parent.appendChild(fallbackText);
                        }
                      }
                    }, 3000); // Give it 3 seconds to load the fallback
                  }}
                  style={styles.productImage}
                  alt={formData.Product_Name || "Product"}
                />
                <div style={styles.imageOverlay}>
                  <p style={styles.overlayText}>
                    {formData.Product_Name || "Product"}
                  </p>
                </div>
              </>
            )}
          </div>

          <div style={styles.graphContainer}>
            <div style={styles.graphHeader}>
              <h3 style={styles.sectionTitle}>
                <TrendingUp style={styles.iconStyle} /> Price Trend
              </h3>
            </div>
            <div style={styles.graphContent}>
              {isLoading ? (
                <LoadingSpinner />
              ) : stockTrend ? (
                <div
                  id="stock-trend-container"
                  style={{ 
                    width: "100%", 
                    height: "300px", 
                    overflow: "hidden",
                    borderRadius: "8px"
                  }}
                />
              ) : (
                <div style={styles.noDataMessage}>
                  <p>No trend data available for this product and location</p>
                  <p style={styles.smallText}>Try a different product or location</p>
                </div>
              )}
            </div>
          </div>

          <div style={styles.graphContainer}>
            <div style={styles.graphHeader}>
              <h3 style={styles.sectionTitle}>
                <PieChart style={styles.iconStyle} /> Market Share
              </h3>
            </div>
            <div style={styles.graphContent}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div style={styles.placeholderGraph}>
                  <div style={{...styles.marketShare, width: '60%'}}>
                    <span>Your Store: 60%</span>
                  </div>
                  <div style={{...styles.marketShare, width: '25%', backgroundColor: '#4299e1'}}>
                    <span>Blinkit: 25%</span>
                  </div>
                  <div style={{...styles.marketShare, width: '15%', backgroundColor: '#9f7aea'}}>
                    <span>Others: 15%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.rightSection}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <h1 style={styles.productTitle}>
                {cleanProductName(formData.Product_Name || productData.product_name) || "Product Name"}
              </h1>
              <span style={styles.productCategory}>
                {formData.Category || "Category"}
              </span>

              <div style={styles.descriptionsContainer}>
                {productData.product_desc && (
                  <>
                    <p style={styles.descriptionLabel}>Product Description:</p>
                    <p style={styles.productDesc}>
                      {productData.product_desc}
                    </p>
                  </>
                )}
                
                <p style={styles.descriptionLabel}>Additional Information:</p>
                <p style={styles.productDescSecondary || styles.productDesc}>
                  This is a premium quality {cleanProductName(formData.Product_Name || productData.product_name) || "wheat"} available in {
                    formData.Location || "your area"
                  }. It has a shelf life of {formData.Shelf_Life_days || "N/A"} days.
                </p>
              </div>

              <div style={styles.priceContainer}>
                <div style={styles.mrpSection}>
                  <p style={styles.mrpLabel}>MRP</p>
                  <p style={styles.mrp}>
                    <span style={styles.strikeThrough}>₹{formData.MRP || "0"}</span>
                  </p>
                </div>
                <div style={styles.dynamicPriceSection}>
                  <p style={styles.dynamicPriceLabel}>Optimal Price</p>
                  <p style={styles.dynamicPrice}>₹{optimalPrice}</p>
                </div>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.td}>Blinkit Price:</td>
                      <td style={styles.tdValue}>
                        ₹{formData.Blinkit_Price || "0"}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Zepto Price:</td>
                      <td style={styles.tdValue}>₹{formData.Zepto_Price || "0"}</td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Instamart Price:</td>
                      <td style={styles.tdValue}>
                        ₹{formData.Instamart_Price || "0"}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Margin:</td>
                      <td style={styles.tdValue}>{formData.Margin || "0"}%</td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Location:</td>
                      <td style={styles.tdValue}>{formData.Location || "N/A"}</td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Customer Type:</td>
                      <td style={styles.tdValue}>
                        {formData.customer_type || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Seasonal Impact:</td>
                      <td style={styles.tdValue}>
                        {formData.Festive_Seasonal_Impact || "None"}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.td}>Optimal Price:</td>
                      <td style={styles.tdValueFinal}>₹{optimalPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button style={styles.actionButton} onClick={() => alert(`Applied optimal price of ₹${optimalPrice}`)}>
                Apply Optimal Price <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    maxWidth: "1200px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9fafb",
  },
  rightSection: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
  },
  productImageContainer: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    height: "400px",
    backgroundColor: "#f3f4f6",
  },
  productImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "10px",
    textAlign: "center",
  },
  overlayText: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: 0,
  },
  graphContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "white",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  graphHeader: {
    marginBottom: "10px",
  },
  graphContent: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    minHeight: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  placeholderGraph: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  marketShare: {
    height: "30px",
    backgroundColor: "#38a169",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    color: "#2d3748",
    margin: "0 0 10px 0",
  },
  graphImage: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  productTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: "5px",
  },
  productDesc: {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    borderLeft: '4px solid #2c9e70',
  },
  productDescSecondary: {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    borderLeft: '4px solid #2c9e70',
  },
  descriptionsContainer: {
    marginBottom: '20px',
  },
  descriptionLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: '5px',
  },
  productCategory: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "20px",
    padding: "5px 10px",
    backgroundColor: "#e2e8f0",
    borderRadius: "4px",
    display: "inline-block",
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#f0f4f8",
    borderRadius: "8px",
  },
  mrpSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mrpLabel: {
    fontSize: "14px",
    color: "#718096",
    margin: 0,
  },
  mrp: {
    fontSize: "18px",
    color: "#4a5568",
    margin: 0,
  },
  strikeThrough: {
    textDecoration: "line-through",
    color: "#e53e3e",
  },
  dynamicPriceSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dynamicPriceLabel: {
    fontSize: "14px",
    color: "#2d3748",
    margin: 0,
  },
  dynamicPrice: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#38a169",
    margin: 0,
  },
  tableContainer: {
    marginTop: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    color: "#4a5568",
  },
  tdValue: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    color: "#2d3748",
    fontWeight: "bold",
    textAlign: "right",
  },
  tdValueFinal: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    color: "#1a202c",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: "18px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 20px",
    backgroundColor: "#3182ce",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "20px",
  },
  iconStyle: {
    marginRight: "8px",
  },
  loadingSpinner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  noDataMessage: {
    textAlign: "center",
    color: "#718096",
  },
  smallText: {
    fontSize: "14px",
    color: "#a0aec0",
    marginTop: "5px",
  },
};