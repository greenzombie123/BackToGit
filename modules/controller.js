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

  //Check if picture's word matches correct Answer's word
  checkAnswer = (event) => {
    console.log(this.vocabmodel);
    const vm = this.vocabmodel
    const {isWinner, isGameOver} = vm;
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
      this.checkWinner();
    } else {
      console.log("LOSER!");
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
    vm.vocabList.forEach(vocab => vocab.isAnswered = false)
    console.log(vm.vocabList);
    this.startNewRound()
    console.log("New Game has started");
  }

  startNewGame(){
    this.startNewRound
  }

  init(){
    this.view.init(this)
  }
}

function makeRandomNum(num) {
  return Math.floor(Math.random() * num);
}
