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
                <h1>Median Filter</h1>
                <input type="file" onChange={handleImageUpload}/>
                {image && <img src={image} alt="Uploaded Image" width="300"/>}
                {selectfile && (
                    <div>
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
                {medianImage && <img src={medianImage} alt="Median Filtered Image" width="300"/>}
            </div>
        );
    }
export default MedianFilter;