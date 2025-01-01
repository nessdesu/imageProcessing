import React, {useState} from "react";

function RGB2CMYK() {
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
        formData.append("filter_type", "rgb2cmyk");

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
            console.error("RGB2CMYK işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="rgb2cmyk">
        <h1 className="header">RGB2CMYK</h1>
        <p className="description">
            RGB2CMYK is a color image processing technique that converts an RGB image to a CMYK image. It is used to analyze and manipulate the color information in an image.
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

export default RGB2CMYK;