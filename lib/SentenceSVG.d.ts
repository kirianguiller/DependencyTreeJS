import Snap from 'snapsvg-cjs';
import { treeJson_T, tokenJson_T, metaJson_T } from 'conllup/lib/conll';
import { EventDispatcher } from './EventDispatcher';
import { ReactiveSentence } from './ReactiveSentence';
export interface SentenceSVGOptions {
    drawEnhancedTokens: boolean;
    drawGroupTokens: boolean;
    shownFeatures: string[];
    interactive: boolean;
    matches: string[];
    packages: {
        modified_edges: {
            src: string;
            edge: string;
            tar: string;
        }[];
        modified_nodes: {
            id: string;
            features: string[];
        }[];
    } | null;
    tokenSpacing: number;
    featuresHorizontalSpacing: number;
    arcHeight: number;
}
export declare const defaultSentenceSVGOptions: () => SentenceSVGOptions;
export declare class SentenceSVG extends EventDispatcher {
    snapSentence: Snap.Paper;
    treeJson: treeJson_T;
    metaJson: metaJson_T;
    teacherTreeJson: treeJson_T;
    shownFeatures: string[];
    tokenSVGs: TokenSVG[];
    dragged: string;
    hovered: string;
    totalWidth: number;
    totalHeight: number;
    levelsArray: number[];
    orderOfTokens: string[];
    tokenIndexToSvgPosition: {
        [key: string]: number;
    };
    options: SentenceSVGOptions;
    constructor(svgWrapper: SVGElement, reactiveSentence: ReactiveSentence, sentenceSVGOptions: SentenceSVGOptions);
    drawTree(): void;
    update(reactiveSentence: ReactiveSentence): void;
    plugDiffTree(teacherReactiveSentence: ReactiveSentence): void;
    unplugDiffTree(): void;
    populateOrderOfTokens(): void;
    populateTokenSVGs(): void;
    updateToken(tokenJson: tokenJson_T): void;
    getHeadsIdsArray(): number[];
    populateLevels(): void;
    getLevel(levelsArray: number[], headsIdsArray: number[], index: number, start: number, end: number): number;
    drawRelations(): void;
    drawEnhancedRelations(): void;
    computeCurrentMaxHeight(): number;
    adaptSvgCanvas(): void;
    showhighlights(): void;
    showmatches(): void;
    showpackages(): void;
    attachEvents(): void;
    attachDraggers(): void;
    attachHovers(): void;
    showDiffs(otherTreeJson: treeJson_T): void;
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
    tokenJson: tokenJson_T;
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
    X_draggedBoxCenter: number;
    Y_draggedBoxUpper: number;
    draggedCurve: Snap.Element;
    draggedArrowhead: Snap.Element;
    dragRootCircle?: Snap.Element;
    constructor(tokenJson: tokenJson_T, sentenceSVG: SentenceSVG);
    createSnap(snapSentence: Snap.Paper, shownFeatures: string[], startX: number, startY: number): void;
    centerFeatures(): void;
    drawRelation(snapSentence: Snap.Paper, headCoordX: number, levelHeight: number): void;
    drawEnhancedRelation(snapSentence: Snap.Paper, headCoordX: number, levelHeight: number, depsInfo: {
        ID: string;
        DEPREL: string;
    }, Y_start: number): void;
    showhighlight(): void;
    showmatch(): void;
    showmodifiednode(features: string[]): void;
    showmodifiededge(): void;
    attachEvent(): void;
    attachDragger(): void;
    attachHover(): void;
    showDiff(otherTokenJson: tokenJson_T): void;
    startDrag(): void;
    dragging(dx: number, dy: number): void;
    stopDrag(e: Event): void;
}
export {};
