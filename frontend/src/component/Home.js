import React from "react";
import {Link} from "react-router-dom";
import "./Home.css";

function Home() {
  return (
      <div className="home">
        <h1>Image Processing WebBox</h1>
          <div className="card-container">
              <div className="card">
                  <h2>Image Enhancement</h2>
                  <img className="img" src="/imageenhanement.png" alt="Image Enhancement"/>
                  <p>Apply enhancement technics to your images.</p>
                  <Link to="/imageEnhancement">
                      <button>Go</button>
                  </Link>
              </div>

              <div className="card">
                  <h2>Image Segmentation</h2>
                  <img className="img" src="/threshold.jpg" alt="Image Segmantation"/>
                  <p>Apply segmentation technics to your images.</p>
                  <Link to="/imageSegmentation">
                      <button>Go</button>
                  </Link>
              </div>

              <div className="card">
                  <h2>Image Transformations</h2>
                  <img className="img" src="/fourier.png" alt="Image Transformations"/>
                  <p>Apply transformation technics to your images.</p>
                  <Link to="/imageTransformations">
                      <button>Go</button>
                  </Link>
              </div>

              <div className="card">
                  <h2>Noise Reduction</h2>
                  <img className="img" src="/1_wJfPULU0I_OnskXTkWjqkA.gif" alt="Noise Reduction"/>
                  <p>Apply noise reduction technics to your images.</p>
                  <Link to="/noiseReduction">
                      <button>Go</button>
                  </Link>
              </div>

              <div className="card">
                  <h2>Image Restoration</h2>
                  <img className="img" src="/Deblurring_Techniques_1_262a336b17.jpeg" alt="Image Restoration"/>
                  <p>Apply restoration technics to your images.</p>
                  <Link to="/imageRestoration">
                      <button>Go</button>
                  </Link>
              </div>

              <div className="card">
                  <h2>Color Image Processing</h2>
                  <img className="img" src="/rgb.png" alt="Color Image Processing"/>
                  <p>Apply color image processing technics to your images.</p>
                  <Link to="/colorImageProcessing">
                      <button>Go</button>
                  </Link>
              </div>

              <div className="card">
                  <h2>Morphological Image Processing</h2>
                  <img className="img" src="/diltbin.gif" alt="Morphological Image Processing"/>
                  <p>Apply morphological image processing technics to your images.</p>
                  <Link to="/morphologicalImageProcessing">
                      <button>Go</button>
                  </Link>
              </div>
          </div>
      </div>
  );
}

export default Home;
