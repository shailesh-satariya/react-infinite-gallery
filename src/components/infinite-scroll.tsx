import React, {ReactNode} from "react";
import {useIntersectionObserver} from "../custom-hooks";

export interface InfiniteScrollProps {
    children: ReactNode;
    hasMore: boolean;
    loadMore: () => void;
    loader?: React.ReactNode | JSX.Element | string;
    attributes?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * InfiniteScroll component
 *
 * @param children
 * @param hasMore
 * @param loadMore
 * @param loader
 * @param attributes
 * @constructor
 *
 * @return {JSX.Element}
 */
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({children, hasMore, loadMore, loader, attributes}: InfiniteScrollProps): JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => setLoading(false), [children, setLoading]);

    const lastElementRef = React.useRef(null);
    const isBottomVisible = useIntersectionObserver(lastElementRef, {threshold: 0}, false);

    React.useEffect(() => {
        if (isBottomVisible && hasMore && !loading) {
            loadMore();
            setLoading(true);
        }
        // eslint-disable-next-line
    }, [isBottomVisible, hasMore]);

    return (
        <div data-test="component-infinite-scroll" {...attributes}>
            {children}
            {loading && !!loader ? <div data-test="element-loader">{loader}</div> : null}
            <div ref={lastElementRef} style={{height: "1px", marginTop: "-1px"}} data-test="element-last"/>
        </div>
    );
};

export default InfiniteScroll;
