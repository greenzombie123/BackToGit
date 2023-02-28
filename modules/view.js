export class View {
  constructor() {
    this.controller = null;
    this.pics = null;
    this.wordDisplay = null;
  }

  render() {
    this.wordDisplay.textContent = this.controller.getCorrectWord();

    const vocabs = this.controller.getPossibleAnswers()
    shuffleArray(vocabs)
    
    let count = 0;
    
    vocabs.forEach(vocab=>{
        this.pics[count].style.cssText = `background: no-repeat center/contain url(${vocabs[count].picture})`;
        this.pics[count].dataset.word = vocabs[count].word;
        count++
    })

    const sound = this.controller.getSound()
    this.playSound(sound)
  }

  playSound = (sound) => {
    const audio = new Audio(sound);
    console.log(sound, audio);
    audio.addEventListener('canplaythrough', ()=>{
        console.log('ok!');
        audio.play();
    })

    
  };

  init(controller) {
    this.controller = controller;

    this.pics = document.querySelectorAll(".picture");
    this.wordDisplay = document.querySelector(".wordDisplay");

    this.pics.forEach((pic) => {
      pic.addEventListener("click", this.controller.checkAnswer);
    });
    console.log(this.pics, this.wordDisplay);
  }
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

//this.controller.checkAnswer
