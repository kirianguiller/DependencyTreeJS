import {
  emptySentenceJson,
  sentenceConllToJson,
  sentenceJsonToConll,
  emptyTokenJson,
  constructTextFromTreeJson,
} from 'conllup/lib/conll';
import { sentenceJson_T, treeJson_T, tokenJson_T, featuresJson_T, metaJson_T } from 'conllup/lib/conll';

import { IOriginator, IMemento, ICaretaker } from './MementoPattern';
import { ISubject, IObserver } from './ObserverPattern';

/**
 * The Concrete Memento contains the infrastructure for storing the Originator's
 * state.
 */
export class SentenceMemento implements IMemento {
  private state: string;

  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  /**
   * The Originator uses this method when restoring its state.
   */
  public getState(): string {
    return this.state;
  }

  /**
   * The rest of the methods are used by the Caretaker to display metadata.
   */
  public getName(): string {
    return `${this.date}`;
    // return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */

export class ReactiveSentence implements IOriginator, ISubject {
  /**
   * @type {number} For the sake of simplicity, the Subject's state, essential
   * to all subscribers, is stored in this variable.
   */
  public state: sentenceJson_T = emptySentenceJson();

  /**
   * @type {Observer[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: IObserver[] = [];

  /**
   * The subscription management methods.
   */
  public attach(observer: IObserver, verbose: boolean = false): void {
    const isExist = this.observers.includes(observer);
    if (isExist && verbose) {
      return console.log('Subject: Observer has been attached already.');
    }
    if (verbose) {
      console.log('Subject: Attached an observer.');
    }
    this.observers.push(observer);
  }

  public detach(observer: IObserver, verbose: boolean = false): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1 && verbose) {
      return console.log('Subject: Nonexistent observer.');
    }

    if (verbose) {
      console.log('Subject: Detached an observer.');
    }
    this.observers.splice(observerIndex, 1);
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(verbose: boolean = false): void {
    if (verbose) {
      console.log(
        "Subject: The reactiveSentence object changed. Notifying all of the observers by running their 'update()' methods.",
      );
    }
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * Originator implementation
   */
  public save(): IMemento {
    return new SentenceMemento(JSON.stringify(this.state));
  }

  /**
   * Restores the Originator's state from a memento object.
   */
  public restore(memento: IMemento): void {
    this.state = JSON.parse(memento.getState());
    this.notify();
  }

  public fromSentenceConll(sentenceConll: string): void {
    this.state = sentenceConllToJson(sentenceConll);
    this.notify();
  }

  /**
   * Import sentence from object of SentenceJson interface
   * @param sentenceJson
   */
  public fromSentenceJson(sentenceJson: sentenceJson_T): void {
    this.state = JSON.parse(JSON.stringify(sentenceJson));
    this.notify();
  }

  public updateToken(tokenJson: tokenJson_T): void {
    tokenJson.ID = tokenJson.ID.toString();
    if (tokenJson.ID.indexOf('-') > -1) {
      // is group token
      Object.assign(this.state.treeJson.groupsJson[tokenJson.ID], tokenJson);
    } else if (tokenJson.ID.indexOf('.') > -1) {
      // is enhanced token
      Object.assign(this.state.treeJson.enhancedNodesJson[tokenJson.ID], tokenJson);
    } else {
      // is normal token
      Object.assign(this.state.treeJson.nodesJson[tokenJson.ID], tokenJson);
    }
    this.notify();
  }

  public updateTree(treeJson: treeJson_T): void {
    this.state.treeJson = JSON.parse(JSON.stringify(treeJson));
    this.notify();
  }

  public updateSentence(sentenceJson: sentenceJson_T): void {
    this.state = JSON.parse(JSON.stringify(sentenceJson));
    this.notify();
  }

  public addEmptyToken(): void {
    const newToken = emptyTokenJson();
    let idLastToken = '1';
    for (const tokenJson of Object.values(this.state.treeJson.nodesJson)) {
      idLastToken = (parseInt(tokenJson.ID, 10) + 1).toString();
    }
    newToken.ID = idLastToken;
    newToken.FORM = 'new_token';
    this.state.treeJson.nodesJson[newToken.ID] = newToken;
    this.state.treeJson = JSON.parse(JSON.stringify(this.state.treeJson));
    this.notify();
  }

  public exportConll() {
    return sentenceJsonToConll({
      treeJson: this.state.treeJson,
      metaJson: this.state.metaJson,
    });
  }

  public getSentenceText(): string {
    return constructTextFromTreeJson(this.state.treeJson);
  }

  public getUndescoredText(): string {
    const tokensForms = [];
    for (const tokenId in this.state.treeJson.nodesJson) {
      if (this.state.treeJson.nodesJson[tokenId]) {
        const token = this.state.treeJson.nodesJson[tokenId];
        tokensForms.push(token.FORM);
      }
    }
    const underscoredText = tokensForms.join('_');
    return underscoredText;
  }

  public getAllFeaturesSet(): string[] {
    const allFeaturesSet: string[] = ['FORM', 'LEMMA', 'UPOS', 'XPOS'];
    for (const tokenId in this.state.treeJson.nodesJson) {
      if (this.state.treeJson.nodesJson[tokenId]) {
        const features: featuresJson_T = this.state.treeJson.nodesJson[tokenId].FEATS;
        const miscs: featuresJson_T = this.state.treeJson.nodesJson[tokenId].MISC;
        for (const feat in features) {
          if (!allFeaturesSet.includes(`FEATS.${feat}`)) {
            allFeaturesSet.push(`FEATS.${feat}`);
          }
        }

        for (const misc in miscs) {
          if (!allFeaturesSet.includes(`MISC.${misc}`)) {
            allFeaturesSet.push(`MISC.${misc}`);
          }
        }
      }
    }
    return allFeaturesSet;
  }

  public exportConllWithModifiedMeta(newMetaJson: metaJson_T): string {
    for (const [metaName, metaValue] of Object.entries(this.state.metaJson)) {
      if (!Object.keys(newMetaJson).includes(metaName)) {
        newMetaJson[metaName] = metaValue;
      }
    }

    const sentenceJsonToExport: sentenceJson_T = {
      treeJson: this.state.treeJson,
      metaJson: newMetaJson,
    };

    return sentenceJsonToConll(sentenceJsonToExport);
  }
}

export class SentenceCaretaker implements ICaretaker {
  private mementos: IMemento[] = [];
  private _currentStateIndex = -1;
  private originator: IOriginator;

  constructor(originator: IOriginator) {
    this.originator = originator;
  }

  public backup(): void {
    this.mementos = this.mementos.slice(0, this._currentStateIndex + 1);
    this.mementos.push(this.originator.save());
    this._currentStateIndex++;
  }

  public canUndo(): boolean {
    return this._currentStateIndex !== 0;
  }

  public canRedo(): boolean {
    return this._currentStateIndex + 1 !== this.mementos.length;
  }

  public undo(verbose: boolean = false): void {
    if (!this.canUndo() && verbose) {
      console.log('caretaker: the caretaker mementos was empty');
      return;
    }
    this._currentStateIndex--;
    const memento = this.mementos[this._currentStateIndex];
    if (memento) {
      this.originator.restore(memento);
    }
  }

  public redo(verbose: boolean = false): void {
    if (!this.canRedo() && verbose) {
      console.log("caretaker: can't redo, you are already at the end of your mementos");
      return;
    }
    this._currentStateIndex++;
    const memento = this.mementos[this._currentStateIndex];
    if (memento) {
      this.originator.restore(memento);
    }
  }

  public showHistory(): void {
    for (const memento of this.mementos) {
      console.log(memento.getName(), memento.getState());
    }
  }

  public get currentStateIndex() {
    return this._currentStateIndex;
  }
}
