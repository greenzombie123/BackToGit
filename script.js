const vocabFactory = (word, picture, sound, wasUsed) => {
  return {
    word,
    picture,
    sound,
    wasUsed,
  };
};

function makeRandomNum(num) {
  return Math.floor(Math.random() * num);
}

const vocabModel = (() => {
  const vocabList = [];
  const correctAnswer = null;
  const possibleAnswers = [];
  const isGameOver = false;
  const isWinner = false;
  const init = () => {
    vocabList.push(vocabFactory("appla", "apple.webp", "Apple.m4a", false));
    vocabList.push(vocabFactory("apple", "apple.webp", "Apple.m4a", false));
    vocabList.push(vocabFactory("applo", "apple.webp", "Apple.m4a", false));
    vocabList.push(vocabFactory("applu", "apple.webp", "Apple.m4a", false));
    vocabList.push(vocabFactory("appli", "apple.webp", "Apple.m4a", false));
  };
  return {
    vocabList,
    correctAnswer,
    possibleAnswers,
    isGameOver,
    isWinner,
    init,
  };
})();

const gameView = (() => {
  const render = () => {};
  const showAnswer = () => {};
  return { render, showAnswer };
})();

const controller = (() => {
  const setNextAnswer = () => {
    const newList = vocabModel.vocabList.filter((x) => !x.wasUsed);
    const length = newList.length;
    vocabModel.correctAnswer = newList[makeRandomNum(length)];
  };
  const setFalseAnswers = () => {
    let newList = [...vocabModel.vocabList];
    let posAns1, posAns2, newList1;
    newList = newList.filter((x) => x.word !== vocabModel.correctAnswer);
    posAns1 = newList[makeRandomNum(newList.length)];
    newList1 = newList.filter((x) => x.word !== posAns1.word);
    posAns2 = newList1[makeRandomNum(newList1.length)];
    vocabModel.possibleAnswers = [posAns1, posAns2, vocabModel.correctAnswer];
  };
  const checkAnswer = (word) => {
    const isCorrect = vocabModel.possibleAnswers.some((x) => x.word === word);
    if (isCorrect) {
      console.log("Right!");
      setIsDone(vocabModel.correctAnswer);
      checkWinner();
    } else {
      setGameOver();
      console.log('LOSER!');
    }
  };

  const resetAnswers = () => {
    vocabModel.correctAnswer = null;
    vocabModel.possibleAnswers = null;
  };

  const resetVocabList = () => {
    vocabModel.vocabList.forEach((vocab) => (vocab.wasUsed = false));
  };

  const checkWinner = () => {
    const isWinner = vocabModel.vocabList.every((x) => x.wasUsed === true);
    if (isWinner) {
      vocabModel.isWinner = true;
      console.log("Winner");
    } else {
      resetAnswers();
      startNextRound();
      console.log(vocabModel.correctAnswer);
    }
  };
  const setIsDone = (vocab) => {
    vocab.wasUsed = true;
  };
  const setGameOver = () => {
    vocabModel.isGameOver = true;
  };
  const startNextRound = () => {
    setNextAnswer();
    setFalseAnswers();
    gameView.render();
    console.log("Ready!");
  };
  const startNewGame = () => {
    resetVocabList();
    startNextRound();
  };
  const init = () => {
    vocabModel.init();
    startNextRound();
  };
  return { init, checkAnswer, startNewGame };
})();

controller.init();

console.log(vocabModel.correctAnswer);
console.log(vocabModel.possibleAnswers);
//console.log(vocabModel.vocabList);
