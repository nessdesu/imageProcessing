import React, {useState} from "react";

function BandPassFilter() {
    const [image, setImage] = useState(null);
    const [bandPassFilteredImage, setBandPassFilteredImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [low, setLow] = useState(100);
    const [high, setHigh] = useState(200);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleLowChange = (event) => {
        setLow(event.target.value);
    }

    const handleHighChange = (event) => {
        setHigh(event.target.value);
    }

    const handleBandPassFilter = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "band_pass");
        formData.append("low", low);
        formData.append("high", high);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply_color_image/",
                {
                    method: "POST",
                    body: formData
                });
            if (response.ok) {
                const blob = await response.blob();
                const bandPassFilteredImageUrl = URL.createObjectURL(blob);
                setBandPassFilteredImage(bandPassFilteredImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Band Pass Filter işlemi sırasında hata oluştu:", error);
        }
    }
    return (
        <div className="band-pass">
            <h1>Band Pass Filter</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>
                    <label htmlFor="low">Low:</label>
                    <input
                        id="low"
                        type="number"
                        value={low}
                        onChange={handleLowChange}
                    />
                    <label htmlFor="high">High:</label>
                    <input
                        id="high"
                        type="number"
                        value={high}
                        onChange={handleHighChange}
                    />
                    <button onClick={handleBandPassFilter}>Band Pass Filter</button>
                </div>
            )}
            {bandPassFilteredImage && <img src={bandPassFilteredImage} alt="Band Pass Filtered Image" width="300"/>}
        </div>
    );
}

export default BandPassFilter;