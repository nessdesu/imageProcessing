import React, {useState} from "react";
import Matrix from "../Matrix";

function HighPassFilter() {
    const [image, setImage] = useState(null);
    const [highPassFilteredImage, setHighPassFilteredImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [maskSize, setMaskSize] = useState(60);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleMaskSizeChange = (event) => {
        setMaskSize(event.target.value);
    }

    const handleHighPassFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "high_pass");
        formData.append("mask_size", maskSize);
        console.log(maskSize);
        try {
            const response = await fetch("http://127.0.0.1:8000/apply_color_image/",
                {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const highPassFilteredImageUrl = URL.createObjectURL(blob);
                setHighPassFilteredImage(highPassFilteredImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("High Pass Filter işlemi sırasında hata oluştu:", error);
        }
    }
    return (
        <div className="high-pass">
            <h1>High Pass Filter</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>
                    <label htmlFor="mask_size">Mask Size:</label>
                    <input
                        id="mask_size"
                        type="number"
                        value={maskSize}
                        onChange={handleMaskSizeChange}
                    />
                    <button onClick={handleHighPassFilter}>High Pass Filter</button>
                </div>
            )}
            {highPassFilteredImage && <img src={highPassFilteredImage} alt="High Pass Filtered Image" width="300"/>}
        </div>
    );

}

export default HighPassFilter;