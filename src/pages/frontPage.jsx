import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Form1 } from "../components/Form1";
import { Form2 } from "../components/Form2";
import { Form3 } from "../components/Form3";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function FrontPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    console.log("Moving to next step:", step + 1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    console.log("Moving to previous step:", step - 1);
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  // Styles
  const pageStyles = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, white, #f3f4f6)"
  };

  const contentContainerStyles = {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "40px 16px"
  };

  const rowContainerStyles = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "32px"
  };

  const formContainerStyles = {
    width: "50%",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    padding: "32px"
  };

  const headerStyles = {
    marginBottom: "24px"
  };

  const titleStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937"
  };

  const progressContainerStyles = {
    display: "flex",
    gap: "8px",
    marginTop: "8px"
  };

  const getStepIndicatorStyle = (stepNumber) => ({
    height: "8px",
    borderRadius: "9999px",
    width: stepNumber <= step ? "48px" : "32px",
    backgroundColor: stepNumber <= step ? "#3b82f6" : "#e5e7eb",
    transition: "all 0.3s"
  });

  const formContentStyles = {
    transition: "all 0.3s ease-in-out"
  };

  const animationContainerStyles = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const animationStyles = {
    width: "320px",
    height: "320px"
  };

  return (
    <div style={pageStyles}>
      <Navbar />
      
      <div style={contentContainerStyles}>
        <div style={rowContainerStyles}>
          {/* Left side: Form container */}
          <div style={formContainerStyles}>
            <div style={headerStyles}>
              <h2 style={titleStyles}>
                {step === 1 && "Step 1: Basic Information"}
                {step === 2 && "Step 2: Product Details"}
                {step === 3 && "Step 3: Pricing Confirmation"}
              </h2>
              <div style={progressContainerStyles}>
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    style={getStepIndicatorStyle(i)}
                  />
                ))}
              </div>
            </div>
            
            {/* Show Forms Based on Step */}
            <div style={formContentStyles}>
              {step === 1 && <Form1 nextStep={nextStep} />}
              {step === 2 && <Form2 nextStep={nextStep} prevStep={prevStep} />}
              {step === 3 && <Form3 prevStep={prevStep} navigate={navigate} />}
            </div>
          </div>
          
          {/* Right side: Animation */}
          <div style={animationContainerStyles}>
            <DotLottieReact
              src="https://lottie.host/71992eca-90b8-4045-b139-1cfc6b8f4210/ZqLYAFWjfc.lottie"
              loop
              autoplay
              style={animationStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}