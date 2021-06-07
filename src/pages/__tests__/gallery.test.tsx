import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {findByTestAttr, setupIntersectionObserverMock, whenStable} from "../../test";
import Gallery from "../gallery";
import {PhotosProvider, setInitPhotos} from "../../contexts/photos-context";
import {PhotoItem} from "../../types";
import photos from "../../test/data.json";
import fetchMock from "jest-fetch-mock";

/**
 * Factory function to create a ShallowWrapper for the Gallery component.
 *
 * @param {PhotoItem[]} photos
 *
 * @return {ReactWrapper}
 */
const setup = (photos: PhotoItem[] = []): ReactWrapper => {
    setInitPhotos(photos);
    return mount(
        <PhotosProvider>
            <Gallery/>
        </PhotosProvider>
    );
};

describe("renders elements without errors", () => {
    beforeAll(() => {
        setupIntersectionObserverMock();
    });

    test("renders infinite scroll element", () => {
        const wrapper: ReactWrapper = setup();
        const elementInfiniteScroll = findByTestAttr(wrapper, "element-infinite-scroll");

        expect(elementInfiniteScroll.length).toBe(1);
    });

    test("does not renders gallery image element when there are no photos", () => {
        const wrapper: ReactWrapper = setup();
        const elementGalleryImage = findByTestAttr(wrapper, "element-gallery-image");

        expect(elementGalleryImage.length).toBe(0);
    });

    test("does not renders gallery image element when there are photos", () => {
        const wrapper: ReactWrapper = setup(photos as any as PhotoItem[]);
        const elementGalleryImage = findByTestAttr(wrapper, "element-gallery-image");

        expect(elementGalleryImage.length).toBe(photos.length);
    });
});

describe("state controlled modal page and hasMore values", () => {
    const setState = jest.fn();

    beforeEach(() => {
        const useStateMock: any = (initState: any) => [initState, setState];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("state page updates when loadMore called", async () => {
        const useStateMock: any = (initState: any) => [initState, setState];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        const wrapper: ReactWrapper = setup();
        const elementInfiniteScroll = findByTestAttr(wrapper, "element-infinite-scroll");
        (elementInfiniteScroll.prop("loadMore") as Function)();
        expect(setState).toHaveBeenCalledWith(2);

        jest.clearAllMocks();
    });

    test("state hasMore updates when useEffect is called", async () => {
        fetchMock.resetMocks();
        fetchMock.doMock();

        fetchMock.mockResponse(() => Promise.resolve(JSON.stringify(photos)));

        setup();

        await whenStable();

        expect(setState).toHaveBeenCalledWith(true);
    });
});
