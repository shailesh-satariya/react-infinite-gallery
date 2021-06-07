import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test";
import Loader from "../loader";


/**
 * Factory function to create a ShallowWrapper for the Loader component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<Loader/>);
};

describe("renders component without errors", () => {
    test(`renders loader component`, () => {
        const wrapper: ShallowWrapper = setup();
        const componentLoader = findByTestAttr(wrapper, "component-loader");

        expect(componentLoader.length).toBe(1);
    });
});