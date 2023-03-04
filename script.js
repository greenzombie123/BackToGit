import {VocabModel, vocabList} from './modules/model.js'
import { Controller } from './modules/controller.js';
import { View } from './modules/view.js';

const vocabModel = new VocabModel(vocabList)
const view = new View()
const controller = new Controller(vocabModel, view)


window.controller = controller;

//controller.startNewRound()
//const event = {currentTarget:{dataset:{word:'banana'}}}
// const startButton = document.querySelector('button')
// startButton.addEventListener('click', ()=>controller.init())
controller.init()



