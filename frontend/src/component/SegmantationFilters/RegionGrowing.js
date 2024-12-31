import React, {useState} from "react";

function RegionGrowing() {
    const [image, setImage] = useState(null);
    const [regionGrowingImage, setRegionGrowingImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [seedX, setSeedX] = useState(0);
    const [seedY, setSeedY] = useState(0);
    const [lDiff, setLDiff] = useState(0);
    const [hDiff, setHDiff] = useState(0);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    const handleSeedXChange = (event) => {
        setSeedX(event.target.value);
    };

    const handleSeedYChange = (event) => {
        setSeedY(event.target.value);
    };

    const handleLDiffChange = (event) => {
        setLDiff(event.target.value);
    }

    const handleHDiffChange = (event) => {
        setHDiff(event.target.value);
    }

    const handleRegionGrowing = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "region_growing");
        formData.append("seed_x", seedX);
        formData.append("seed_y", seedY);
        formData.append("l_diff", lDiff);
        formData.append("h_diff", hDiff);

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-segmentation/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const regionGrowingURL = URL.createObjectURL(blob);
                setRegionGrowingImage(regionGrowingURL);
            }
        } catch (error) {
            console.error("Region Growing işlemi sırasında hata oluştu:", error);
        }
    };

     return (
        <div className="rGrowing">
            <h1>Region Growing</h1>
            <input type="file" onChange={handleImageUpload}/>
            {image && <img src={image} alt="Uploaded Image" width="300"/>}
            {selectedFile && (
                <div>
                    <label htmlFor="seed_x">Seed X:</label>
                    <input
                        id="seed_x"
                        type="number"
                        value={seedX}
                        onChange={handleSeedXChange}
                    />
                    <label htmlFor="seed_y">Seed Y:</label>
                    <input
                        id="seed_y"
                        type="number"
                        value={seedY}
                        onChange={handleSeedYChange}
                    />
                    <label htmlFor="lDiff">Seed Y:</label>
                    <input
                        id="lDiff"
                        type="number"
                        value={lDiff}
                        onChange={handleLDiffChange}
                    />
                    <label htmlFor="hDiff">Seed Y:</label>
                    <input
                        id="hDiff"
                        type="number"
                        value={hDiff}
                        onChange={handleHDiffChange}
                    />
                    <button onClick={handleRegionGrowing}>Apply Region Growing</button>
                </div>
            )}
            {regionGrowingImage && <img src={regionGrowingImage} alt="Region Growing" width="300"/>}
        </div>
     );
}


export default RegionGrowing;