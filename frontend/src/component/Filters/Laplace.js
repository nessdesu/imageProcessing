import React, {use, useState} from "react";
import Matrix from "../Matrix";

function Laplace() {
    const [image, setImage] = useState(null);
    const [laplaceImage, setLaplaceImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [matrix, setMatrix] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleLaplace = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "laplace");

        if (matrix) {
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
                const laplaceImageURL = URL.createObjectURL(blob);
                setLaplaceImage(laplaceImageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Laplace Filter işlemi sırasında hata oluştu:", error);
        }
    }
    return (
        <div className="mainFilter">
            <h1 className="header">Laplace Filter</h1>
            <p className="description">
                The Laplace filter is an edge detection technique that highlights regions of rapid intensity change in an image. It enhances the edges of an image by emphasizing areas where the intensity changes abruptly.
            </p>
            <input type="file" onChange={handleImageUpload}/>
            <div className="image-container">
                {image && <img src={image} alt="Uploaded Image" width="300"/>}

                {laplaceImage && <img src={laplaceImage} alt="Laplace Filter Result" width="300"/>}
            </div>
                {selectedFile && (
                    <div>
                        <div>
                            <Matrix onMatrixChange={setMatrix}/>
                        </div>
                        <button onClick={handleLaplace}>Laplace Filter</button>
                    </div>
                )}
            </div>
            );
            }

            export default Laplace;