import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import GalleryImage, {GalleryImageProps} from "../gallery-image";
import photos from "../../test/data.json";
import {PhotoItem} from "../../types";
import {useIntersectionObserver} from "../../custom-hooks";

jest.mock("../../custom-hooks", () => ({
    useIntersectionObserver: jest.fn()
}));

const defaultProps: GalleryImageProps = {
    photo: photos[0] as any as PhotoItem
};

/**
 * Factory function to create a ShallowWrapper for the GalleryImage component.
 * @param {GalleryImageProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: GalleryImageProps = defaultProps): ShallowWrapper => {
    return shallow(<GalleryImage {...props}/>);
};

describe("renders component and elements without errors", () => {
    const wrapper: ShallowWrapper = setup();
    test("renders gallery-image component", () => {
        const componentLoader = findByTestAttr(wrapper, "component-gallery-image");

        expect(componentLoader.length).toBe(1);
    });

    test("renders photo name element", () => {
        const elementPhotoName = findByTestAttr(wrapper, "element-photo-name");

        expect(elementPhotoName.length).toBe(1);
    });

    test("renders photo author element", () => {
        const elementPhotoAuthor = findByTestAttr(wrapper, "element-photo-author");

        expect(elementPhotoAuthor.length).toBe(1);
    });

    test("renders like button", () => {
        const likeButton = findByTestAttr(wrapper, "button-like");

        expect(likeButton.length).toBe(1);
    });
});

describe("render image state when based on useIntersectionObserver returns value", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    test("does not render image state when useIntersectionObserver returns false", () => {
        (useIntersectionObserver as jest.Mock).mockReturnValueOnce(false);

        const wrapper: ShallowWrapper = setup();
        const imgElement = findByTestAttr(wrapper, "element-img");

        expect(imgElement.length).toBe(0);
    });

    test("renders image state when useIntersectionObserver returns true", () => {
        (useIntersectionObserver as jest.Mock).mockReturnValueOnce(true);

        const wrapper: ShallowWrapper = setup();
        const imgElement = findByTestAttr(wrapper, "element-img");

        expect(imgElement.length).toBe(1);
    });
});
