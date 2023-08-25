import { ReactiveSentence, SentenceCaretaker } from './ReactiveSentence';
import { SentenceSVG, defaultSentenceSVGOptions } from './SentenceSVG';
import { setThemeMode, setStyleSheet } from './StylesheetHandler';
import { exportPNG, exportSVG } from './exportHandler';

// On DependencyTreeJS loading, we initialize the theme for the trees.
// This can be overwritten at will by using setThemeMode or setStyleSheet with force=true
setThemeMode('LIGHT', false);

export default {
  ReactiveSentence,
  SentenceCaretaker,
  SentenceSVG,
  defaultSentenceSVGOptions,
  setThemeMode,
  setStyleSheet,
  exportPNG,
  exportSVG,
};
