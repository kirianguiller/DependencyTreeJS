import { SentenceJson, TreeJson, TokenJson, MetaJson } from 'conllup/lib/conll';
import { IOriginator, IMemento, ICaretaker } from './MementoPattern';
import { ISubject, IObserver } from './ObserverPattern';
/**
 * The Concrete Memento contains the infrastructure for storing the Originator's
 * state.
 */
export declare class SentenceMemento implements IMemento {
    private state;
    private date;
    constructor(state: string);
    /**
     * The Originator uses this method when restoring its state.
     */
    getState(): string;
    /**
     * The rest of the methods are used by the Caretaker to display metadata.
     */
    getName(): string;
    getDate(): string;
}
/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
export declare class ReactiveSentence implements IOriginator, ISubject {
    /**
     * @type {number} For the sake of simplicity, the Subject's state, essential
     * to all subscribers, is stored in this variable.
     */
    state: SentenceJson;
    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
    private observers;
    /**
     * The subscription management methods.
     */
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    /**
     * Trigger an update in each subscriber.
     */
    notify(): void;
    /**
     * Originator implementation
     */
    save(): IMemento;
    /**
     * Restores the Originator's state from a memento object.
     */
    restore(memento: IMemento): void;
    fromSentenceConll(sentenceConll: string): void;
    /**
     * Import sentence from object of SentenceJson interface
     * @param sentenceJson
     */
    fromSentenceJson(sentenceJson: SentenceJson): void;
    updateToken(tokenJson: TokenJson): void;
    updateTree(treeJson: TreeJson): void;
    updateSentence(sentenceJson: SentenceJson): void;
    addEmptyToken(): void;
    exportConll(): string;
    getSentenceText(): string;
    getUndescoredText(): string;
    getAllFeaturesSet(): string[];
    exportConllWithModifiedMeta(newMetaJson: MetaJson): string;
}
export declare class SentenceCaretaker implements ICaretaker {
    private mementos;
    private _currentStateIndex;
    private originator;
    constructor(originator: IOriginator);
    backup(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    undo(): void;
    redo(): void;
    showHistory(): void;
    get currentStateIndex(): number;
}
