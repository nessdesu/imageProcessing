import React, {useState} from "react";
import "./Filters.css";

function AverageFilter() {
    const [image, setImage] = useState(null);
    const [averageFilteredImage, setAverageFilteredImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filterSize, setFilterSize] = useState(3);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleFilterSizeChange = (event) => {
        setFilterSize(event.target.value);
    }

    const handleAverageFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "average");
        formData.append("kernel_size", filterSize);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-filter/", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const averageFilteredImageUrl = URL.createObjectURL(blob);
                setAverageFilteredImage(averageFilteredImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Average Filter işlemi sırasında hata oluştu:", error);
        }
    }

return (
  <div className="mainFilter">
    <h1 className="header">Average Filter</h1>
      <p className="description">
          The average filter smooths an image by reducing noise. It works by replacing each pixel's value with the mean of the intensity values in its surrounding neighborhood, resulting in a blurred effect.
      </p>
    <input type="file" onChange={handleImageUpload} />
    {selectedFile && (
      <div>
        <label htmlFor="filterSize">Filter Size:</label>
        <input
          id="filterSize"
          type="number"
          value={filterSize}
          onChange={handleFilterSizeChange}
        />
        <button onClick={handleAverageFilter}>Average Filter</button>
      </div>
    )}
    <div className="image-container">
      {image && <img src={image} alt="Uploaded Image" width="300" />}
      {averageFilteredImage && <img src={averageFilteredImage} alt="Average Filter Result" width="300" />}
    </div>
  </div>
);


}

export default AverageFilter;