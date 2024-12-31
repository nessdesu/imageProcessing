import React, {use, useState} from "react";

function Translation(){
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [translationImage, setTranslationImage] = useState(null);

    const handleImageUpload = (event) =>{
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleXChange = (event) =>{
        setX(event.target.value);
    }

    const handleYChange = (event) =>{
        setY(event.target.value);
    }

    const handleTranslation = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "translation");
        formData.append("x", x);
        formData.append("y", y);

        try {
            const response = await fetch("http:////127.0.0.1:8000/apply-transformation/", {    // Change the URL
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setTranslationImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Translation işlemi sırasında hata oluştu:", error);
        }
    }

    return (
        <div className="translation">
            <h1>Translation</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>
                    <label htmlFor="x">X:</label>
                    <input
                        id="x"
                        type="number"
                        value={x}
                        onChange={handleXChange}
                    />
                    <label htmlFor="y">Y:</label>
                    <input
                        id="y"
                        type="number"
                        value={y}
                        onChange={handleYChange}
                    />
                    <button onClick={handleTranslation}>Translate</button>
                </div>
            )}{translationImage && <img src={translationImage} alt="Translation Result" width="300"/>}
        </div>
    );

}

export default Translation;