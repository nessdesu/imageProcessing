import React, {useState} from "react";

function CannyEdgeFinder() {
    const [image, setImage] = useState(null);
    const [cannyImage, setCannyImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [threshold1, setThreshold1] = useState(100);
    const [threshold2, setThreshold2] = useState(200);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    const handleThreshold1Change = (event) => {
        setThreshold1(event.target.value);
    };

    const handleThreshold2Change = (event) => {
        setThreshold2(event.target.value);
    };

    const handleCannyEdge = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "canny_edge");
        formData.append("threshold1", threshold1);
        formData.append("threshold2", threshold2);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-segmentation/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const cannyURL = URL.createObjectURL(blob);
                setCannyImage(cannyURL);
            }
        } catch (error) {
            console.error("Canny Edge Finder işlemi sırasında hata oluştu:", error);
        }
    };
return (
    <div className="canny">
        <h1 className="header">Canny Edge Finder</h1>
        <p className="description">
            The Canny edge detector is an edge detection operator that uses a multi-stage algorithm to detect a wide range of edges in images. It is known for its high accuracy and robustness.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimler yan yana */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {cannyImage && <img src={cannyImage} alt="Canny Edge Result" width="300" />}
        </div>

        {/* Threshold ayarları */}
        {selectedFile && (
            <div className="input-container">
                <label htmlFor="threshold1">Threshold 1:</label>
                <input
                    id="threshold1"
                    type="number"
                    value={threshold1}
                    onChange={handleThreshold1Change}
                />
                <label htmlFor="threshold2">Threshold 2:</label>
                <input
                    id="threshold2"
                    type="number"
                    value={threshold2}
                    onChange={handleThreshold2Change}
                />
                <button onClick={handleCannyEdge}>Apply Canny Edge Finder</button>
            </div>
        )}
    </div>
);
}
export default CannyEdgeFinder;