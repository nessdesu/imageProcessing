import React, {useState} from "react";

function BandStopFilter() {
    const [image, setImage] = useState(null);
    const [bandStopFilteredImage, setBandStopFilteredImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [low, setLow] = useState(100);
    const [high, setHigh] = useState(200);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleLowChange = (event) => {
        setLow(event.target.value);
    }

    const handleHighChange = (event) => {
        setHigh(event.target.value);
    }

    const handleBandStopFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "band_stop");
        formData.append("low", low);
        formData.append("high", high);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply_color_image/",
                {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const bandStopFilteredImageUrl = URL.createObjectURL(blob);
                setBandStopFilteredImage(bandStopFilteredImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Band Stop Filter işlemi sırasında hata oluştu:", error);
        }
    }
  return (
    <div className="band-stop">
        <h1 className="header">Band Stop Filter</h1>
        <p className="description">
            Band Stop Filter is a color image processing technique that removes a specific range of frequencies from an image. It is used to remove a specific range of frequencies from an image while preserving the rest of the image.
        </p>

        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {bandStopFilteredImage && <img src={bandStopFilteredImage} alt="Band Stop Filtered Image" width="300" />}
        </div>

        {/* Low, High ve Buton */}
        {selectedFile && (
            <div className="input-container">
                <label htmlFor="low">Low:</label>
                <input
                    id="low"
                    type="number"
                    value={low}
                    onChange={handleLowChange}
                />
                <label htmlFor="high">High:</label>
                <input
                    id="high"
                    type="number"
                    value={high}
                    onChange={handleHighChange}
                />
                <button onClick={handleBandStopFilter}>Band Stop Filter</button>
            </div>
        )}
    </div>
);

}

export default BandStopFilter;