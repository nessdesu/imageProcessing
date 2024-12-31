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

        try {
             const response = await fetch("http://127.0.0.1:8000/noise-reduction/", {    // Change the URL
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
            <h1>Mean Filter</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectfile && (
                <div>
                    <Matrix onMatrixChange={setMatrix}/>
                    <button onClick={handleMeanFilter}>Mean Filter</button>
                </div>
            )}
            {meanImage && <img src={meanImage} alt="Mean Filtered Image" width="300"/>}
        </div>
    );
}

export default MeanFilter;