import React, {useState} from 'react';

function OtsuMethod() {
    const [image, setImage] = useState(null);
    const [otsuImage, setOtsuImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(255);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleFirstValueChange = (event =>{
        setFirstValue(event.target.value);

    });

    const handleSecondValueChange = (event =>{
        setSecondValue(event.target.value);
    });

    const handleOtsuMethod = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "otsu_method");
        formData.append("first_value", firstValue);
        formData.append("second_value", secondValue);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-segmentation/",
                {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const otsuURL = URL.createObjectURL(blob);
                setOtsuImage(otsuURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Otsu Method işlemi sırasında hata oluştu:", error);
        }
    }
    return (
        <div className="average">
            <h1 className="header">Otsu Method</h1>
            <p className="description">
                The Otsu method is a thresholding technique that automatically calculates the optimal threshold value to separate the foreground and background of an image. It maximizes the inter-class variance between the two classes, making it ideal for image segmentation.
            </p>
            <input type="file" onChange={handleImageUpload}/>
            <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300"/>}

            {otsuImage && <img src={otsuImage} alt="Otsu Method Result" width="300"/>}
                </div>
               {selectedFile && (
                <div>
                    <label htmlFor="firstValue">First Color:</label>
                    <input
                        id="firstValue"
                        type="number"
                        value={firstValue}
                        onChange={handleFirstValueChange}
                    />
                    <label htmlFor="secondValue">Second Color:</label>
                    <input
                        id="secondValue"
                        type="number"
                        value={secondValue}
                        onChange={handleSecondValueChange}
                    />
                    <button onClick={handleOtsuMethod}>Otsu Method</button>
                </div>
            )}
        </div>
    );
}

export default OtsuMethod;