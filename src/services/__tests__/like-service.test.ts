import photos from "../../test/data.json";
import {PhotoItem} from "../../types";
import {isPhotoLiked, likePhoto} from "../like-service";

const photo: PhotoItem = photos[0] as any as PhotoItem;

describe("like service methods", () => {
    test("isPhotoLiked returns false when photo is not liked", () => {
        expect(isPhotoLiked(photo)).toEqual(false);
    });

    test("isPhotoLiked returns true when photo is liked", () => {
        likePhoto(photo);
        expect(isPhotoLiked(photo)).toEqual(true);
    });

    test("isPhotoLiked returns false when photo is unliked", () => {
        likePhoto(photo);
        expect(isPhotoLiked(photo)).toEqual(false);
    });
});