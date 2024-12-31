import React, { useState } from 'react';

function AdaptiveHistogramEqualization() {
    const [image, setImage] = useState(null);
    const [meanImageUrl, setMeanImageUrl] = useState(null);
    const [gaussianImageUrl, setGaussianImageUrl] = useState(null);
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

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-adaptive-threshold/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                // Assuming the server returns a URL or direct file response
                const meanBlob = await response.blob();
                const gaussianBlob = await response.blob();

                // Create object URLs for both images
                setMeanImageUrl(URL.createObjectURL(meanBlob));
                setGaussianImageUrl(URL.createObjectURL(gaussianBlob));
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Histogram eşitleme sırasında hata oluştu:", error);
        }
    };

    return (
        <div className="a_histogram">
            <h1>Adaptive Histogram Equalization</h1>

            <input type="file" onChange={handleImageUpload} />
            {image && <img src={image} alt="Seçilen Resim" width="300" />}
            {selectedFile && (
                <div>
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
            {meanImageUrl && gaussianImageUrl && (
                <div>
                    <h3>Adaptive Histogram Equalization Results</h3>
                    <h4>Mean Threshold</h4>
                    <img src={meanImageUrl} alt="Mean Adaptive Threshold" width="300" />
                    <h4>Gaussian Threshold</h4>
                    <img src={gaussianImageUrl} alt="Gaussian Adaptive Threshold" width="300" />
                </div>
            )}
        </div>
    );
}

export default AdaptiveHistogramEqualization;
