import React, { useState } from 'react';
import Matrix from "../Matrix";


function HitOrMiss() {
    const [image, setImage] = useState(null);
    const [hitOrMissedImage, setHitOrMissedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [matrix, setMatrix] = useState(null);  // Matrix state'i başlatılıyor

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    // Parent'tan gelen matrix'i alıyoruz
    const handleMatrixChange = (newMatrix) => {
        setMatrix(newMatrix);
    };

    const handleHitOrMiss = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("filter_type", "hit_or_miss");


        // Matrix'i JSON formatında backend'e gönder
        if (matrix) {
            formData.append("matrix", JSON.stringify(matrix));  // Matrix'i JSON string olarak gönder
        }

        else
        {
            alert("Lütfen bir matrix seçin.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/apply-morpho-operations/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const hitOrMissedImageUrl = URL.createObjectURL(blob);
                setHitOrMissedImage(hitOrMissedImageUrl);
            } else {
                alert("Resim işlenirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Hit or Miss işlemi sırasında hata oluştu:", error);
        }
    };

return (
    <div className="hit-or-miss">
        <p className="description">
            Hit or Miss is a morphological image processing technique that is used to detect a particular pattern in an image. It is used to detect the presence of a specific pattern in an image.
        </p>
        <input type="file" onChange={handleImageUpload} />

        {/* Resimleri yan yana göstermek için kapsayıcı */}
        <div className="image-container">
            {image && <img src={image} alt="Uploaded Image" width="300" />}
            {hitOrMissedImage && <img src={hitOrMissedImage} alt="Hit or Miss Result" width="300" />}
        </div>

        {/* Matrix ve Buton */}
        {selectedFile && (
            <div className="input-container">
                <Matrix onMatrixChange={handleMatrixChange} />
                <button onClick={handleHitOrMiss}>Hit or Miss</button>
            </div>
        )}
    </div>
);
}

export default HitOrMiss;
