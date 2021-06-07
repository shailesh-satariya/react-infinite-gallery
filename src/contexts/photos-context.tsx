import React, {Dispatch, ProviderProps, SetStateAction} from "react";
import {PhotoItem} from "../types";

export const APPEND_PHOTOS = "APPEND_PHOTOS";
export const SET_PHOTOS = "SET_PHOTOS";

type PhotoActionTypes = {
    type: undefined | null;
} | {
    type: typeof SET_PHOTOS | typeof APPEND_PHOTOS;
    payload: PhotoItem[]
}

let initPhotos: PhotoItem[] = [];
const photosContext = React.createContext(null);

export const setInitPhotos = (photos: PhotoItem[]): void => {
    initPhotos = photos;
};

/**
 * @function usePhotos
 * @returns {Array} photosContext value, which is a state of [value, setter].
 *
 */
export const usePhotos: () => [PhotoItem[], Dispatch<SetStateAction<PhotoActionTypes>>] =
    () => {
        // useContext is a hook that returns the context value
        // In this case, the context value is an [value, setter] array for the context state
        // useContext also subscribes to changes, and will update any time the context value updates
        //     we've memoized this so that it will only update when the photos value updates
        const context = React.useContext(photosContext);

        // throw an error if the context doesn't exist -- means we aren't in a provider
        if (!context) {
            throw new Error("usePhotos must be used within a PhotosProvider");
        }

        // otherwise return the context
        return context as any as [PhotoItem[], Dispatch<SetStateAction<PhotoActionTypes>>];
    };

/**
 * @function PhotosProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export const PhotosProvider = (props: Partial<ProviderProps<any>>) => {
    const reducer = (state: PhotoItem[], action: PhotoActionTypes) => {
        switch (action.type) {
            case SET_PHOTOS:
                return action.payload;
            case APPEND_PHOTOS:
                return [...state, ...action.payload];
            default:
                throw state;
        }
    };

    // create state that will be used within the provider
    // initial state value is initPhotos
    const [photos, setPhotos] = React.useReducer(reducer, initPhotos);

    // value for the context provider will be array of [value, setter] for photos state
    // useMemo just ensures that the provider value will only update when photos updates
    // No need to test this -- React tests useMemo for us!
    const value = React.useMemo(() => [photos, setPhotos], [photos, setPhotos]);

    // Return a Provider component with the [value, setter] array as the value, passing through the props
    return <photosContext.Provider value={value} {...props} />;
};

const contextExport = {SET_PHOTOS, APPEND_PHOTOS, PhotosProvider, usePhotos};

export default contextExport;