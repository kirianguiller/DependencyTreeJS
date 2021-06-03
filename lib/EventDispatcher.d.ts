/**
 * Typescript class from @kirianguiller / https://github.com/kirianguiller
 * from JS prototype by @author mrdoob / http://mrdoob.com/
 */
export declare class EventDispatcher {
    _listeners: {
        [key: string]: ((event: Event) => void)[];
    };
    constructor();
    addEventListener(type: string, listener: (event: Event) => void): void;
    hasEventListener(type: string, listener: any): boolean;
    removeEventListener(type: string, listener: any): void;
    dispatchEvent(event: Event): void;
}
