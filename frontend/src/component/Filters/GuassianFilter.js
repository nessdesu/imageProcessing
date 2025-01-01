import React, {useState} from "react";
import Matrix from "../Matrix";

function GuassianFilter() {
    const [image, setImage] = useState(null);
    const [guassianFilteredImage, setGuassianFilteredImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [matrix, setMatrix] = useState();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleGuassianFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "gaussian");

        if (matrix){
            formData.append("matrix", JSON.stringify(matrix));
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-filter/",
                {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const guassianFilteredImageUrl = URL.createObjectURL(blob);
                setGuassianFilteredImage(guassianFilteredImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Guassian Filter işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="average">
        <h1 className="header">Gaussian Filter</h1>
        <p className="description">
           The Gaussian filter is a smoothing filter that reduces image noise and detail. It uses a Gaussian function to weight the surrounding pixel values, giving more influence to closer pixels and creating a natural blur.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Görseller yan yana */}
        {image && guassianFilteredImage && (
            <div className="image-container">
                <img src={image} alt="Uploaded Image" width="300" />
                <img src={guassianFilteredImage} alt="Gaussian Filter Result" width="300" />
            </div>
        )}

        {/* Matris ve buton */}
        {selectedFile && (
            <div className="matrixContainer">
                <Matrix onMatrixChange={setMatrix} />
                <button onClick={handleGuassianFilter}>Gaussian Filter</button>
            </div>
        )}
    </div>
);


}

export default GuassianFilter;