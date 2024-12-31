import React, {useState} from 'react';

function Closing() {
  const [image, setImage] = useState(null);
    const [closedImage, setClosingImage] = useState(null);
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

    const handleClosing = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "closing");
        formData.append("kernel_size", kernelSize);
        formData.append("iterations", iterations);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-morpho-operations/", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const closedImageUrl = URL.createObjectURL(blob);
                setClosingImage(closedImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Closing işlemi sırasında hata oluştu:", error);
        }
    }

    return (
        <div className="closing">
            <h1>Closing</h1>
            <input type="file" onChange={handleImageUpload} />
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {selectedFile && (
                <div>
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
                    <button onClick={handleClosing}>Closing</button>
                </div>
            )}
            {closedImage && <img src={closedImage} alt="Closing Result" width="300" />}
        </div>
    );
}

export default Closing;