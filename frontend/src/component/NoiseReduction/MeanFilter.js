import React, {useState} from "react";
import Matrix from "../Matrix";

function MeanFilter(){
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [meanImage, setMeanImage] = useState(null);
    const [matrix, setMatrix] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleMeanFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "mean_filter");

        if(matrix){
            formData.append("matrix", JSON.stringify(matrix));
        }
        else {
            alert("Lütfen bir matris seçiniz.");
            return;
        }

        try {
             const response = await fetch("http://127.0.0.1:8000/noise-reduction/", {
                method: "POST", body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setMeanImage(imageURL);
            }
            else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        }
        catch (error) {
            console.error("Mean Filter işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="mean-filter">
        <h1 className="header">Mean Filter</h1>
        <p className="description">
            Mean Filter is a noise reduction technique that replaces each pixel value with the average of its neighboring pixels. It is used to remove noise and smooth out an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimler yan yana */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {meanImage && <img src={meanImage} alt="Mean Filtered Image" width="300" />}
        </div>

        {/* Matrix ve Buton */}
        {selectfile && (
            <div className="input-container">
                <Matrix onMatrixChange={setMatrix} />
                <button onClick={handleMeanFilter}>Mean Filter</button>
            </div>
        )}
    </div>
);

}

export default MeanFilter;