import React, {useState} from 'react';

function LowPassFilter() {
    const [image, setImage] = useState(null);
    const [lowPassFilterImage, setLowPassFilterImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [maskSize, setMaskSize] = useState(60);
    const [kernel, setKernel] = useState(5);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }
        const handleMaskSizeChange = (event) => {
            setMaskSize(event.target.value);
        }

        const handleKernelChange = (event) => {
            setKernel(event.target.value);
        }

        const handleLowPassFilter = async () => {
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("filter_type", "low_pass");
            formData.append("mask_size", maskSize);
            formData.append("kernel", kernel);

            try {
                const response = await fetch("http://127.0.0.1:8000/apply_color_image/",
                    {
                        method: "POST",
                        body: formData
                    });
                if (response.ok) {
                    const blob = await response.blob();
                    const lowPassFilterImageUrl = URL.createObjectURL(blob);
                    setLowPassFilterImage(lowPassFilterImageUrl);
                    console.log(blob);
                } else {
                    alert("Resim işlenirken bir hata oluştu.");
                }
            } catch (error) {
                console.error("Low Pass Filter işlemi sırasında hata oluştu:", error);
            }
        }

        return (
            <div className="low-pass">
                <h1>Low Pass Filter</h1>
                <input type="file" onChange={handleImageUpload}/>
                {image && <img src={image} alt="Uploaded Image" width="300"/>}
                {selectedFile && (
                    <div>
                        <label htmlFor="mask_size">Mask Size:</label>
                        <input
                            id="mask_size"
                            type="number"
                            value={maskSize}
                            onChange={handleMaskSizeChange}
                        />
                        <label htmlFor="kernel">Kernel:</label>
                        <input
                            id="kernel"
                            type="number"
                            value={kernel}
                            onChange={handleKernelChange}
                        />
                        <button onClick={handleLowPassFilter}>Low Pass Filter</button>
                    </div>
                )}
              {lowPassFilterImage && <img src={lowPassFilterImage} alt="Low Pass Filtered Image" width="300" />}

            </div>
        )
    }

export default LowPassFilter;