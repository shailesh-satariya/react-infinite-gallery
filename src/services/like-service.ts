import {PhotoItem} from "../types";

const LS_KEY = "liked-photos";
const LIKED_PHOTOS: number[] = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

/**
 * likes/unlikes the photo
 *
 * @param {PhotoItem} photo
 */
export const likePhoto = (photo: PhotoItem): void => {
    const index: number = LIKED_PHOTOS.indexOf(photo.id);
    if (index > -1) {
        LIKED_PHOTOS.splice(index, 1);
    } else {
        LIKED_PHOTOS.push(photo.id);
    }

    localStorage.setItem(LS_KEY, JSON.stringify(LIKED_PHOTOS));
};

/**
 * checks whether photo is liked or not
 *
 * @param {PhotoItem} photo
 *
 * @return {boolean}
 */
export const isPhotoLiked = (photo: PhotoItem): boolean => {
    return LIKED_PHOTOS.indexOf(photo.id) > -1;
};

