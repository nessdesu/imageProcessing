import React, {useState} from "react";
import {data} from "react-router-dom";

function AdaptiveThresholding() {
    const [image, setImage] = useState(null);
    const [meanImage, setMeanImage] = useState(null);
    const [gaussianImage, setGaussianImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [blockSize, setBlockSize] = useState(3);
    const [c, setC] = useState(2);
    const [color, setColor] = useState("Mean");

    const handleImageUpload = (event => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    });

    const handleBlockSizeChange = (event) => {
        setBlockSize(event.target.value);
    };

    const handleCChange = (event) => {
        setC(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleAdaptiveThreshold = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "adaptive_threshold");
        formData.append("block_size", blockSize);
        formData.append("c", c);
        formData.append("color", color);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-segmentation/", {
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const adaptiveURL = URL.createObjectURL(blob);
                const meanImage = `data:image/png;base64,${data.mean}`; // Base64 formatındaki veriyi al
                const gaussianImage = `data:image/png;base64,${data.gaussian}`; // Base64 formatındaki veriyi al
                setMeanImage(meanImage);
                setGaussianImage(gaussianImage);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Adaptive Threshold işlemi sırasında hata oluştu:", error);
        }
    };


    return (<div className="threshold">
            <h1>Adaptive Threshold</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Seçilen Resim" width="300"/>}
            {selectedFile && (<div>
                <label htmlFor="blockSize">Block Size:</label>
                <input
                    id="blockSize"
                    type="number"
                    value={blockSize}
                    onChange={handleBlockSizeChange}
                />
                <label htmlFor="c">Constant:</label>
                <input
                    id="c"
                    type="number"
                    value={c}
                    onChange={handleCChange}
                />
                <label htmlFor="color">Color:</label>
                <input
                    id="color"
                    type="number"
                    value={color}
                    onChange={handleColorChange}
                />
                <button onClick={handleAdaptiveThreshold}>Adaptive Threshold</button>
            </div>)}
            <div>
                {meanImage && <img src={meanImage} alt="Mean Adaptive Threshold" width="300"/>}
                {gaussianImage && <img src={gaussianImage} alt="Gaussian Adaptive Threshold" width="300"/>}
            </div>

        </div>
    );
}


export default AdaptiveThresholding;