import React, {useState} from "react";

function WatershedSegmentation(){
    const [image, setImage] = useState(null);
    const [watershedImage, setWatershedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [iteration, setIteration] = useState(1);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    const handleIterationChange = (event) => {
        setIteration(event.target.value);
    };

    const handleWatershedSegmentation = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "watershed_segmentation");
        formData.append("iteration", iteration);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-segmentation/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const watershedURL = URL.createObjectURL(blob);
                setWatershedImage(watershedURL);
            }
        } catch (Error) {
            console.error("Watershed Segmentation işlemi sırasında hata oluştu:", Error);
        }
    };
 return (
    <div className="canny">
        <h1 className="header">Watershed Segmentation</h1>
        <p className="description">
            Watershed segmentation is a region-based method that treats pixels as a topographic surface. It is used to separate overlapping objects in an image by flooding the image from its minima.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimler yan yana */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {watershedImage && <img src={watershedImage} alt="Watershed Segmentation Result" width="300" />}
        </div>

        {/* Iteration parametreleri */}
        {selectedFile && (
            <div className="input-container">
                <label htmlFor="iteration">Iteration Value:</label>
                <input
                    id="iteration"
                    type="number"
                    value={iteration}
                    onChange={handleIterationChange}
                />
                <button onClick={handleWatershedSegmentation}>Apply Watershed Segmentation</button>
            </div>
        )}
    </div>
);

}

export default WatershedSegmentation;