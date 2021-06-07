import React, {MutableRefObject} from "react";

/**
 * useIntersectionObserver
 *
 * @param {MutableRefObject<Element | null>} ref
 * @param {IntersectionObserverInit} options
 * @param {boolean} forward
 *
 * @return {boolean}
 */
export const useIntersectionObserver: (ref: MutableRefObject<Element | null>, options?: IntersectionObserverInit, forward?: boolean) => boolean
    = (ref: MutableRefObject<Element | null>, options: IntersectionObserverInit = {}, forward: boolean = true): boolean => {
    const [element, setElement] = React.useState<Element | null>(null);
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const observer = React.useRef<null | IntersectionObserver>(null);

    // Function remove previously connected observer
    const cleanOb = () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    };

    // Check if element has been changed
    React.useEffect(() => {
        setElement(ref.current);
    }, [ref]);

    React.useEffect(() => {
        if (!element) return;
        // Clean previous observer
        cleanOb();
        const ob = (observer.current = new IntersectionObserver(
            ([entry]) => {
                const isElementIntersecting = entry.isIntersecting;
                if (!forward) {
                    setIsIntersecting(isElementIntersecting);
                } else if (forward && !isIntersecting && isElementIntersecting) {
                    setIsIntersecting(isElementIntersecting);
                    // Remove the observe on success
                    cleanOb();
                }
            },
            {...options}
        ));
        ob.observe(element);
        return () => {
            cleanOb();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element, options]);

    return isIntersecting;
};
