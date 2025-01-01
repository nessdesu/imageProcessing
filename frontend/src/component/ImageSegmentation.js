import React, {useState} from "react";
import OtsuMethod from "./SegmantationFilters/OtsuMethod";
import AdaptiveThresholding from "./SegmantationFilters/AdaptiveThresholding";
import CannyEdgeFinder from "./SegmantationFilters/CannyEdgeFinder";
import WatershedSegmentation from "./SegmantationFilters/WatershedSegmentation";
import RegionGrowing from "./SegmantationFilters/RegionGrowing";


function ImageSegmentation() {
    const [selectedSegmentation, setSelectedSegmentation] = useState(null);

    const segmentations = {

        "Thresholding": ["Otsu Method", "Adaptive Thresholding"],
        "Segmentation Based on Edges": ["Canny Edge Finder"],
        "Region Based Methods": ["Watershed Segmentation", "Region Growing"]
    };

    const handleSegmentationClick = (category, method) => {
        setSelectedSegmentation(method);
    };

    const showContent = () => {
        switch (selectedSegmentation) {
            case "Otsu Method":
                return <OtsuMethod/>;
            case "Adaptive Thresholding":
                return <AdaptiveThresholding/>;
            case "Canny Edge Finder":
                return <CannyEdgeFinder/>;
            case "Watershed Segmentation":
                return <WatershedSegmentation/>;
                break;
            case "Region Growing":
                return <RegionGrowing/>;
                break;
            default:
                return null;
        }
    };

    return (
        <div className="image-enhancement">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <h3>
                    Image Processing Techniques</h3>
                <ul>
                    {Object.keys(segmentations).map((category) => (
                        <li key={category}>
                            <span>{category}</span>
                            <ul>
                                {segmentations[category].map((method) => (
                                    <li key={method}>
                                        <button
                                            onClick={() => handleSegmentationClick(category, method)}
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
                {selectedSegmentation ? (
                    <div>
                        {showContent()}
                    </div>
                ) : (
                    <div>
                    <h2>Choose a technique.</h2>
                        <p>
                            into meaningful regions or segments to simplify analysis. It aims to group pixels based on shared characteristics such as color, intensity, or texture, making it easier to identify objects, boundaries, or regions of interest. Segmentation is a crucial step in applications like object detection, medical imaging, and scene understanding, enabling precise analysis by isolating significant parts of an image while ignoring irrelevant details. Common approaches include thresholding, edge detection, region-based methods, and machine learning techniques.
                        </p>
                        <img src="/sphx_glr_plot_thresholding_001.png"  />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageSegmentation;
