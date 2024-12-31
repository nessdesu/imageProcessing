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
            <h1>Wavelets Transformation</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>

                    <button onClick={handleWaveletsTransform}>Wavelets Transformation</button>
                </div>
            )}{waveletsImage && <img src={waveletsImage} alt="Wavelets Transformation Result" width="300"/>}
        </div>);
}

export default WaveletsTransformation;