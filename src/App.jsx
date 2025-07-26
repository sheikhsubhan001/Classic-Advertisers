import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ReceiptPage from "./Pages/ReceiptPage";
import "./index.css";
function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;