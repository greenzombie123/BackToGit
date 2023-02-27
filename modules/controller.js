export class Controller{
    constructor(vocabmodel){
        this.vocabmodel = vocabmodel
    }

    //Randomly set a vocab as the correct answer
    setCorrectAnswer(){
        const ranNum = makeRandomNum(this.vocabmodel.vocabList.length)
        this.vocabmodel.correctAnswer = this.vocabmodel.vocabList[ranNum]
    }
    setFalseAnswers(){}
}

function makeRandomNum(num) {
    return Math.floor(Math.random() * num);
}



