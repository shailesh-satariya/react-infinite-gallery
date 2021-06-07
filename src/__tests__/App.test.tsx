import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../test/utils";
import App from "../App";


/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<App/>);
};

describe("renders component without errors", () => {
    const wrapper: ShallowWrapper = setup();
    test(`renders app component`, () => {
        const componentApp = findByTestAttr(wrapper, "component-app");

        expect(componentApp.length).toBe(1);
    });

    test(`renders gallery element`, () => {
        const elementGallery = findByTestAttr(wrapper, "element-gallery");

        expect(elementGallery.length).toBe(1);
    });

    test(`renders toast container element`, () => {
        const elementToastContainer = findByTestAttr(wrapper, "element-toast-container");

        expect(elementToastContainer.length).toBe(1);
    });
});