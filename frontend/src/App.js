import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Threshold from "./component/Threshold";
import Layout from "./component/Layout";
import ImageEnhancement from "./component/ImageEnhancement";
import ImageSegmentation from "./component/ImageSegmentation";
import ImageTransformations from "./component/ImageTransformations";
import NoiseReduction from "./component/NoiseReduction";
import ImageRestoration from "./component/ImageRestoration";
import ColorImageProcessing from "./component/ColorImageProcessing";
import MorphologicalImageProcessing from "./component/MorphologicalImageProcessing";

function App() {
  return (
    <Router>
        <Layout>
      <Routes>
        {/* Anasayfa */}
        <Route path="/" element={<Home />} />

        {/* İşlem sayfaları */}
        <Route path="/threshold" element={<Threshold />} />
        <Route path="/threshold" element={<Threshold />} />
        <Route path="/imageEnhancement" element={<ImageEnhancement />} />
        <Route path="/imageSegmentation" element={<ImageSegmentation />} />
        <Route path="/imageTransformations" element={<ImageTransformations />} />
        <Route path="/noiseReduction" element={<NoiseReduction />} />
        <Route path="/imageRestoration" element={<ImageRestoration />} />
        <Route path="/colorImageProcessing" element={<ColorImageProcessing />} />
        <Route path="/morphologicalImageProcessing" element={<MorphologicalImageProcessing />} />
        {/* Diğer işlemler için ek sayfalar */}
        {/* <Route path="/processX" element={<ProcessX />} /> */}
      </Routes>
        </Layout>
    </Router>
  );
}

export default App;