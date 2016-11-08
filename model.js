import _ from 'lodash';
import Model from 'cerebral/models/immutable'

import oadaVocab from '../lib/oada-vocab'
import types from './types'


const model = Model({

  vocab: oadaVocab,
  types: types,

})

export default model
