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
       <div className="sobel">
      <h1>Laplace Filter</h1>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded Image" width="300" />}
        <div>
            <Matrix onMatrixChange={setMatrix}/>
        </div>
      {selectedFile && (
        <div>
          <button onClick={handleLaplace}>Laplace Filter</button>
        </div>
      )}
      {laplaceImage && <img src={laplaceImage} alt="Laplace Filter Result" width="300" />}
    </div>
  );
}

export default Laplace;