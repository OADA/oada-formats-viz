import {Controller} from 'cerebral'
import model from './model'
import Devtools from 'cerebral-module-devtools'

import toggleFormatsVocabSwitch from './chains/toggleFormatsVocabSwitch'

const controller = Controller(model)

controller.addSignals({
  formatsVocabSwitchClicked: {
    chain: toggleFormatsVocabSwitch,
    immediate: true
  },
})

controller.addModules({
  devtools: Devtools()
})

export default controller
