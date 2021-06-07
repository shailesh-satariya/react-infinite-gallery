import React from "react";
import {ToastContainer} from "react-toastify";
import {PhotosProvider} from "./contexts/photos-context";
import Gallery from "./pages/gallery";
import "react-toastify/dist/ReactToastify.css";

/**
 * App component
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
    return (
        <div data-test="component-app">
            <PhotosProvider>
                <Gallery data-test="element-gallery"/>
            </PhotosProvider>
            <ToastContainer data-test="element-toast-container"/>
        </div>
    );
};

export default App;
