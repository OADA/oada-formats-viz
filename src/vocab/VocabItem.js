import React from 'react';
import {connect} from 'cerebral-view-react';
import _ from 'lodash';

import Highlight from 'react-highlight';
import 'highlight.js/styles/monokai.css';

// All the vocab keys in the final schema are ugly.  Remove them to make it cleaner.
const cleanVocabFromSchema = schema => {
  if (!_.isObject(schema) && !_.isArray(schema)) return schema;
  return _.reduce(schema, (acc,val,key) => {
    if (key === 'vocab') return acc;
    acc[key] = cleanVocabFromSchema(val);
    return acc;
  },_.isArray(schema) ? [] : {});
};

export default connect({
  // state
},{
  // signals
  exampleExpanderClicked: 'exampleExpanderClicked',
  schemaExpanderClicked: 'schemaExpanderClicked',
}, function VocabItem(props) {

  const center = { display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' };
  const scroll = { overflowX: 'scroll' }
  const pad = { paddingLeft: '8px', paddingRight: '8px' }

  const schemaClicked = () => {
    props.schemaExpanderClicked({ term: props.term});
  };

  const exampleClicked = () => {
    props.exampleExpanderClicked({ term: props.term});
  };

  const renderSchema = () => (( props.view && props.view.schemaExpanded ) ?
      <Highlight className='javascript'>
        {JSON.stringify(cleanVocabFromSchema(props.schema),false,'  ')}
      </Highlight>
    :
      <a href='#' onClick={schemaClicked} >Schema</a>
  );

  const renderExample = () => ( (props.view && props.view.exampleExpanded) ?
      <Highlight className='javascript'>
        {JSON.stringify(props.example,false,'  ')}
      </Highlight>
    :
      <a href='#' onClick={exampleClicked} >Example</a>
  );

  return (
    <div style={pad}>
      <div className='pure-g'>
        <div className='pure-u-1-1 pure-u-md-1-6' style={center}>
          <pre style={scroll}>{props.term}</pre>
        </div>
        <div className='pure-u-1-1 pure-u-md-2-3'>
          <p className='description'>{props.schema.description}</p>
        </div>
        <div className='pure-u-1-1 pure-u-md-1-6' style={center}>
          <p>Uses: {_.join(_.map(props.usesTerms, t => t.term))}</p>
        </div>
      </div>
      <div className='pure-g'>
        <div className='pure-u-1-2 pure-u-md-1-12' style={center}>
          {renderSchema()}
        </div>
        <div className='pure-u-1-2 pure-u-md-1-12' style={center}>
          {renderExample()}
        </div>
      </div>
    </div>
  );

});
