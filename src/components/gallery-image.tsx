import React from "react";
import {PhotoItem} from "../types";
import {isPhotoLiked, likePhoto} from "../services";
import {useIntersectionObserver} from "../custom-hooks";
import "./gallery-image.scss";


const IMG_URL: string = process.env.REACT_APP_IMG_URL as string;

export interface GalleryImageProps {
    photo: PhotoItem;
}

/**
 * GalleryImage component
 *
 * @param photo
 * @constructor
 *
 * @return {JSX.Element}
 */
const GalleryImage: React.FC<GalleryImageProps> = ({photo}: GalleryImageProps): JSX.Element => {
    const ref = React.useRef(null);
    const isVisible = useIntersectionObserver(ref, {threshold: 0}, false);

    const [isLiked, setIsLiked] = React.useState(isPhotoLiked(photo));
    const [showImage, setShowImage] = React.useState(isVisible);

    React.useEffect(() => {
        if (isVisible) {
            setShowImage(true);
        }
    }, [isVisible, setShowImage]);

    const onPhotoBtnLikeClick: () => void = () => {
        setIsLiked(!isLiked);
        likePhoto(photo);
    };

    return (
        <div ref={ref} className="gallery-img-wrapper" data-test="component-gallery-image">
            {showImage ? <img src={`${IMG_URL}/${photo.id}/300`} alt={photo.author} className="gallery-img"
                              data-test="element-img"/> : null}
            <div className="gallery-img-overlay">
                <div className="gallery-img-overlay-content">
                    <div className="photo-name" data-test="element-photo-name">{photo.author}</div>
                    <div className="photo-author" data-test="element-photo-author">{photo.author}</div>
                    <button className={"photo-like-button" + (isLiked ? " liked" : "")}
                            onClick={onPhotoBtnLikeClick} data-test="button-like">Favourite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryImage;
