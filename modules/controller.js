export class Controller {
  constructor(vocabmodel, view) {
    this.vocabmodel = vocabmodel;
    this.view = view;
  }

  //Randomly set a vocab as the correct answer
  setCorrectAnswer() {
    let unusedAnswers = this.vocabmodel.vocabList;
    unusedAnswers = unusedAnswers.filter((vocab) => vocab.isAnswered === false);
    const ranNum = makeRandomNum(unusedAnswers.length);
    this.vocabmodel.correctAnswer = unusedAnswers[ranNum];
    console.log(this.vocabmodel.correctAnswer);
  }

  // Insert two vocabs and the correctAnswer into possibleAnswers array
  setPossibleAnswers() {
    let newList = [...this.vocabmodel.vocabList];
    let posAns1, posAns2, newList1;
    newList = newList.filter(
      (x) => x.word !== this.vocabmodel.correctAnswer.word
    );
    posAns1 = newList[makeRandomNum(newList.length)];
    newList1 = newList.filter((x) => x.word !== posAns1.word);
    posAns2 = newList1[makeRandomNum(newList1.length)];
    this.vocabmodel.possibleAnswers = [
      posAns1,
      posAns2,
      this.vocabmodel.correctAnswer,
    ];
    console.log(this.vocabmodel.possibleAnswers);
  }

  getCorrectWord() {
    return this.vocabmodel.correctAnswer.word;
  }

  getPossibleAnswers() {
    return this.vocabmodel.possibleAnswers;
  }

  getSound() {
    return this.vocabmodel.correctAnswer.sound;
  }

  //Check if picture's word matches correct Answer's word
  checkAnswer = (event) => {
    const vm = this.vocabmodel;
    const { isWinner, isGameOver } = vm;
    if (isWinner || isGameOver) {
      console.log("NOPE!");
      return;
    }
    const correctWord = this.vocabmodel.correctAnswer.word;
    const chosenWord = event.currentTarget.dataset.word;
    const isCorrect = correctWord === chosenWord;
    if (isCorrect) {
      console.log("Right!");
      this.setIsAnswered();
      this.view.giveFeedBack(isCorrect, event);
      setTimeout(() => this.checkWinner(event), 1000);
    } else {
      console.log("LOSER!");
      this.view.giveFeedBack(isCorrect, event);
      this.setIsGameOver();
    }
  };

  //Set isWinner of vocabmodal to true
  setIsWinner() {
    this.vocabmodel.isWinner = true;
  }

  //Check if all vocab were answered
  checkWinner() {
    const list = this.vocabmodel.vocabList;
    const isWinner = list.every((vocab) => vocab.isAnswered);
    if (isWinner) {
      this.setIsWinner();
      console.log("Winner");
    } else {
      this.startNewRound();
      this.view.render();
      this.view.removeFeedback();
    }
  }

  //Set correctAnswer's isAnswered property to true
  setIsAnswered() {
    const correctVocab = this.vocabmodel.correctAnswer;
    correctVocab.isAnswered = true;
    console.log(this.vocabmodel.vocabList);
  }

  //Set new values to correctAnswer and possibleAnswers variables
  startNewRound() {
    this.setCorrectAnswer();
    this.setPossibleAnswers();
  }

  // Set isGameOver property to true
  setIsGameOver() {
    this.vocabmodel.isGameOver = true;
    console.log(this.vocabmodel.isGameOver);
  }

  //Return values to their default forms
  resetGame() {
    const vm = this.vocabmodel;
    vm.correctAnswer = null;
    vm.possibleAnswers = [];
    vm.isGameOver = false;
    vm.isWinner = false;
    vm.vocabList.forEach((vocab) => (vocab.isAnswered = false));
    console.log(vm.vocabList);
    this.startNewRound();
    console.log("New Game has started");
  }

  //Start a new game
  startNewGame() {
    this.startNewRound();
  }

  //Initialize all vaules to start the game
  init() {
    // Get all references of divs
    this.view.init(this);
    //this.startNewGame();
    // this.view.render();
  }
}

function makeRandomNum(num) {
  return Math.floor(Math.random() * num);
}
