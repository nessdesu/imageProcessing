// ImageEnhancement.js
import React, { useState } from "react";
import "./ImageEnhancement.css";
import AverageFilter from "./Filters/AverageFilter";
import GuassianFilter from "./Filters/GuassianFilter";
import HistogramEqualization from "./Filters/HistogramEqualization";
import AdaptiveHistogramEqualization from "./Filters/AdaptiveHistogramEqualization";
import Sobel from "./Filters/Sobel";
import Laplace from "./Filters/Laplace";

function ImageEnhancement() {
  const [selectedEnhancement, setSelectedEnhancement] = useState(null);

  const enhancements = {

"Noise Reduction": ["Average Filter", "Gaussian Filter"],
    "Contrast Enhancement": ["Histogram Equalization", "Adaptive Histogram Equalization"],
    "Sharpen": ["Sobel", "Laplace"]
  };

  const handleEnhancementClick = (category, method) => {
    setSelectedEnhancement(method);
  };


  const showContent = () => {
          if (selectedEnhancement === "Average Filter") {
              return <AverageFilter/>
          } else if (selectedEnhancement === "Gaussian Filter") {
              return <GuassianFilter/>
          }
          if (selectedEnhancement === "Histogram Equalization") {
              return <HistogramEqualization/>

          } else if (selectedEnhancement === "Adaptive Histogram Equalization") {
                return <AdaptiveHistogramEqualization/>
          }
          if (selectedEnhancement === "Sobel") {
              return <Sobel/>
          } else if (selectedEnhancement === "Laplace") {
              return <Laplace/>
          }
      }

      return (
          <div className="image-enhancement">
              {/* Sidebar Navigation */}
              <div className="sidebar">
                  <h3>
                      Image Processing Techniques</h3>
                  <ul>
                      {Object.keys(enhancements).map((category) => (
                          <li key={category}>
                              <span>{category}</span>
                              <ul>
                                  {enhancements[category].map((method) => (
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
                  {selectedEnhancement ? (
                      <div>
                          {showContent()}
                      </div>
                  ) : (
                  <div>
  <h2>Choose a Technique</h2>
  <p>
    Image enhancement is a process used in digital image processing to improve the visual quality or highlight specific features of an image.
    This technique enhances the interpretability or perception of information in images for human viewers or prepares the image for further processing by machines.
    The goal is not to retrieve the original image but to make specific details more prominent or correct visual deficiencies.
  </p>
  <h3>Examples of Image Enhancement Filters:</h3>
  <ul>
    <li><strong>Sharpening Filters:</strong> Enhance edges and details in the image, making it appear crisper.</li>
    <li><strong>Smoothing Filters:</strong> Reduce noise or irregularities, such as Gaussian or Median filters.</li>
    <li><strong>Contrast Adjustment:</strong> Increase or decrease the contrast to make certain features more distinguishable.</li>
    <li><strong>Histogram Equalization:</strong> Improve the overall brightness and contrast by redistributing the intensity levels of the image.</li>
  </ul>
   <img src="/Ekran%20görüntüsü%202024-12-31%20142753.png"></img>
</div>
                  )}
              </div>
          </div>
      );
  }
export default ImageEnhancement;
