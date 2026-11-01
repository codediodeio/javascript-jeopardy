# JavaScript Jeopardy

A Jeopardy-style trivia game about JavaScript. Pick a category and a point value, answer the clue, and see how high you can score.

Built with [Svelte](https://svelte.dev/). The project also includes [Firebase](https://firebase.google.com/) setup for optional anonymous sign-in.

## Features

- A board with 4 categories (Basics, Arrays, Async, Gotchas) and 5 clues each, worth 100 to 500 points.
- Self-scored play: read the clue, reveal the answer, then mark yourself right or wrong. The clue's value is added or subtracted from your score.
- Played clues are disabled so they can't be picked twice, and a "New game" button resets the board and score.
- Cells are real buttons with descriptive labels, and `Esc` closes an open clue.
- The game runs entirely in the browser. It does not need a sign-in or any Firebase data to play.

## How to play

1. Click a point value under a category.
2. Read the clue and think of your answer.
3. Click **Show answer** to check it.
4. Click **I got it right** (adds the points) or **I got it wrong** (subtracts them).

**Back to board** or `Esc` closes a clue without scoring it, so it stays available.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm

### Install and run

```bash
git clone https://github.com/zuni-developer/javascript-jeopardy.git
cd javascript-jeopardy
npm install --ignore-scripts
npm run dev
```

Then open <http://localhost:5000>.

> **Why `--ignore-scripts`?** The pinned Firebase 7 depends on the native `grpc` module, which fails to compile on recent Node versions (tested on Node 22). The browser bundle does not need it, so skipping install scripts works.

### Scripts

| Command         | What it does                                           |
| --------------- | ------------------------------------------------------ |
| `npm run dev`   | Builds in watch mode, serves the app and live-reloads  |
| `npm run build` | Creates a minified production bundle in `public/build` |
| `npm start`     | Serves the `public` folder with `sirv`                 |

## Project structure

```
public/              Static files (index.html, global.css, favicon)
src/
  main.js            App entry point
  App.svelte         Root component: title, sign-in bar and the board
  Board.svelte       Game board, clue dialog and scoring
  firebase.js        Firebase config and initialisation
  data/clues.js      Categories and clues
rollup.config.js     Build configuration
```

## Adding or editing clues

All questions live in `src/data/clues.js`. Each category has a name and a list of clues:

```js
{
  name: "Arrays",
  clues: [
    { value: 100, question: "This method adds an element to the end of an array.", answer: "push()" },
    // ...
  ]
}
```

Every category should have the same number of clues, because the board's row count is taken from the first category. To add a category, add another object to the `categories` array; the grid adjusts its number of columns automatically.

## Firebase

`src/firebase.js` initialises Firebase with the project's web config and is used for the optional anonymous sign-in button. Scores are not saved yet, and the board does not read from Firebase.

If you fork this project and want your own backend, replace the values in `src/firebase.js` with those from your own Firebase project (Firebase console, Project settings, Your apps). Web config values identify a project and are not secrets. Access is controlled by your Firestore security rules and by restricting the API key in the Google Cloud console.