vocabList = [];

class Vocab {
  constructor(word, picture, sound, isDone) {
    this.word = word;
    this.picture = picture;
    this.sound = sound;
    this.isDone = isDone;
  }
}

vocabList.push(new Vocab('word', '', '', false))

vocabList
