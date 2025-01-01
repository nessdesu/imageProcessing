import React, {useState} from "react";

function WaveletsTransformation() {
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [waveletsImage, setWaveletsImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleWaveletsTransform = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "wavelets_transform");

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-transformation/", {    // Change the URL
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setWaveletsImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Wavelets Transform işlemi sırasında hata oluştu:", error);
        }
    }
    return (
    <div className="wavelets">
        <h1 className="header">Wavelets Transformation</h1>
        <p className="description">
            Wavelets Transformation is a mathematical operation that decomposes an image into different frequency bands. It is used to analyze the frequency components of an image and remove noise or enhance features.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimler yan yana */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {waveletsImage && <img src={waveletsImage} alt="Wavelets Transformation Result" width="300" />}
        </div>

        {/* Buton */}
        {selectedFile && (
            <div className="button-container">
                <button onClick={handleWaveletsTransform}>Wavelets Transformation</button>
            </div>
        )}
    </div>
);

}

export default WaveletsTransformation;