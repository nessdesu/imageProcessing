
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

            <div>
          <h2>Choose a technique.</h2>
                <p>
Noise reduction is the process of minimizing unwanted random variations, or "noise," in an image while preserving important features like edges and textures. Noise can be introduced during image acquisition, transmission, or processing and often degrades image quality. Techniques for noise reduction include spatial domain filters, such as Gaussian or median filters, and frequency domain methods like Fourier transform-based filtering. Advanced methods, such as bilateral filtering and machine learning-based denoising, aim to balance noise removal with the retention of fine details. Noise reduction is crucial for improving image clarity and accuracy in applications like medical imaging, photography, and video processing.
                </p>
                <img src="/Denoise_Before_After_790px.jpg"></img>
                </div>
        )}
      </div>
    </div>
  );
}

export default NoiseReduction;
