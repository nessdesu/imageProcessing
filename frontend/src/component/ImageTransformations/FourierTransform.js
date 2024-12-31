import React, {useState} from "react";

function FourierTransform() {
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fourierImage, setFourierImage] = useState(null);
    const [spec, setSpec] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleSpecChange = (event) => {
        setSpec(event.target.value);
    }

    const handleFourierTransform = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "fourier_transform");
        formData.append("spec", spec);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-transformation/", {    // Change the URL
                method: "POST", body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setFourierImage(imageURL);
            }
            else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        }
        catch (error) {
            console.error("Fourier Transform işlemi sırasında hata oluştu:", error);
        }
    }

    return (
        <div className="fourier-transform">
            <h1>Fourier Transform</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            <div>
                <label>
                    Spec:
                    <input type="text" value={spec} onChange={handleSpecChange}/>
                </label>
            </div>
            {selectedFile && <button onClick={handleFourierTransform}>Apply Fourier Transform</button>}
            {fourierImage && <img src={fourierImage} alt="Fourier Transformed Image" width="300"/>}
        </div>
    );
}

export default FourierTransform;