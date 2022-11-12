/**
 * Appends CSS content to the head of the site for dependencytreejs
 * @param stylesheet css stylesheet rules string with normal css syntax
 * @param force set to `true` you want to overwrite current dependencytreejs stylesheet
 */
export declare function setStyleSheet(stylesheet: string, force: boolean): void;
/**
 * Switch the theme mode of the trees
 * @param theme "LIGHT" or "DARK"
 * @param force set to `true` you want to overwrite current dependencytreejs stylesheet
 */
export declare function setThemeMode(theme: 'LIGHT' | 'DARK', force: boolean): void;
