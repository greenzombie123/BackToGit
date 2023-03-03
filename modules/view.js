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
    this.placeCover();
  }

  clickPictureHandler(event) {
    this.controller.checkAnswer(event);
  }

  renderStartScene() {
    const app = document.querySelector("#app");
    const html = `<div class="startScene">
    <div class="title">Monster Vocab</div>
    <button class="startButton">Start</button>
  </div>`;
    app.insertAdjacentHTML("afterbegin", html);

    const button = app.querySelector(".startScene button");
    button.addEventListener("click", (event) =>
      this.startButtonClickHandler(event)
    );
  }

  startButtonClickHandler() {
    this.clearStartScene();
    this.controller.startNewGame();
    this.render();
  }

  clearStartScene() {
    const startScene = document.querySelector(".startScene");
    console.log(startScene);
    startScene.classList.toggle("hide");
  }

  toggleGameOverSceneRendering() {
    const gameOverScene = document.querySelector(".gameoverScene");
    gameOverScene.classList.toggle("hide");
  }

  createGameOverScene() {
    const app = document.querySelector("#app");
    const html = `<div class="gameoverScene">
    <div class="gameoverTitle">Game Over</div>
    <button class="restartButton">Restart</button>
  </div> `;
    app.insertAdjacentHTML("afterbegin", html);

    const button = app.querySelector(".restartButton");
    button.addEventListener("click", (event) =>
      this.restartButtonClickHandler(event)
    );

    const gameOverScene = document.querySelector(".gameoverScene");
    gameOverScene.classList.toggle("hide");
  }

  restartButtonClickHandler() {
    this.controller.resetGame()
    this.toggleGameOverSceneRendering()
    this.render();
  }

  init(controller) {
    this.controller = controller;

    this.pics = document.querySelectorAll(".picture");
    this.wordDisplay = document.querySelector(".wordDisplay");

    this.pics.forEach((pic) => {
      pic.addEventListener("click", (event) => this.clickPictureHandler(event));
    });

    this.createGameOverScene()

    this.renderStartScene();
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
