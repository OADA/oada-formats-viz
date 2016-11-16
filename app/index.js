import React from 'react'
import {connect} from 'cerebral-view-react'

import TopMenu from '../top-menu';

export default connect({
  // State connections:
  formats: [ 'formats' ],
  vocabs: [ 'vocabs' ],
}, {
  // Signal connections:
},

  // Core class
  function App (props) {

    return (
      <div>
        <TopMenu/>
        {/*<FormatGraph>*/}
      </div>
    );

  }
)
