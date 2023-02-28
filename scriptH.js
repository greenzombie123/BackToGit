import {VocabModel, vocabList} from './modules/model.js'
import { Controller } from './modules/controller.js';

const vocabModel = new VocabModel(vocabList)
const controller = new Controller(vocabModel)

window.controller = controller;

controller.startNewRound()
const event = {currentTarget:{dataset:{word:'banana'}}}
//console.log(controller);
//controller.checkAnswer(event)


