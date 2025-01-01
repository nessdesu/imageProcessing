
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
            <div>
          <h2>Choose a technique.</h2>
                <p>Morphological image processing is a collection of operations used to analyze and process the structure of shapes within binary or grayscale images. These techniques are based on set theory and use a structuring element to probe the image. Common operations include dilation, which expands the boundaries of objects; erosion, which shrinks them; opening, which removes small objects; and closing, which fills small holes. Morphological processing is widely used in applications like image segmentation, noise removal, and feature extraction, particularly in fields requiring shape analysis such as medical imaging and industrial inspection.</p>
                <img className="image-size" src="/morphologicalImageProcessing.webp"/>
            </div>
        )}
      </div>
    </div>
  );
}

export default MorphologicalImageProcessing;
