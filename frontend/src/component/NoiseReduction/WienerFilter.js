import React, {useState} from "react";

function WienerFilter() {
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [kernelSize, setKernelSize] = useState(3);
    const [wienerImage, setWienerImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleKernelSizeChange = (event) => {
        setKernelSize(event.target.value);
    }

    const handleWienerFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "wiener_filter");
        formData.append("kernel_size", kernelSize);

        try {
            const response = await fetch("http://127.0.0.1:8000/noise-reduction/", {    // Change the URL
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setWienerImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Wiener Filter işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="wiener-filter">
        <h1 className="header">Wiener Filter</h1>
        <p className="description">
            Wiener Filter is a noise reduction technique that removes noise from an image by estimating the original image from a noisy image. It is used to improve the quality of an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {wienerImage && <img src={wienerImage} alt="Wiener Filtered Image" width="300" />}
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
                <button onClick={handleWienerFilter}>Wiener Filter</button>
            </div>
        )}
    </div>
);

}

export default WienerFilter;