const sharedStyleSheet = `
  .interactive > .FORM,
  .interactive > .LEMMA,
  .interactive > .UPOS,
  .interactive > .DEPREL {
    cursor: pointer;
  }
  
  .FORM {
    font-size: 16px;
    z-index: 99;
  }
  
  .LEMMA {
    font-size: 13px;
    font-style: italic;
  }
  
  .UPOS, .XPOS {
    font: 11px DejaVu Sans;
  }
  
  .XPOS {
      font-style: italic;
  }
  
  
  .DEPREL {
    font: 12px Arial;
    font-family: sans-serif;
    z-index: 99;
  }
  
  .FEATS, .MISC {
    font-size: 10px;
  }
  
  .glossy {
    font-style: italic;
  }
  
  .arrowhead {
    stroke-width: 0.8;
  }
  
  .curve {
    stroke-width: 1.1;
    fill: none;
    z-index: 0;
  }
  
  .dragcurve {
    stroke-width: 2;
    fill: none;
  }
  
  .arrowhead, .curve, .dragcurve {
      stroke: black;
      pointer-events: none;
    }
    `;

const lightStylesheet =
  sharedStyleSheet +
  `
    .FORM, .LEMMA {
      fill: black;
    }

    .UPOS, .DEPREL {
      fill: #4a0984;;
    }

    .FEATS, .MISC, .XPOS {
      fill: #b352ac;
    }

    .UPOS.diff,
    .DEPREL.diff {
      fill: red;
    }

    .arrowhead {
      fill: white;
    }

    .arrowhead, .curve {
      stroke: black;
    }

    .arrowhead.diff, .curve.diff {
      stroke: red;
    }

    .dragcurve, .dragarrowhead {
      stroke: #ffb424;
    }

    .glossy {
      fill: #ffb424;
    }
 `;

const darkStylesheet =
  sharedStyleSheet +
  `
      .FORM, .LEMMA {
      fill: #e6e2e2;
    }

    .UPOS, .DEPREL {
      fill: #ea6ff4;
    }

    .FEATS, .MISC, .XPOS {
      fill: #a47da3;
    }

    .FORM.diff, .UPOS.diff, .DEPREL.diff {
      fill: #ff2020;
    }

    .arrowhead {
      fill: black;
    }

    .arrowhead, .curve {
      stroke: #e6e2e2;
    }

    .arrowhead.diff, .curve.diff {
      stroke: #ff2020;
    }

    .dragarrowhead, .dragcurve {
      stroke: #ffb424;
    }

    .glossy {
      fill: #ffb424;
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
