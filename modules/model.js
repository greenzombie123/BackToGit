class vocab {
  constructor(word, picture, sound) {
    this.word = word;
    this.picture = picture;
    this.sound = sound;
    this.isAnswered = false;
  }
}

export const vocabList = [];

vocabList.push(new vocab("apple", "assets/apple.jpg", ""));
vocabList.push(new vocab("banana", "assets/banana.jpeg", ""));
vocabList.push(new vocab("cherry", "assets/cherry.avif", ""));
// vocabList.push(new vocab("grapes", "", ""));
// vocabList.push(new vocab("lemon", "", ""));
// vocabList.push(new vocab("grapefruit", "", ""));

export class VocabModel {
  constructor(vocabList) {
    this.correctAnswer = null;
    this.possibleAnswers = [];
    this.isWinner = false;
    this.isGameOver = false;
    this.vocabList = vocabList;
  }
}
