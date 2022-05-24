const colors = require("colors");
const getRandomWord = require("./src/db");
const getWordFromUser = require("./src/input");
const { getResults, getScore } = require("./src/results");

colors.enable();

const color = (bgColorFn) => (txtColorFn) => (msg) =>
  bgColorFn(txtColorFn(msg));

const colorMain = color(colors.bgBlue)(colors.white);
const colorCorrect = color(colors.bgWhite)(colors.brightGreen);
const colorMissed = color(colors.bgWhite)(colors.red);
const colorAlmost = color(colors.bgWhite)(colors.yellow);

const colorLetter = (letter, status) => {
  if (status === "CORRECT") {
    return colorCorrect(letter);
  } else if (status === "MISSED") {
    return colorMissed(letter);
  }
  return colorAlmost(letter);
};

const main = () => {
  console.clear();

  // welcome
  console.log(colorMain("Welcome!! Guess the word!!"));

  const word = getRandomWord();
  const guesses = [];
  let win = false;

  // main loop
  while (true) {
    console.log("");
    console.log(colorMain("Type your input:"));

    const guess = getWordFromUser(5);

    if (!guess) {
      break;
    }

    if (guess === word) {
      win = true;
      break;
    }

    guesses.push(guess);

    console.clear();

    const results = getResults(word, guesses);
    console.log(colorMain(word.split("").join(" ")));

    for (const result of results) {
      const line = result
        .map(([letter, status]) => colorLetter(letter, status))
        .join(" ");

      console.log(line);
      console.log("- - - - -");
    }
  }

  if (win) {
    const score = getScore(word, guesses);
    console.log(colorMain(`Your final score is: ${score}`));
  }
};

main();
