import React from 'react';
import {connect} from 'cerebral-view-react';
import _ from 'lodash';

export default connect({
  // state
},{
  // signals
}, function VocabItem(props) {

  const center = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

  const schemaClicked = () => {
  };

  const exampleClicked = () => {
  };

  return (
    <div className='pure-g' >

      <div className='pure-u-1-4' style={center}>
        <pre>{props.term}</pre>
      </div>

      <div className='pure-u-1-2'>
        <p className='description'>{props.schema.description}</p>
      </div>

      <div className='pure-u-1-8' style={center}>
        <a href='#' onClick={schemaClicked} >Schema</a>
      </div>
      <div className='pure-u-1-8' style={center}>
        <a href='#' onClick={exampleClicked} >Example</a>
      </div>
    </div>
  );

});
