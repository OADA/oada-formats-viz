import _ from 'lodash';
import Model from 'cerebral/models/immutable'

import formats from './build/formats'
import vocabs from './build/vocabs'

const model = Model({ 
  vocabs, 
  formats,
  formatsActiveNotVocab: true,
})

export default model
