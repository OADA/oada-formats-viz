import React from 'react'
import {connect} from 'cerebral-view-react'

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
        
        Types: <br/>
        <pre>{JSON.stringify(props.formats, '  ', false)}</pre>
        <hr/>
        Vocab: <br/>
        <pre>{JSON.stringify(props.vocabs, '  ', false)}</pre>

      </div>
    );

  }
)
