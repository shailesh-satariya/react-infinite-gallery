import React from "react";
import {shallow} from "enzyme";

import {PhotosProvider, usePhotos} from "../photos-context";

// a functional component that calls usePhotos for our tests
const FunctionalComponent = () => {
    usePhotos();
    return <div/>;
};

test("PhotosProvider throws error when not wrapped in PhotosProvider", () => {
    expect(() => {
        shallow(<FunctionalComponent/>);
    }).toThrow("usePhotos must be used within a PhotosProvider");
});

test("PhotosProvider does not throw error when wrapped in PhotosProvider", () => {
    expect(() => {
        shallow(
            <PhotosProvider>
                <FunctionalComponent/>
            </PhotosProvider>
        );
    }).not.toThrow();
});
