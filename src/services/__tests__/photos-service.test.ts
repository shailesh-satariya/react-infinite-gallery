import {fetchPhotos} from "..";
import fetchMock from "jest-fetch-mock";
import photos from "../../test/data.json";

describe("fetchPhotos methods", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.doMock();
    });

    test("fetchPhotos without error", () => {
        fetchMock.mockOnce(() => fetchPhotos(1, 30).then(res => {
            return {
                status: 200,
                body: JSON.stringify(photos)
            };
        }));

        return fetchPhotos(1, 30).then(
            async (response: Response) => {
                expect(response.status).toBe(200);
                const json: any = await response.json();
                expect(json).toEqual(photos);
            }
        );
    });
});