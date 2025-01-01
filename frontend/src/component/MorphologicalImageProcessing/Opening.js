import React, {useState} from 'react'

function Opening() {
    const [image, setImage] = useState(null);
    const [openedImage, setOpeningImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [kernelSize, setKernelSize] = useState(3);
    const [iterations, setIterations] = useState(1);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleKernelSizeChange = (event) => {
        setKernelSize(event.target.value);
    }

    const handleIterationsChange = (event) => {
        setIterations(event.target.value);
    }

    const handleOpening = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "opening");
        formData.append("kernel_size", kernelSize);
        formData.append("iterations", iterations);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-morpho-operations/", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const openedImageUrl = URL.createObjectURL(blob);
                setOpeningImage(openedImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Opening işlemi sırasında hata oluştu:", error);
        }
    }

 return (
    <div className="opening">
        <p className="description">
            Opening is a morphological image processing technique that removes small objects from the foreground of an image. It is used to remove noise from an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {openedImage && <img src={openedImage} alt="Opening Result" width="300" />}
        </div>

        {/* Kernel Size, Iterations ve Buton */}
        {selectedFile && (
            <div className="input-container">
                <label htmlFor="kernelSize">Kernel Size:</label>
                <input
                    id="kernelSize"
                    type="number"
                    value={kernelSize}
                    onChange={handleKernelSizeChange}
                />
                <label htmlFor="iterations">Iterations:</label>
                <input
                    id="iterations"
                    type="number"
                    value={iterations}
                    onChange={handleIterationsChange}
                />
                <button onClick={handleOpening}>Opening</button>
            </div>
        )}
    </div>
);

}

export default Opening;