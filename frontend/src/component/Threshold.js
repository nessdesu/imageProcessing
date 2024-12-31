import React, { useState } from "react";
import "./Threshold.css";

function Threshold() {
  const [image, setImage] = useState(null);
  const [thresholdImage, setThresholdImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thresholdValue, setThresholdValue] = useState(127); // Varsayılan threshold değeri

  // Kullanıcıdan resim seçme
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  // Kullanıcıdan threshold değeri alma
  const handleThresholdValueChange = (event) => {
    setThresholdValue(event.target.value);
  };

  // Threshold işlemini başlatma
  const handleThreshold = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile); // Resim dosyasını ekle
    formData.append("filter_type", "threshold"); // Filtre türü
    formData.append("threshold_value", thresholdValue); // Kullanıcıdan alınan threshold değeri

    try {
      const response = await fetch("http://127.0.0.1:8000/apply-filter/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const thresholdUrl = URL.createObjectURL(blob);
        setThresholdImage(thresholdUrl);
      } else {
        alert("Resim işlenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Threshold işlemi sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="threshold">
      <h1>Threshold İşlemi</h1>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Seçilen Resim" width="300" />}
      {selectedFile && (
        <div>
          <label htmlFor="thresholdValue">Threshold Değeri:</label>
          <input
            id="thresholdValue"
            type="number"
            value={thresholdValue}
            onChange={handleThresholdValueChange}
          />
          <button onClick={handleThreshold}>Threshold Yap</button>
        </div>
      )}
      {thresholdImage && <img src={thresholdImage} alt="Threshold Sonucu" width="300" />}
    </div>
  );
}

export default Threshold;
