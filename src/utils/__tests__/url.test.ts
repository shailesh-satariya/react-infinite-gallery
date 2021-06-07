import {insertParamsToUrl} from "..";

describe("url methods", () => {
    test("insertParamsToUrl returns correct url", () => {
        const url: string | false = insertParamsToUrl("https://picsum.photos/v2/list", {page: 1, limit: 20});

        expect(url).toEqual("https://picsum.photos/v2/list?page=1&limit=20");
    });

    test("insertParamsToUrl returns false when wrong url passed", () => {
        const url: string | false = insertParamsToUrl("foo", {page: 1, limit: 20});

        expect(url).toEqual(false);
    });
});