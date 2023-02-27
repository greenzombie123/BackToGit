class vocab{
    constructor(word, picture, sound){
        this.word = word
        this.picture = picture
        this.sound = sound
        this.isAnswered = false
    }
}

const vocabList = [];

vocabList.push(new vocab('apple', '', ''))
vocabList.push(new vocab('banana', '', ''))
vocabList.push(new vocab('cherry', '', ''))
vocabList.push(new vocab('grapes', '', ''))
vocabList.push(new vocab('lemon', '', ''))
vocabList.push(new vocab('grapefruit', '', ''))

class VocabModel{
    constructor(vocabList){
        this.correctWord = null
        this.falseAnswers = []
        this.vocabList = vocabList
    }
}

export const vocabModel = new VocabModel(vocabList)