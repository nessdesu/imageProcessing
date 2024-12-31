import React, {useState} from "react";

function Rotation() {
    const [angle, setAngle] = useState(0);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rotationImage, setRotationImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleAngleChange = (event) => {
        setAngle(event.target.value);
    }

    const handleRotation = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "rotation");
        formData.append("angle", angle);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-transformation/", {    // Change the URL
                method: "POST", body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setRotationImage(imageURL);
            }
            else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        }
        catch (error) {
            console.error("Rotation işlemi sırasında hata oluştu:", error);
        }
    }

    return (
        <div className="rotation">
        <h1>Rotation</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
        <div>
             <label htmlFor="angle">Angle:</label>
                    <input
                        id="angle"
                        type="number"
                        value={angle}
                        onChange={handleAngleChange}
                    />
            <button onClick={handleRotation}>Rotate</button>
        </div>
    )}{rotationImage && <img src={rotationImage} alt="Rotation Result" width="300"/>}
        </div> );
}


export default Rotation;