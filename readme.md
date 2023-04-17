# ReactiveSentence

Javascript package for handling reactive dependency trees. The package has libraries for transforming conll into interactive dep tree. 
This package does not include any UI for managing trees. It only include the JS core logic of trees handling (adding/removing nodes ; undo/redo, etc...)

## Dependencies
- https://github.com/kirianguiller/conllup-js

## Used in
- https://arboratorgrew.elizia.net/#/
- https://github.com/kirianguiller/reactive-dep-tree
- https://surfacesyntacticud.github.io/

## Documentation
This library give access to 6 entities (3 classes and 3 functions) for the user to use interactive trees in the browser.
The 3 classes are `ReactiveSentence`, `SentenceSVG` and `SentenceCaretaker` .
The 3 functions are `defaultSentenceSVGOptions`, `setThemeMode` and `setStyleSheet`.

### ReactiveSentence
The class ReactiveSentence will encapsulate all the data of the tree itstelf and will handle the core logic for reactivity.

#### Initialisation
A reactiveSentence is instanciate with the new keyword, and you can import a conll with the `fromSentenceConll(conll: string)` method or the `fromSentenceConll(sentenceJson: SentenceJson)` method (`SentenceJson` is defined in the conllup-js library).
```typescript
const conll = "# text = I am eating a pineapple\n" +
    "1\tI\t_\tPRON\t_\t_\t2\tsuj\t_\t_\n" +
    "2\tam\t_\tAUX\t_\t_\t0\troot\t_\t_\n" +
    "3\teating\t_\tVERB\t_\t_\t2\taux\t_\thighlight=red\n" +
    "4\ta\t_\tDET\t_\t_\t5\tdet\t_\t_\n" +
    "5\tpineapple\t_\tNOUN\t_\t_\t3\tobj\t_\t_"

const reactiveSentence = new ReactiveSentence();

reactiveSentence.fromSentenceConll(conll);
// or alternatively 
reactiveSentence.fromSentenceJson(sentenceJson);
```

#### Reactivity
After initializing the reactiveSentence, you will be able to modify its data programmatically which will then, thanks to the observer pattern, notify all its observers.
The class that has the function of drawing the tree (`SentenceSVG`, please see below for more information about it) can also be an observer of the reactiveSentence and will redraw the tree after every changes.

Here is how you can define and attach your own observers of a tree :

```typescript
import {ReactiveSentence} from "./ReactiveSentence";

class MyCustomObserver {
    // the only condition for your custom observer is to implement an update() method 
    // that will take the subject of the observer as an argument
    // When the reactiveSentence will be modified programatically, it will call the `update()` method of 
    // all of its observers
    update(reactiveSentence: ReactiveSentence) {
        // Add your logic here, you can access to the state of the reactiveSentence with reactiveSentence.state
        console.log("The reactive sentence was updated and notified me")
    }
}
const myReactiveSentence = new ReactiveSentence()
const myCustomObserver = new MyCustomObserver()

myReactiveSentence.attach(myCustomObserver) // add to the list of the reactive sentences observers

// The two methods below will, after changing the state, notify all the observers.
myReactiveSentence.updateToken(oldToken, newToken)
myReactiveSentence.updateTree(newTree)
```

#### Updating the tree
You can change partially the tree with the updateToken() method. It will
```typescript
reactiveSentence.updateToken(oldToken, newToken)
```

You can change completely the tree by calling the updateTree() method.
```typescript
reactiveSentence.updateTree(newTree)
```

### SentenceSVG
Instances of this class will be able to attach to a ReactiveSentence instance, draw the corresponding tree and update the drawing after each changes inside the reactiveSentence

#### Initialisation
```typescript
const targetSVGElement = document.getElementById("svgWrapper")

const sentenceSVGOptions = dependencytreejs.defaultSentenceSVGOptions()

const sentenceSVG = new dependencytreejs.SentenceSVG(
  targetSVGElement,
  reactiveSentence,
  sentenceSVGOptions
);
```
As we need to know where you want the tree to be inserted in the DOM, we require that you provide to the SentenceSVG initialiser an SVG element.

#### sentenceSVGOptions
You can initialise the SentenceSVG instance with the following parameters :
- shownFeatures
- interactive
- matches
- packages

##### shownFeatures (string[])
You can show only a subset of the features on your tree (conlls can contain a lot of information and not everything is relevent for a given application of it)

##### Interactive (boolean)
Setting this to true will activate 
- the drag/drop events of the svg
- the events click listeners (each token, deprel, pos, features, etc... of the tree are clickable)

These events propagate out of SentenceSVG. So you can add your own customs event listeners that tracks click/drag/drop interactions of a user with the tree to then add the UI/UX of your choice

Exemple of such listeners :
```typescript
sentenceSVG.addEventListener("svg-click", e => {
    const targetLabel = e.detail.targetLabel; // UPOS , FORM, etc...
    const tokenId = e.detail.clicked; // id of the clicked token
    
    // you could here open a dialog box that will let the user modify the FORM of a token.
    if (targetLabel === "FORM") {
        // rest of the logic ...
    }
})
```

### UNDO/REDO logic : SentenceCaretaker
This class will allow you to handle the undo/redo logic.

#### Initialisation
```typescript
this.sentenceCaretaker = new SentenceCaretaker(this.reactiveSentence);
```

#### Backups
The undo/redo feature will only travel through snapchots of the state that were previously backed up.
```typescript
this.sentenceCaretaker.backup();
```

#### Undo / Redo
```typescript
this.sentenceCaretaker.undo(); // travel backward of one snapshot
this.sentenceCaretaker.redo(); // travel forward of one snapshot
```

### Themes handling

#### setThemeMode
This function allow you to set the 'LIGHT' and 'DARK' themes

```typescript
import {setThemeMode} from "dependencytreejs/lib";

setThemeMode("DARK")
// or
setThemeMode("LIGHT")
```

#### setStyleSheet
This function allow you to set a custom theme, provided as a string (CSS syntax)

```typescript
import { setStyleSheet } from "dependencytreejs/lib";

const myCustomCSS = `
.FORM {
  fill: blue;
}

.LEMMA {
  font: 25px Roboto;
  --wordDistance: 30;
}

`
setStyleSheet(myCustomCSS) 
```
Be careful, the setThemeMode() will delete all the CSS rules for dependencytreejs and set only the new one you specified.
It will not extend the rules.

## For developers

If you want to modify the code and quickly preview the changes, you can open public/index.html

### Publish a new version
```bash
npm run format
npm run lint
# change version in package.json
npm run build
# commit the new version
npm publish
# if successful push all to github repo
```

## Update history
### 2.2.3
- fix: showPackages was showing the wrong dependency (the head to its head instead of to its gov)
### 2.2.2
- fix: diffmode running even if both tree have different size (and thus creating error for index none existing)
### 2.2.1
- add unplugDiffTree()
- fix plugDiffTree() (not drawing diffs if tree already exist)
### 2.1.0 (12 nov 2022)
- setThemeMode(), that handle DARK and LIGHT mode
- setStyleSheet(), to allow user to set its own CSS rules for the trees
- added ReactiveSentence.fromSentenceJson() public method, to allow importation from SentenceJson conllup-js format
- added public/index.html for faster preview

### 2.0.0 
Migrate to conllup-js v2.0.0