import {ReactWrapper, ShallowWrapper} from "enzyme";
import {act} from "react-dom/test-utils";

/**
 * Return node(s) with the given data-test attribute.
 * @param {ReactWrapper | ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 *
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: ReactWrapper | ShallowWrapper, val: string) => {
    return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Waits for react cycle to complete
 */
export const whenStable = async (): Promise<void> =>
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });