import React, {useState} from "react";

function FaultyPixelRepair() {
    const [image, setImage] = useState(null);
    const [selectfile, setSelectFile] = useState(null);
    const [repairedImage, setRepairedImage] = useState(null);
    const [repairRadius, setRepairRadius] = useState(3);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleRepairRadiusChange = (event) => {
        setRepairRadius(event.target.value);
    }

    const handleRepair = async () => {
        const formData = new FormData();
        formData.append("image", selectfile);
        formData.append("filter_type", "faulty_pixel_repair");
        formData.append("repair_radius", repairRadius);
        try {
            const response = await fetch("http://127.0.0.1:8000/apply-restoration/", {
                method: "POST", body: formData
            });
            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setRepairedImage(imageURL);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Faulty Pixel Repair işlemi sırasında hata oluştu:", error);
        }
    }
return (
    <div className="faulty-pixel-repair">
        <h1 className="header">Faulty Pixel Repair (Inpainting)</h1>
        <p className="description">
            Faulty Pixel Repair is a restoration technique that removes faulty pixels from an image by replacing them with the average of their neighboring pixels. It is used to repair images with missing or damaged pixels.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {repairedImage && <img src={repairedImage} alt="Repaired Image" width="300" />}
        </div>

        {/* Repair Radius ve Buton */}
        {selectfile && (
            <div className="input-container">
                <label htmlFor="repairRadius">Repair Radius:</label>
                <input
                    id="repairRadius"
                    type="number"
                    value={repairRadius}
                    onChange={handleRepairRadiusChange}
                />
                <button onClick={handleRepair}>Repair</button>
            </div>
        )}
    </div>
);

}
export default FaultyPixelRepair;

