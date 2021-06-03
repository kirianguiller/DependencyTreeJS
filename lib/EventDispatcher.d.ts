/**
 * Typescript class from @kirianguiller / https://github.com/kirianguiller
 * from JS prototype by @author mrdoob / http://mrdoob.com/
 */
export declare class EventDispatcher {
    _listeners: {
        [key: string]: Function[];
    };
    constructor();
    addEventListener(type: string, listener: (event: Event) => void): void;
    hasEventListener(type: string, listener: () => void): boolean;
    removeEventListener(type: string, listener: () => void): void;
    dispatchEvent(event: Event): void;
}
