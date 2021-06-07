import {mount, ReactWrapper, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr, whenStable} from "../../test/utils";
import InfiniteScroll, {InfiniteScrollProps} from "../infinite-scroll";
import {useIntersectionObserver} from "../../custom-hooks";

jest.mock("../../custom-hooks", () => ({
    useIntersectionObserver: jest.fn()
}));


const defaultProps: InfiniteScrollProps = {
    children: <div>Test</div>,
    hasMore: true,
    loader: "Loading...",
    loadMore: () => {
    }
};

/**
 * Factory function to create a ShallowWrapper for the InfiniteScroll component.
 * @param {InfiniteScrollProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: InfiniteScrollProps = defaultProps): ReactWrapper => {
    const {children, ...rest} = props;
    return mount(<InfiniteScroll {...rest}>{children}</InfiniteScroll>);
};

describe("renders component and elements without errors", () => {
    const wrapper: ReactWrapper = setup();
    test("renders infinite-scroll component", () => {
        const componentInfiniteScroll = findByTestAttr(wrapper, "component-infinite-scroll");

        expect(componentInfiniteScroll.length).toBe(1);
    });

    test("renders last element", () => {
        const elementLast = findByTestAttr(wrapper, "element-last");

        expect(elementLast.length).toBe(1);
    });
});

describe("render loader state when based on useIntersectionObserver returns value", () => {
    test("does not render loader state when useIntersectionObserver returns false", () => {
        (useIntersectionObserver as jest.Mock).mockReturnValueOnce(false);

        const wrapper: ReactWrapper = setup();
        const loaderElement = findByTestAttr(wrapper, "element-loader");

        expect(loaderElement.length).toBe(0);
    });

    test("renders loader state when useIntersectionObserver returns true", async () => {
        (useIntersectionObserver as jest.Mock).mockReturnValueOnce(true);

        const wrapper: ReactWrapper = setup();
        await whenStable();
        const loaderElement = findByTestAttr(wrapper, "element-loader");

        expect(loaderElement.length).toBe(1);
    });
});

describe("loadMore function", () => {
    test("loadMore function is called when useIntersectionObserver returns true", async () => {
        const loadMoreMock = jest.fn();
        (useIntersectionObserver as jest.Mock).mockReturnValueOnce(true);

        setup({...defaultProps, loadMore: loadMoreMock});
        await whenStable();

        expect(loadMoreMock).toHaveBeenCalled();
    });
});

describe("state controlled modal loading value", () => {
    test("state loading updates when useIntersectionObserver returns true", async () => {
        const setState = jest.fn();
        const useStateMock: any = (initState: any) => [initState, setState];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);
        (useIntersectionObserver as jest.Mock).mockReturnValueOnce(true);

        setup();
        await whenStable();
        expect(setState).toHaveBeenCalledWith(true);

        jest.clearAllMocks();
    });
});