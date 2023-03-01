export class View {
  constructor() {
    this.controller = null;
    this.pics = null;
    this.wordDisplay = null;
    this.cover = null;
  }

  render() {
    this.wordDisplay.textContent = this.controller.getCorrectWord();

    const vocabs = this.controller.getPossibleAnswers();
    shuffleArray(vocabs);

    let count = 0;

    vocabs.forEach(() => {
      this.pics[
        count
      ].style.cssText = `background: no-repeat center/contain url(${vocabs[count].picture})`;
      this.pics[count].dataset.word = vocabs[count].word;
      count++;
    });

    if (!this.cover) {
      const pictureDisplay = document.querySelector(".pictureDisplay");
      this.cover = document.createElement("div");
      this.cover.classList.add("cover", "hide");
      pictureDisplay.appendChild(this.cover);
    }

    const sound = this.controller.getSound();
    this.playSound(sound);

    this.clickDisabled = false;
  }

  playSound = (sound) => {
    const audio = new Audio(sound);
    console.log(sound, audio);
    audio.addEventListener("canplaythrough", () => {
      console.log("ok!");
      audio.play();
    });
  };

  //Show feedback by showing checkmakr or x mark
  giveFeedBack(isCorrect, event) {
    const clickedPicture = event.currentTarget;
    if (isCorrect) {
      clickedPicture.classList.toggle("correct");
      this.placeCover();
    } else {
      clickedPicture.classList.toggle("wrong");
      this.placeCover();
    }
  }

  placeCover() {
    this.cover.classList.toggle("hide");
  }

  removeFeedback() {
    this.pics.forEach((pic) => {
      if (pic.classList.contains("correct")) pic.classList.toggle("correct");
      if (pic.classList.contains("wrong")) pic.classList.toggle("wrong");
    });
    this.placeCover()
  }

  clickPictureHandler(event) {
    this.controller.checkAnswer(event);
  }

  init(controller) {
    this.controller = controller;

    this.pics = document.querySelectorAll(".picture");
    this.wordDisplay = document.querySelector(".wordDisplay");

    this.pics.forEach((pic) => {
      pic.addEventListener("click", (event)=>this.clickPictureHandler(event));
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

