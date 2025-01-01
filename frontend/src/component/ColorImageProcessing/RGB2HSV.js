import React, {useState} from "react";

function RGB2HSV() {
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [converted, setConverted] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleConvert = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "rgb2hsv");

        try {
            const response = await fetch("http://127.0.0.1:8000/apply_color_image/",
                {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setConverted(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("RGB2HSV işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="rgb2hsv">
        <h1 className="header">RGB2HSV</h1>
        <p className="description">
            RGB2HSV is a color image processing technique that converts an RGB image to an HSV image. It is used to analyze and manipulate the color information in an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {converted && <img src={converted} alt="Converted Image" width="300" />}
        </div>

        {/* Convert Butonu */}
        {selectfile && (
            <div className="button-container">
                <button onClick={handleConvert}>Convert</button>
            </div>
        )}
    </div>
);

}

export default RGB2HSV;