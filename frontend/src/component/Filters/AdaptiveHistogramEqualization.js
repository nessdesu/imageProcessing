import React, { useState } from 'react';

function AdaptiveHistogramEqualization() {
    const [image, setImage] = useState(null);
    const [meanImageUrl, setMeanImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [clipLimit, setClipLimit] = useState(2);
    const [tileSize, setTileSize] = useState(8);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    const handleAdaptiveHistogramEqualization = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('clipLimit', clipLimit);
        formData.append('tileSize', tileSize);
        formData.append('filter_type', 'a_histogram_equalization');

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-filter/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                // Assuming the server returns a URL or direct file response
                const meanBlob = await response.blob();

                // Create object URLs for both images
                setMeanImageUrl(URL.createObjectURL(meanBlob));
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Histogram eşitleme sırasında hata oluştu:", error);
        }
    };

return (
    <div className="mainFilter">
        <h1 className="header">Adaptive Histogram Equalization</h1>
        <p className="description">
           Adaptive histogram equalization enhances the contrast of an image by dividing it into small, overlapping regions (tiles) and applying histogram equalization to each. It adapts to local intensity variations, making details in different areas more visible.
        </p>
        <div className="file-input">
            <input type="file" onChange={handleImageUpload}/>
        </div>
        <div className="image-container">
            {/* Seçilen resim */}
            {image && (
                <div className="selectedImage">
                    <img src={image} alt="Seçilen Resim" width="300"/>
                </div>
            )}

            {/* İşlenmiş resim */}
            {meanImageUrl && (
                <div className="meanImage">
                    <img src={meanImageUrl} alt="Mean Adaptive Threshold" width="300"/>
                </div>
            )}
        </div>

        {/* İşleme parametreleri */}
        {selectedFile && (
            <div className="input-container">
                <label>
                    Clip Limit:
                    <input
                        type="number"
                        value={clipLimit}
                        onChange={(event) => setClipLimit(event.target.value)}
                    />
                </label>
                <label>
                    Tile Size:
                    <input
                        type="number"
                        value={tileSize}
                        onChange={(event) => setTileSize(event.target.value)}
                    />
                </label>
                <button onClick={handleAdaptiveHistogramEqualization}>Histogram Yap</button>
            </div>
        )}
    </div>
);


}

export default AdaptiveHistogramEqualization;
