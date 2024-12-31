
import React, { useState } from "react";
import "./ImageEnhancement.css";
import MeanFilter from "./NoiseReduction/MeanFilter";
import MedianFilter from "./NoiseReduction/MedianFilter";
import WienerFilter from "./NoiseReduction/WienerFilter";
import BillateralFilter from "./NoiseReduction/BillateralFilter";

function NoiseReduction() {
  const [selectedReduction, setSelectedReduction] = useState(null);

  const reductions = {

    "Noise Reduction": ["Mean Filter", "Median Filter",
    "Wiener Filter", "Billateral Filter"],

  };

  const handleEnhancementClick = (category, method) => {
    setSelectedReduction(method);
    console.log(selectedReduction)
  };

  const showContent = () => {
    switch (selectedReduction) {
        case "Mean Filter":
            return <MeanFilter />;
        case "Median Filter":
            return <MedianFilter />;
        case "Wiener Filter":
            return <WienerFilter />;
        case "Billateral Filter":
            return <BillateralFilter />;
        default:
            return null;
    }
  }

  return (
    <div className="image-enhancement">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>
            Image Processing Techniques</h3>
        <ul>
          {Object.keys(reductions).map((category) => (
            <li key={category}>
              <span>{category}</span>
              <ul>
                {reductions[category].map((method) => (
                  <li key={method}>
                    <button
                      onClick={() => handleEnhancementClick(category, method)}
                    >
                      {method}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="content">
        {selectedReduction ? (
          <div>
            {showContent()}
          </div>
        ) : (
          <h2>Choose a technique.</h2>
        )}
      </div>
    </div>
  );
}

export default NoiseReduction;
