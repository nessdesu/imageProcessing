import React, {useState} from 'react';

function Erosion() {
    const [image, setImage] = useState(null);
    const [erodedImage, setErosionImage] = useState(null);
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

    const handleErosion = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "erosion");
        formData.append("kernel_size", kernelSize);
        formData.append("iterations", iterations);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-morpho-operations/", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const erodedImageUrl = URL.createObjectURL(blob);
                setErosionImage(erodedImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Erosion işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="erosion">
        <p className="description">
            Erosion is a morphological image processing technique that removes pixels from the boundaries of objects in an image. It is used to shrink the boundaries of objects in an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {erodedImage && <img src={erodedImage} alt="Erosion Result" width="300" />}
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
                <button onClick={handleErosion}>Erosion</button>
            </div>
        )}
    </div>
);
}

export default Erosion;