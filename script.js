const clip = "apple.m4a";

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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const vocabModel = (() => {
  const vocabList = [];
  const correctAnswer = null;
  const possibleAnswers = [];
  const isGameOver = false;
  const isWinner = false;
  const init = () => {
    vocabList.push(vocabFactory("appla", "apple.webp", clip, false));
    vocabList.push(vocabFactory("apple", "apple.webp", clip, false));
    vocabList.push(vocabFactory("applo", "apple.webp", clip, false));
    vocabList.push(vocabFactory("applu", "apple.webp", clip, false));
    vocabList.push(vocabFactory("appli", "apple.webp", clip, false));
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
  const render = () => {
    let vocabs = controller.getPossibleAnswers();
    const correctVocab = controller.getCorrectAnswer();
    const sound = correctVocab.sound;
    const correctWord = correctVocab.word;

    shuffleArray(vocabs);

    const wordDisplay = document.querySelector(".wordDisplay");

    wordDisplay.textContent = correctWord;

    const pics = document.querySelectorAll(".pictureDisplay .picture");

    pics[0].style.cssText = `background: no-repeat center/contain url(${vocabs[0].picture})`;
    pics[1].style.cssText = `background: no-repeat center/contain url(${vocabs[1].picture})`;
    pics[2].style.cssText = `background: no-repeat center/contain url(${vocabs[2].picture})`;

    pics[0].dataset.word = vocabs[0].word;
    pics[1].dataset.word = vocabs[1].word;
    pics[2].dataset.word = vocabs[2].word;

    playSound(sound);
  };

  const init = () => {
    const pics = document.querySelectorAll(".pictureDisplay .picture");

    pics[0].addEventListener('click', pictureClickHandler)
    pics[1].addEventListener('click', pictureClickHandler)
    pics[2].addEventListener('click', pictureClickHandler)
  }

  const pictureClickHandler = (event)=> controller.checkAnswer(event) 

  const showAnswer = (isCorrect, event) => {
    const element = event.currentTarget;
    toggleClicking();

    if (isCorrect) {
      element.classList.add("correct");
      setTimeout(() => element.classList.remove("correct"), 1000);
      toggleClicking();
    } else {
      element.classList.add("wrong");
      setTimeout(() => element.classList.remove("wrong"), 1000);
      toggleClicking();
    }
  };

  const toggleClicking = () => {
    const pics = document.querySelectorAll(".pictureDisplay .picture");
    pics.forEach((pic) => pic.classList.toggle("disabled"));
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    console.log(sound);
    audio.play();
  };

  return { render, showAnswer, init };
})();

const controller = (() => {
  const getVocabList = () => vocabModel.vocabList;

  const getCorrectAnswer = () => vocabModel.correctAnswer;

  const getPossibleAnswers = () => vocabModel.possibleAnswers;

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

  const checkAnswer = (event) => {
    const isCorrect = vocabModel.correctAnswer.word === event.currentTarget.dataset.word
    if (isCorrect) {
      console.log("Right!");
      setIsDone(vocabModel.correctAnswer);
      gameView.showAnswer(isCorrect, event);
      checkWinner();
    } else {
      gameView.showAnswer(isCorrect, event);
      setGameOver();
      console.log("LOSER!");
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
    const body = document.body;
    console.log(body);
    body.addEventListener("dblclick", () => {
      if (!vocabModel.isGameOver) {
        vocabModel.init();
        gameView.init()
        startNextRound();
      }
    });
  };
  return {
    init,
    checkAnswer,
    startNewGame,
    getCorrectAnswer,
    getVocabList,
    getPossibleAnswers,
  };
})();

controller.init();

console.log(vocabModel.correctAnswer);
console.log(vocabModel.possibleAnswers);
//console.log(vocabModel.vocabList);
