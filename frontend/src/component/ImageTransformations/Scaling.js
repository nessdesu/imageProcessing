import React, {useState} from "react";

function Scale() {
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [scalingImage, setScalingImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleScaleXChange = (event) => {
        setScaleX(event.target.value);
    }

    const handleScaleYChange = (event) => {
        setScaleY(event.target.value);
    }

    const handleScaling = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "scaling");
        formData.append("scale_x", scaleX);
        formData.append("scale_y", scaleY);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-transformation/", {    // Change the URL
                method: "POST", body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setScalingImage(imageURL);
            }
            else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Scaling işlemi sırasında hata oluştu:", error);
        }
    }

    return (
        <div className="scaling">
            <h1>Scaling</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>
                    <label htmlFor="scaleX">Scale X:</label>
                    <input
                        id="scaleX"
                        type="number"
                        value={scaleX}
                        onChange={handleScaleXChange}
                    />
                    <label htmlFor="scaleY">Scale Y:</label>
                    <input
                        id="scaleY"
                        type="number"
                        value={scaleY}
                        onChange={handleScaleYChange}
                    />
                    <button onClick={handleScaling}>Scale</button>
                </div>
            )}
            {scalingImage && <img src={scalingImage} alt="Scaled Image" width="300"/>}
        </div>
    );
}

export default Scale;