import React, {useState} from "react";

function Deblurring() {
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [deblurredImage, setDeblurredImage] = useState(null);
    const [kernelSize, setKernelSize] = useState(3);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleKernelSizeChange = (event) => {
        setKernelSize(event.target.value);
    }

    const handleDeblur = async () => {
        if (kernelSize % 2 === 0) {
            alert("Kernel size çift sayı olmamalı! Lütfen tek bir sayı girin.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "deblurring");
        formData.append("kernel_size", kernelSize);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-restoration/", {
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setDeblurredImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Deblurring işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="deblurring">
        <h1 className="header">Deblurring</h1>
        <p className="description">
            Deblurring is a restoration technique that removes blur from an image. It is used to improve the quality of an image by enhancing the sharpness and clarity of the image.
        </p>

        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {deblurredImage && <img src={deblurredImage} alt="Deblurred Image" width="300" />}
        </div>

        {/* Kernel Size ve Buton */}
        {selectfile && (
            <div className="input-container">
                <label htmlFor="kernelSize">Kernel Size:</label>
                <input
                    id="kernelSize"
                    type="number"
                    value={kernelSize}
                    onChange={handleKernelSizeChange}
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button onClick={handleDeblur}>Deblur</button>
            </div>
        )}
    </div>
);

}

export default Deblurring;