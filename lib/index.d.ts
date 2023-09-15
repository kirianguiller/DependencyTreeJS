import { ReactiveSentence, SentenceCaretaker } from './ReactiveSentence';
import { SentenceSVG } from './SentenceSVG';
import { setThemeMode, setStyleSheet } from './StylesheetHandler';
import { exportPNG, exportSVG } from './exportHandler';
declare const _default: {
    ReactiveSentence: typeof ReactiveSentence;
    SentenceCaretaker: typeof SentenceCaretaker;
    SentenceSVG: typeof SentenceSVG;
    defaultSentenceSVGOptions: () => import("./SentenceSVG").SentenceSVGOptions;
    setThemeMode: typeof setThemeMode;
    setStyleSheet: typeof setStyleSheet;
    lightStylesheet: string;
    exportPNG: typeof exportPNG;
    exportSVG: typeof exportSVG;
};
export default _default;
