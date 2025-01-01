import React , {useState} from "react";
import Matrix from "../Matrix";

function Sobel() {
    const [image, setImage] = useState(null);
    const [sobelImage, setSobelImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [matrix, setMatrix] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleSobel = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "sobel");

        if (matrix){
            formData.append("matrix", JSON.stringify(matrix));
        }

        console.log("Matrix: ", matrix);
        try {
            const response = await fetch("http://127.0.0.1:8000/apply-filter/",
                {
                method: "POST",
                body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const sobelImageURL = URL.createObjectURL(blob);
                setSobelImage(sobelImageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Sobel Filter işlemi sırasında hata oluştu:", error);
        }
        }
 return (
     <div className="mainFilter">
         <h1 className="header">Sobel Filter</h1>
         <p className="description">
             The Sobel filter is an edge detection technique that calculates the gradient of the image intensity in the horizontal and vertical directions. It highlights edges by emphasizing regions of rapid intensity change.
         </p>
         <input type="file" onChange={handleImageUpload}/>
         <div className="image-container">
             {image && <img src={image} alt="Uploaded Image" width="300"/>}


             {sobelImage && <img src={sobelImage} alt="Sobel Filter Result" width="300"/>}
         </div>

             {selectedFile && (
                 <div>
                     <div>
                         <Matrix onMatrixChange={setMatrix}/>
                     </div>
                     <button onClick={handleSobel}>Sobel Filter</button>
                 </div>
             )}
     </div>
 );
}

export default Sobel;