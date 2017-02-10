import {Controller} from 'cerebral'
import model from './model'
import Devtools from 'cerebral-module-devtools'

import toggleFormatsVocabSwitch from './chains/toggleFormatsVocabSwitch'
import { toggleSchemaExpander, toggleExampleExpander } from './chains/vocabitems';

const controller = Controller(model)

controller.addSignals({
  formatsVocabSwitchClicked: {
    chain: toggleFormatsVocabSwitch,
    immediate: true
  },
  schemaExpanderClicked: toggleSchemaExpander,
  exampleExpanderClicked: toggleExampleExpander,
})

controller.addModules({
  devtools: Devtools()
})

export default controller
