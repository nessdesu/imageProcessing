import React, {useState} from "react";

function InverseFiltering() {
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [filteredImage, setFilteredImage] = useState(null);
    const [filterSize, setFilterSize] = useState(3);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleFilterSizeChange = (event) => {
        setFilterSize(event.target.value);
    }

    const handleFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "inverse_filtering");
        formData.append("filter_size", filterSize);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-restoration/", {
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setFilteredImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Inverse Filtering işlemi sırasında hata oluştu:", error);
        }
    }

 return (
    <div className="inverse-filtering">
        <h1 className="header">Inverse Filtering</h1>
        <p className="description">
            Inverse Filtering is a restoration technique that removes blur from an image. It is used to improve the quality of an image by enhancing the sharpness and clarity of the image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {filteredImage && <img src={filteredImage} alt="Filtered Image" width="300" />}
        </div>

        {/* Filter Size ve Buton */}
        {selectfile && (
            <div className="input-container">
                <label htmlFor="filterSize">Filter Size:</label>
                <input
                    id="filterSize"
                    type="number"
                    value={filterSize}
                    onChange={handleFilterSizeChange}
                />
                <button onClick={handleFilter}>Filter</button>
            </div>
        )}
    </div>
);

}

export default InverseFiltering;