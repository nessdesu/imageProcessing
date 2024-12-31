import React , {useState} from "react";

function HistogramEqualization(){
    const [image, setImage] = useState(null);
    const [histogramEqualizedImage, setHistogramEqualizedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleHistogramEqualization = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "histogram_equalization");

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-filter/",
            {
                method: "POST",
                body: formData
            });
              if (response.ok) {
        const blob = await response.blob();
        const histogramURL = URL.createObjectURL(blob);
        setHistogramEqualizedImage(histogramURL);
      } else {
        alert("Resim işlenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Threshold işlemi sırasında hata oluştu:", error);
    }
  };
      return (
    <div className="histogram">
      <h1>Histogram Equalization</h1>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Seçilen Resim" width="300" />}
      {selectedFile && (
        <div>
          <button onClick={handleHistogramEqualization}>Histogram Yap</button>
        </div>
      )}
                 {histogramEqualizedImage && (
                <img src={histogramEqualizedImage} alt="Histogram Equalization Result" width="300" />
            )}
    </div>
  );
}

export default HistogramEqualization;