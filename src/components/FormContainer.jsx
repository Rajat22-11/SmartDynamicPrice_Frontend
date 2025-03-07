export default function FormContainer({ title, children }) {
    return (
      <div style={{ 
        maxWidth: "600px", 
        margin: "auto", 
        padding: "2rem", 
        background: "linear-gradient(to bottom right, #ffffff, #f9fafb)", 
        borderRadius: "10px", 
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
        border: "1px solid #e5e7eb" 
      }}>
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          color: "#1f2937", 
          textAlign: "center", 
          marginBottom: "1rem" 
        }}>
          {title}
        </h2>
        {children}
      </div>
    );
  }
  