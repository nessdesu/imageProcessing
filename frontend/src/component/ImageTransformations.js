
import React, { useState } from "react";

import Rotation from "./ImageTransformations/Rotation";
import Scale from "./ImageTransformations/Scaling";
import Translation from "./ImageTransformations/Translation";
import FourierTransform from "./ImageTransformations/FourierTransform";
import WaveletsTransformation from "./ImageTransformations/WaveletsTransformation";

function ImageTransformations() {
  const [selectedTransformation, setSelectedTransformation] = useState(null);

  const transformations = {

"Spatial Transformations": ["Rotation", "Scaling", "Translation"],
    "Frequency Conversions": ["Fourier Transform", "Wavelet Transform"],
  };

  const handleTransformationClick = (category, method) => {
    setSelectedTransformation(method);
  };

      const showContent = () => {
        switch (selectedTransformation) {
            case "Rotation":
                return <Rotation/>;
            case "Scaling":
                return <Scale/>;
            case "Translation":
                return <Translation/>;
            case "Fourier Transform":
                return <FourierTransform/>;
            case "Wavelet Transform":
                return <WaveletsTransformation/>
            default:
                return null;
        }
    };

  return (
    <div className="image-enhancement">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>
            Image Processing Techniques</h3>
        <ul>
          {Object.keys(transformations).map((category) => (
            <li key={category}>
              <span>{category}</span>
              <ul>
                {transformations[category].map((method) => (
                  <li key={method}>
                    <button
                      onClick={() => handleTransformationClick(category, method)}
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
        {selectedTransformation ? (
          <div>
            {showContent()}
          </div>
        ) : (<div>
          <h2>Choose a technique.</h2>
                <p>
                  Image transformation refers to the process of altering the appearance or spatial structure of an image through mathematical operations. It can include tasks like scaling, rotation, translation, and warping to modify the image’s orientation, size, or shape. Transformations are essential in computer vision and graphics, enabling tasks like alignment, normalization, and feature extraction.
                </p>
                <img src="/Geometric-Transformation-in-Image-Processing.webp"></img>
        </div>
        )}
      </div>
    </div>
  );
}

export default ImageTransformations;
