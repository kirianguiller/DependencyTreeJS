const sharedStyleSheet = `
.interactive > .FORM,
.interactive > .LEMMA,
.interactive > .UPOS,
.interactive > .DEPREL {
  cursor: pointer;
}

.FORM {
  --wordDistance: 55;
  text-align: center;
  position: relative;
  z-index: 99;
}

.LEMMA {
  font: 15px DejaVu Sans;
  font-family: sans-serif;
  text-align: center;
  font-style: italic;
  --wordDistance: 22;
}

.MISC-Gloss {
  font: 15px DejaVu Sans;
  font-family: sans-serif;
  text-align: center;
  font-style: italic;
  --wordDistance: 11;
}

.UPOS {
  font: 11px DejaVu Sans;
  text-align: center;
  --wordDistance: 22;
}

.UPOSselected {
  font: 11px DejaVu Sans;
  fill: #dd137bff;
  font-weight: bold;
  text-align: center;
}

.DEPREL {
  font: 12px Arial;
  font-style: oblique;
  font-family: sans-serif;
  position: relative;
  z-index: 99;
  --funcCurveDist: 3; /* distance between the function name and the curves highest point */
}

.glossy {
  font: 15px DejaVu Sans;
  font-family: sans-serif;
  text-align: center;
  font-style: italic;
  --wordDistance: 11;
}

.xdeprel {
  fill: #21ba45;
  z-index: 99;
}

.xdep {
  stroke: #21ba45;
  fill: none;
}

.DEPRELselected {
  z-index: 99;
  /* font-weight: bold; */
}

.arrowhead {
  fill: white;
  stroke: black;
  stroke-width: 0.8;
}

.curve {
  stroke-width: 1;
  fill: none;
  position: relative;
  z-index: 0;
  --startOffset: 8;
  --tokDepDist: 15; /* distance between tokens and depdendency relation */
  --depMinHeight: 15; /* minimum height for dependency */
  --wordDistanceFactor: -1; /* distant words get higher curves. this factor fixes how much higher */
}

.dragcurve {
  stroke-width: 1.5;
  fill: none;
}
.draggov {
  fill: #dd137bff;
  text-align: center;
}

.conll {
  display: none; /*toggles to inline*/
  unicode-bidi: embed;
  font-family: monospace;
  white-space: pre;
  margin-bottom: 0.6em;
  border-bottom: 1px solid #aaa;
  padding: 0.5em 0 0.17em 0;
  tab-size: 12;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
}

.sentencebox {
  margin-bottom: 0.6em;
  border-bottom: 1px solid #aaa;
  padding: 0.5em 0 0.17em 0;
  margin-top: 1em;
}

.center {
  text-align: center;
}

.svgbox {
  overflow-x: auto;
}

.curve.diff,
.arrowhead.diff {
  stroke: red;
  stroke-width: 1;
  fill: none;
  position: relative;
}

.UPOS.diff,
.DEPREL.diff {
  fill: red;
}

.FEATS, .MISC {
  font-size: 10px;
}
    `;

const lightStylesheet =
  sharedStyleSheet +
  `
.FORM {
  fill: black;
}

.LEMMA {
  fill: black;
}

.MISC-Gloss {
  fill: rgb(124, 96, 86);
}

.UPOS {
  fill: rgb(80, 29, 125);
}

.UPOSselected {
  fill: #dd137bff;
}

.DEPREL {
  fill: #501d7d;
}

.glossy {
  fill: coral;
}

.xdeprel {
  fill: #21ba45;
}

.xdep {
  stroke: #21ba45;
}

.DEPRELselected {
  fill: #dd137b;
}

.arrowhead {
  fill: white;
  stroke: black;
}

.curve {
  stroke: black;
}

.dragcurve {
  stroke: #dd137bff;
}
.draggov {
  fill: #dd137bff;
}

.FEATS, .MISC {
  fill: #6d346d;
}
    `;

const darkStylesheet =
  sharedStyleSheet +
  `
.FORM {
  fill: white;
}

.LEMMA {
  fill: white;
}

.MISC-Gloss {
  fill: rgb(124, 96, 86);
}

.UPOS {
  fill: rgb(80, 29, 125);
}

.UPOSselected {
  fill: #dd137bff;
}

.DEPREL {
  fill: #501d7d;
}

.glossy {
  fill: coral;
}

.xdeprel {
  fill: #21ba45;
}

.xdep {
  stroke: #21ba45;
}

.DEPRELselected {
  fill: #dd137b;
}

.arrowhead {
  fill: black;
  stroke: white;
}

.curve {
  stroke: white;
}

.dragcurve {
  stroke: #dd137bff;
}
.draggov {
  fill: #dd137bff;
}

.FEATS, .MISC {
  fill: #6d346d;
}
    `;

// Creates the style element
function createStyleElement(id: string, content: string) {
  const style = document.createElement('style');

  style.id = id;
  if (style.sheet) {
    style.sheet.insertRule(content);
  } else {
    style.appendChild(document.createTextNode(content));
  }
  return style;
}

/**
 * Appends CSS content to the head of the site for dependencytreejs
 * @param stylesheet css stylesheet rules string with normal css syntax
 * @param force set to `true` you want to overwrite current dependencytreejs stylesheet
 */
export function setStyleSheet(stylesheet: string, force: boolean): void {
  const id = 'dependencytreejs-stylesheet';
  // remove current dependencytreejs style sheet if exist
  const dependencytreeStylesheet = document.getElementById(id);
  if (dependencytreeStylesheet !== null && dependencytreeStylesheet.parentElement !== null && force) {
    dependencytreeStylesheet.parentElement.removeChild(dependencytreeStylesheet);
  }
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(createStyleElement(id, stylesheet));
}

/**
 * Switch the theme mode of the trees
 * @param theme "LIGHT" or "DARK"
 * @param force set to `true` you want to overwrite current dependencytreejs stylesheet
 */
export function setThemeMode(theme: 'LIGHT' | 'DARK', force: boolean) {
  console.log(`Setting ${theme} mode for dependencytreejs`);
  if (theme === 'DARK') {
    setStyleSheet(darkStylesheet, force);
  } else {
    setStyleSheet(lightStylesheet, force);
  }
}
