/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
export interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
}
/**
 * The Observer interface declares the update method, used by subjects.
 */
export interface IObserver {
    update(subject: ISubject): void;
}
