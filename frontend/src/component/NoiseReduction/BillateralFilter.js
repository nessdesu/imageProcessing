import React, {useState} from "react";

function BillateralFilter(){
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [kernelSize, setKernelSize] = useState(3);
    const [sigmaColor, setSigmaColor] = useState(75);
    const [sigmaSpace, setSigmaSpace] = useState(75);
    const [billateralImage, setBillateralImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleKernelSizeChange = (event) => {
        setKernelSize(event.target.value);
    }

    const handleSigmaColorChange = (event) => {
        setSigmaColor(event.target.value);
    }

    const handleSigmaSpaceChange = (event) => {
        setSigmaSpace(event.target.value);
    }

    const handleBillateralFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "billateral_filter");
        formData.append("kernel_size", kernelSize);
        formData.append("sigma_color", sigmaColor);
        formData.append("sigma_space", sigmaSpace);

        try {
            const response = await fetch("http://127.0.0.1:8000/noise-reduction/", {    // Change the URL
                method: "POST", body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setBillateralImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Billateral Filter işlemi sırasında hata oluştu:", error);
        }
    }
    return (
        <div className="billateral-filter">
            <h1 className="header">Billateral Filter</h1>
            <p className="description">
                Billateral Filter is a noise reduction technique that preserves edges while removing noise from an image. It is used to smooth out an image while keeping the edges sharp.
            </p>
            <input type="file" onChange={handleImageUpload}/>
            <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {billateralImage && <img src={billateralImage} alt="Billateral Filtered Image" width="300"/>}
                </div>
            {selectfile && (
                <div className="input-container">
                    <label htmlFor="kernelSize">Kernel Size:</label>
                    <input
                        id="kernelSize"
                        type="number"
                        value={kernelSize}
                        onChange={handleKernelSizeChange}
                    />
                    <label htmlFor="sigmaColor">Sigma Color:</label>
                    <input
                        id="sigmaColor"
                        type="number"
                        value={sigmaColor}
                        onChange={handleSigmaColorChange}
                    />
                    <label htmlFor="sigmaSpace">Sigma Space:</label>
                    <input
                        id="sigmaSpace"
                        type="number"
                        value={sigmaSpace}
                        onChange={handleSigmaSpaceChange}
                    />
                    <button onClick={handleBillateralFilter}>Billateral Filter</button>
                </div>
            )}

        </div>
    );
}

export default BillateralFilter;