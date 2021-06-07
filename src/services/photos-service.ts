import {insertParamsToUrl} from "../utils";

const API_URL: string = process.env.REACT_APP_API_URL as string;

/**
 * fetches photos objects
 *
 * @param page
 * @param limit
 *
 * @return {Promise<any>}
 */
export const fetchPhotos: (page: number, limit: number) => Promise<any>
    = (page: number, limit: number): Promise<any> => {
    const url: string | false = insertParamsToUrl(API_URL, {page, limit});

    if (url === false) {
        return Promise.reject("Invalid url!");
    }

    return fetch(url);
};