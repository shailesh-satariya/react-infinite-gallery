import React from "react";
import {APPEND_PHOTOS, usePhotos} from "../contexts/photos-context";
import {fetchPhotos} from "../services";
import CONFIG from "../config";
import {PhotoItem} from "../types";
import InfiniteScroll from "../components/infinite-scroll";
import GalleryImage from "../components/gallery-image";
import Loader from "../components/loader";
import "./gallery.scss";
import {toast} from "react-toastify";

const PAGE_SIZE: number = CONFIG.PAGE_SIZE as number;

/**
 * Gallery component
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Gallery: React.FC = (): JSX.Element => {
    const [photos, setPhotos] = usePhotos();
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(photos.length === PAGE_SIZE);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetchPhotos(page, PAGE_SIZE);
                const newPhotos: PhotoItem[] = await response.json();
                setPhotos({type: APPEND_PHOTOS, payload: newPhotos});
                setHasMore(newPhotos.length === PAGE_SIZE);
            } catch (e) {
                toast.error(e.toString(), {
                    position: "bottom-right"
                });
            }
        })();
    }, [page, setPhotos, setHasMore]);

    const loadMoreFn = React.useCallback(() => {
        setPage(page + 1);
    }, [page]);

    const loader: JSX.Element = <Loader/>;

    return (
        <InfiniteScroll hasMore={hasMore} loadMore={loadMoreFn} loader={loader}
                        data-test="element-infinite-scroll">
            <div className="gallery-grid">
                {
                    photos.map((photo: PhotoItem) => (
                        <GalleryImage photo={photo} key={photo.id} data-test="element-gallery-image"/>
                    ))
                }
            </div>
        </InfiniteScroll>
    );
};

export default Gallery;
