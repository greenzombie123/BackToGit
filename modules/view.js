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
  }

  playSound = (sound) => {
    const audio = new Audio(sound);
    console.log(sound, audio);
    audio.play();
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
    this.placeCover();
  }

  clickPictureHandler(event) {
    this.controller.checkAnswer(event);
  }

  createScene(text, selector, callback, scene) {
    const app = document.querySelector("#app");
    app.insertAdjacentHTML("afterbegin", text);

    const button = app.querySelector(selector);
    //button.addEventListener("click", () => console.log(123));
    button.addEventListener("click", () => callback());

    const sceneNode = app.querySelector(scene);
    sceneNode.classList.toggle("hide");
  }

  startButtonClickHandler() {
    this.toggleScene("Start");
    this.controller.startNewGame();
    this.render();
  }

  toggleScene(scene) {
    switch (scene) {
      case "Start":
        const startScene = document.querySelector(".startScene");
        startScene.classList.toggle("hide");
        break;
      case "GameOver":
        const gameOverScene = document.querySelector(".gameoverScene");
        gameOverScene.classList.toggle("hide");
        break;
      case "Winner":
        const winnerScene = document.querySelector(".winnerScene");
        winnerScene.classList.toggle("hide");
        break;
    }
  }

  restartButtonClickHandler() {
    const gameOverScene = document.querySelector(".gameoverScene");
    const winnerScene = document.querySelector(".winnerScene");
    this.controller.resetGame();
    if (!gameOverScene.classList.contains("hide")) this.toggleScene("GameOver");
    if (!winnerScene.classList.contains("hide")) this.toggleScene("Winner");
    this.render();
  }

  init(controller) {
    this.controller = controller;

    this.pics = document.querySelectorAll(".picture");
    this.wordDisplay = document.querySelector(".wordDisplay");

    this.pics.forEach((pic) => {
      pic.addEventListener("click", (event) => this.clickPictureHandler(event));
    });

    this.createScene(
      `<div class="winnerScene">
    <div class="gameoverTitle">Well Done!</div>
    <button class="startNewGameButton f">Restart</button>
  </div> `,
      ".startNewGameButton",
      this.restartButtonClickHandler.bind(this),
      ".winnerScene"
    );

    this.createScene(
      `<div class="gameoverScene">
    <div class="gameoverTitle">Game Over</div>
    <button class="restartButton">Restart</button>
  </div> `,
      ".restartButton",
      this.restartButtonClickHandler.bind(this),
      ".gameoverScene"
    );

    this.createScene(
      `<div class="startScene">
    <div class="title">Monster Vocab</div>
    <button class="startButton">Start</button>
  </div>`,
      ".startScene button",
      () => this.startButtonClickHandler(),
      ".startScene"
    );
    this.toggleScene("Start");
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
