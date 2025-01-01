import React, {useState} from "react";

function MedianFilter() {
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [kernelSize, setKernelSize] = useState(3);
    const [medianImage, setMedianImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleKernelSizeChange = (event) => {
        setKernelSize(event.target.value);
    }

    const handleMedianFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "median_filter");
        formData.append("kernel_size", kernelSize);

        try {
            const response = await fetch("http://127.0.0.1:8000/noise-reduction/", {    // Change the URL
                method: "POST", body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setMedianImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Median Filter işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="median-filter">
        <h1 className="header">Median Filter</h1>
        <p className="description">
            Median Filter is a noise reduction technique that replaces each pixel value with the median of its neighboring pixels. It is used to remove noise and smooth out an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimler yan yana */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {medianImage && <img src={medianImage} alt="Median Filtered Image" width="300" />}
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
                <button onClick={handleMedianFilter}>Median Filter</button>
            </div>
        )}
    </div>
);

    }
export default MedianFilter;