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
                    <div>
                    <h2>Choose a technique.</h2>
                        <p className="description">
                            Color image processing involves techniques to analyze, manipulate, and enhance color information in digital images. It deals with images represented in color spaces such as RGB, HSV, YCbCr, or LAB, each offering unique advantages for different tasks. Key operations include color enhancement, color correction, histogram equalization in each channel, and color-based segmentation. These techniques are used in applications like object recognition, medical imaging, and video processing. By leveraging color information, this field provides a richer understanding of images compared to grayscale processing, enabling more precise analysis and visually appealing results.
                        </p>
                        <img src="/rgb.png"></img>
                        </div>
                )}
            </div>
        </div>
    );
}

export default ColorImageProcessing;
