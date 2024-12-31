
import React, { useState } from "react";
import Dilation from "./MorphologicalImageProcessing/Dilation";
import Erosion from "./MorphologicalImageProcessing/Erosion";
import Opening from "./MorphologicalImageProcessing/Opening";
import Closing from "./MorphologicalImageProcessing/Closing";
import Skeletonization from "./MorphologicalImageProcessing/Skeletonization";
import HitOrMiss from "./MorphologicalImageProcessing/HitOrMiss";

function MorphologicalImageProcessing() {
  const [selectedMorphoProcess, setSelectedMorphoProcess] = useState(null);

  const restorations = {

    "Morphological Image Processing": ["Dilation", "Erosion", "Opening", "Closing", "Skeletonization", "Hit-or-miss"],
  };

  const handleMorphoProcessClick  = (category, method) => {
    setSelectedMorphoProcess(method);
  };

  const showContent = () => {
      switch (selectedMorphoProcess) {
          case "Dilation":
                return <Dilation/>
            case "Erosion":
                return <Erosion/>
            case "Opening":
                return <Opening/>
            case "Closing":
                return <Closing/>
            case "Skeletonization":
                return <Skeletonization/>
            case "Hit-or-miss":
                return <HitOrMiss/>
      }
  }

  return (
    <div className="image-enhancement">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>
            Image Processing Techniques</h3>
        <ul>
          {Object.keys(restorations).map((category) => (
            <li key={category}>
              <span>{category}</span>
              <ul>
                {restorations[category].map((method) => (
                  <li key={method}>
                    <button
                      onClick={() => handleMorphoProcessClick(category, method)}
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
        {selectedMorphoProcess ? (
          <div>
            <h2>{selectedMorphoProcess}</h2>
            {showContent()}
          </div>
        ) : (
          <h2>Choose a technique.</h2>
        )}
      </div>
    </div>
  );
}

export default MorphologicalImageProcessing;
