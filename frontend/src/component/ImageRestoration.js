import React, {useState} from "react";

import FaultyPixelRepair from "./ImageRestoration/FaultyPixelRepair";
import Deblurring from "./ImageRestoration/Deblurring";
import InverseFiltering from "./ImageRestoration/InverseFiltering";

function ImageRestoration() {
    const [selectedRestorations, setselectedRestorations] = useState(null);

    const restorations = {

        "Image Restoration": ["Faulty Pixel Repair (Inpainting)", "Deblurring",
            "Inverse Filtering"],

    };

    const handleRestorationClick = (category, method) => {
        setselectedRestorations(method);
    };

    const showContent = () => {
        switch (selectedRestorations) {
            case "Faulty Pixel Repair (Inpainting)":
                return <FaultyPixelRepair/>;
            case "Deblurring":
                return <Deblurring/>;

            case "Inverse Filtering":
                return <InverseFiltering/>;

        }
    }
    return (
        <div className="image-enhancement">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <h3>
                    Image Processing Techniques</h3>
                <ul>
                    {Object.keys(restorations).map((category) => (
                        <li key={category}>
                            <span>{category}</span>
                            <ul>
                                {restorations[category].map((method) => (
                                    <li key={method}>
                                        <button
                                            onClick={() => handleRestorationClick(category, method)}
                                        >
                                            {method}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="content">
                {selectedRestorations ? (
                    <div>
                        {showContent()}
                    </div>
                ) : (
                    <h2>Choose a technique.</h2>
                )}
            </div>
        </div>
    );
}

export default ImageRestoration;
