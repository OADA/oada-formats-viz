import React from 'react';
import {connect} from 'cerebral-view-react';
import VocabItem from './VocabItem.js';
import _ from 'lodash';

export default connect({
  vocabs: [ 'vocabs' ],
  activeCore: [ 'activeCore' ],
},{
  // signals
}, function Vocab(props) {

  if (!props.activeCore) return 'Please select a vocabulary above';
  const repo = props.activeCore.split(':')[0];
  const vocabname = props.activeCore.split(':')[1];
  const vocab = props.vocabs[repo][vocabname];
  if (!vocab) return 'Invalid vocab selected';

  return (
    <div>
      <header>
        <h1>Vocabulary Terms for {vocabname}</h1>
        <h2>in the {repo} repository</h2>
      </header>
      <content>
        <hr />
        {
          _.reduce(
            _.sortBy(_.keys(vocab), k => (vocab[k].registrationOrder || k)), 
            (acc,key) => _.concat(acc, [
              <VocabItem key={'vocab'+key} term={key} schema={vocab[key]} />,
              <hr key={'hrvocab'+key} />
            ])
            ,[]
          )
        }
      </content>
    </div>
  );

});
