import React, {useState} from "react";
import RGB2HSV from "./ColorImageProcessing/RGB2HSV";
import RGB2CMYK from "./ColorImageProcessing/RGB2CMYK";
import LowPassFilter from "./ColorImageProcessing/LowPassFilter";
import HighPassFilter from "./ColorImageProcessing/HighPassFilter";
import BandPassFilter from "./ColorImageProcessing/BandPassFilter";
import BandStopFilter from "./ColorImageProcessing/BandStopFilter";

function ColorImageProcessing() {
    const [selectedProcess, setSelectedProcess] = useState(null);

    const restorations = {

        "Color Spaces": ["RGB to HSV Conversion", "RGB to CMYK Conversion"],

        "Color Filtering": ["Low Pass Filter", "High Pass Filter", "Band Pass Filter", "Band Stop Filter"]

    };

    const handleProcessClick = (category, method) => {
        setSelectedProcess(method);
    };

    const showContent = () => {
        if (selectedProcess === "RGB to HSV Conversion") {
            return <RGB2HSV/>
        } else if (selectedProcess === "RGB to CMYK Conversion") {
           return <RGB2CMYK/>
        }
        if (selectedProcess === "Low Pass Filter") {
           return <LowPassFilter/>
        } else if (selectedProcess === "High Pass Filter") {
         return <HighPassFilter/>
        }
        if (selectedProcess === "Band Pass Filter") {
           return <BandPassFilter/>
        } else if (selectedProcess === "Band Stop Filter") {
            return <BandStopFilter/>
        }
    }

    return (
        <div className="image-enhancement">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <h3>Image Processing Techniques</h3>
                <ul>
                    {Object.keys(restorations).map((category) => (
                        <li key={category}>
                            <span>{category}</span>
                            <ul>
                                {restorations[category].map((method) => (
                                    <li key={method}>
                                        <button onClick={() => handleProcessClick(category, method)}>
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
                {selectedProcess ? (
                    <div>
                        <h2>{selectedProcess}</h2>
                        {showContent()}
                    </div>
                ) : (
                    <h2>Choose a technique.</h2>
                )}
            </div>
        </div>
    );
}

export default ColorImageProcessing;
