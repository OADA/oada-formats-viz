import _ from 'lodash';
import Model from 'cerebral/models/immutable'

import formats from '../build/formats'
import vocabs from '../build/vocabs'

const model = Model({ 
  vocabs, 
  formats,
  formatsActiveNotVocab: false, // default to vocabs
  activeCore: 'oada-formats:fpad', // which core vocab/format is selected now
})

export default model
