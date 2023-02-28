export class View {
  constructor() {
    this.controller = null;
    this.pics = null;
    this.wordDisplay = null;
  }

  render() {
    this.wordDisplay.textContent = this.controller.getCorrectWord();
  }

  init(controller) {
    this.controller = controller;

    this.pics = document.querySelectorAll(".picture");
    this.wordDisplay = document.querySelector(".wordDisplay");

    this.pics.forEach((pic) => {
      pic.addEventListener("click", () => console.log("123"));
    });
    console.log(this.pics, this.wordDisplay);
  }
}

//this.controller.checkAnswer
