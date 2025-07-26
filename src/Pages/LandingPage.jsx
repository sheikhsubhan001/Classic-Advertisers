import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flcPrintData } from "../Data/Data";

const LandingPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [pricePerSft, setPricePerSft] = useState(0);
  const [customSft, setCustomSft] = useState(0);

  const handleSelect = (e) => {
    const item = flcPrintData.find((_, idx) => idx === parseInt(e.target.value));
    setSelected(item);
    setCustomSft(item?.sft || 0);
  };

  const totalPrice = selected ? customSft * pricePerSft : 0;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-white">FLC Print Estimator</h1>

      <select
        onChange={handleSelect}
        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Select Item</option>
        {flcPrintData.map((item, index) => (
          <option key={index} value={index} className="text-gray">
            {item.size} ({item.qty}) - {item.sft} sft
          </option>
        ))}
      </select>

      {selected && (
        <div className="p-6 border border-gray-700 rounded-xl shadow-lg bg-gray-800 space-y-4">
          <p><strong>Size:</strong> {selected.size}</p>
          <p><strong>Quantity:</strong> {selected.qty}</p>
          <p><strong>Fixed Square Feet:</strong> {selected.sft}</p>

          <input
            type="number"
            placeholder="Enter Custom Sq. Ft."
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white"
            value={customSft}
            onChange={(e) => setCustomSft(parseFloat(e.target.value))}
          />

          <input
            type="number"
            placeholder="Price per Sft"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white"
            onChange={(e) => setPricePerSft(parseFloat(e.target.value))}
          />

          <p className="text-lg font-semibold text-blue-400">Total Price: Rs. {totalPrice}</p>
        </div>
      )}

      <button
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 rounded-lg transition duration-300"
        onClick={() => navigate("/receipt", { state: { ...selected, sft: customSft, totalPrice } })}
        disabled={!selected}
      >
        Generate Receipt
      </button>
    </div>
  );
};

export default LandingPage;