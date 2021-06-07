import {act, renderHook} from "@testing-library/react-hooks";
import {useIntersectionObserver} from "../index";
import {whenStable} from "../../test";

const observerMap = new Map();
const instanceMap = new Map();

describe("useIntersectionObserver hook", () => {
    beforeAll(() => {
        class MockIntersectionObserver implements IntersectionObserver {
            private _callback: IntersectionObserverCallback;

            readonly root: Element | null = null;
            readonly rootMargin: string = "";
            readonly thresholds: ReadonlyArray<number> = [];

            constructor(callback: IntersectionObserverCallback) {
                this._callback = callback;
            }

            disconnect: () => void = () => null;
            observe: (target: Element) => void = jest.fn((target: Element) => {
                instanceMap.set(target, this);
                observerMap.set(target, this._callback);
            });
            takeRecords: () => IntersectionObserverEntry[] = () => [];
            unobserve: (target: Element) => void = (target: Element) => {
                instanceMap.delete(target);
                observerMap.delete(target);
            };
        };

        Object.defineProperty(
            window,
            "IntersectionObserver", {
                writable: true,
                configurable: true,
                value: MockIntersectionObserver
            }
        );

        Object.defineProperty(
            global,
            "IntersectionObserver", {
                writable: true,
                configurable: true,
                value: MockIntersectionObserver
            }
        );
    });

    afterEach(() => {
        instanceMap.clear();
        observerMap.clear();
    });

    function mockAllIsIntersecting(isIntersecting: boolean): void {
        observerMap.forEach((onChange, element) => {
            mockIsIntersecting(element, isIntersecting);
        });
    }

    function mockIsIntersecting(element: Element, isIntersecting: boolean): void {
        const cb = observerMap.get(element);
        if (cb) {
            const entry = [
                {
                    isIntersecting,
                    target: element,
                    intersectionRatio: isIntersecting ? 1 : 0
                }
            ];

            act(() => cb(entry));
        }
    }

    function intersectionMockInstance(element: Element): IntersectionObserver {
        return instanceMap.get(element);
    }

    test("observes", async () => {
        const element = document.createElement("div");
        renderHook(() => useIntersectionObserver({current: element} as any));

        await whenStable();

        const instance = intersectionMockInstance(element);
        expect(instance.observe).toHaveBeenCalledWith(element);
    });

    test("should be intersecting", () => {
        const element = document.createElement("div");
        const {result}: any = renderHook(() => useIntersectionObserver({current: element} as any));

        expect(result.current).toBe(false);

        mockAllIsIntersecting(true);
        expect(result.current).toBe(true);
    });
});