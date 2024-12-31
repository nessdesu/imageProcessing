import React, {useState} from 'react';

function Skeletonization() {
    const [image, setImage] = useState(null);
    const [skeletonImage, setSkeletonImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [kernelSize, setKernelSize] = useState(3);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleKernelSizeChange = (event) => {
        setKernelSize(event.target.value);
    }

    const handleSkeletonization = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "skel");
        formData.append("kernel_size", kernelSize);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-morpho-operations/", {
                method: "POST",
                body: formData

            });
            if (response.ok) {
                const blob = await response.blob();
                const skeletonImageUrl = URL.createObjectURL(blob);
                setSkeletonImage(skeletonImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Skeletonization işlemi sırasında hata oluştu:", error);
        }
    }
    return (
        <div className="skeletonization">
            <h1>Skeletonization</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>
                    <label htmlFor="kernelSize">Kernel Size:</label>
                    <input
                        id="kernelSize"
                        type="number"
                        value={kernelSize}
                        onChange={handleKernelSizeChange}
                    />
                    <button onClick={handleSkeletonization}>Skeletonization</button>
                </div>
            )}
            {skeletonImage && <img src={skeletonImage} alt="Skeletonization Result" width="300"/>}
        </div>
    );
}

export default Skeletonization;