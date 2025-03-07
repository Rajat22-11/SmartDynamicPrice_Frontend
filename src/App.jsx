import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "./pages/frontPage";
import NextPage from "./pages/nextPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/nextPage" element={<NextPage />} />
      </Routes>
    </Router>
  );
}
