import {VocabModel, vocabList} from './modules/model.js'
import { Controller } from './modules/controller.js';

const vocabModel = new VocabModel(vocabList)
const controller = new Controller(vocabModel)

controller.setCorrectAnswer()
console.log(controller);

controller