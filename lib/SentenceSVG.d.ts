import Snap from 'snapsvg-cjs';
import { TreeJson, TokenJson, MetaJson } from 'conllup/lib/conll';
import { EventDispatcher } from './EventDispatcher';
import { ReactiveSentence } from './ReactiveSentence';
export interface SentenceSVGOptions {
    shownFeatures: string[];
    interactive: boolean;
}
export declare const defaultSentenceSVGOptions: () => SentenceSVGOptions;
export declare class SentenceSVG extends EventDispatcher {
    snapSentence: Snap.Paper;
    treeJson: TreeJson;
    metaJson: MetaJson;
    teacherTreeJson: TreeJson;
    shownFeatures: string[];
    tokenSVGs: {
        [key: number]: TokenSVG;
    };
    dragged: number;
    hovered: number;
    totalWidth: number;
    totalHeight: number;
    levelsArray: number[];
    orderOfTokens: string[];
    oldIdToNewId: {
        [key: number]: number;
    };
    options: SentenceSVGOptions;
    constructor(svgWrapper: SVGElement, reactiveSentence: ReactiveSentence, sentenceSVGOptions: SentenceSVGOptions);
    drawTree(): void;
    update(reactiveSentence: ReactiveSentence): void;
    plugDiffTree(teacherReactiveSentence: ReactiveSentence): void;
    populateOrderOfTokens(): void;
    populateTokenSVGs(): void;
    updateToken(tokenJson: TokenJson): void;
    getHeadsIdsArray(): number[];
    populateLevels(): void;
    getLevel(headsIdsArray: number[], index: number, start: number, end: number): number;
    drawRelations(): void;
    adaptSvgCanvas(): void;
    showhighlights(): void;
    attachEvents(): void;
    attachDraggers(): void;
    attachHovers(): void;
    showDiffs(otherTreeJson: TreeJson): void;
    getDiffStats(otherTreeConll: string): {
        corrects: {
            [key: string]: number;
        };
        totals: {
            [key: string]: number;
        };
    };
    exportConll(): string;
    refresh(): void;
}
declare class TokenSVG {
    tokenJson: TokenJson;
    sentenceSVG: SentenceSVG;
    startY: number;
    startX: number;
    width: number;
    ylevel: number;
    shownFeatures: string[];
    centerX: number;
    snapSentence: Snap.Paper;
    snapElements: {
        [key: string]: Snap.Element;
    };
    draggedForm: Snap.Element;
    draggedFormClone: Snap.Element;
    dragclicktime: number;
    draggedStartX: number;
    draggedStartY: number;
    draggedCurve: Snap.Element;
    draggedArrowhead: Snap.Element;
    dragRootCircle?: Snap.Element;
    constructor(tokenJson: TokenJson, sentenceSVG: SentenceSVG);
    createSnap(snapSentence: Snap.Paper, shownFeatures: string[], startX: number, startY: number): void;
    centerFeatures(): void;
    drawRelation(snapSentence: Snap.Paper, headCoordX: number, levelHeight: number): void;
    showhighlight(): void;
    attachEvent(): void;
    attachDragger(): void;
    attachHover(): void;
    showDiff(otherTokenJson: TokenJson): void;
    startDrag(): void;
    dragging(dx: number, dy: number): void;
    stopDrag(e: Event): void;
}
export {};
