import React from 'react'
import {connect} from 'cerebral-view-react'

import TopMenu from '../top-menu';
import Vocab from '../vocab';

export default connect({
  // State connections:
  formats: [ 'formats' ],
  vocabs: [ 'vocabs' ],
  formatsActiveNotVocab: [ 'formatsActiveNotVocab' ],
}, {
  // Signal connections:
},

  // Core class
  function App (props) {

    let body = <Vocab />;
    if (props.formatsActiveNotVocab)  body = 'Format Graph Not Implemented'; //<FormatGraph />;

    return (
      <div>
        <TopMenu/>
        { body }
      </div>
    );

  }
)
