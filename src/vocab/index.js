import React from 'react';
import {connect} from 'cerebral-view-react';
import VocabItem from './VocabItem.js';
import _ from 'lodash';

const usesterms = (acc,schema) => {
  if (!acc) acc = [];
  if (!schema) return acc;
  // If this is an array of things, just give the terms used by the items:
  if (schema.items) acc = _.reduce(schema.items, usesterms, acc);
  // If this schema has several possiblities, add terms from each possibility:
  if (schema.anyOf) acc = _.reduce(schema.anyOf, usesterms, acc);
  if (schema.allOf) acc = _.reduce(schema.allOf, usesterms, acc);
  if (schema.oneOf) acc = _.reduce(schema.oneOf, usesterms, acc);
  // Now check this thing for vocab terms (have 'vocab' key at top level of schema:
  if (!schema.properties) return acc;
  return _.reduce(schema.properties, (acc2,val) => {
    if (val.vocab) acc2.push(val.vocab);
    return acc;
  },acc);
};

export default connect({
  vocabs: [ 'vocabs' ],
  vocabsView: [ 'vocabsView' ], // term-specific view stuff like schemaExpanded
  activeCore: [ 'activeCore' ],
},{
  // signals
}, function Vocab(props) {

  if (!props.activeCore) return 'Please select a vocabulary above';
  const repo = props.activeCore.split(':')[0];
  const vocabname = props.activeCore.split(':')[1];
  const vocab = props.vocabs[repo][vocabname];
  if (!vocab) return 'Invalid vocab selected';
  const vocabsView = props.vocabsView;

  return (
    <div>
      <header>
        <h1>Vocabulary Terms for {vocabname}</h1>
        <h2>in the {repo} repository</h2>
      </header>
      <content>
        {
          _.reduce(
            _.sortBy(_.keys(vocab), k => (vocab[k].vocab.registrationOrder || k)), 
            (acc,key) => _.concat(acc, [
              <VocabItem key={'vocab'+key} 
                term={key} 
                schema={vocab[key]} 
                view={vocabsView[key]}
                usesTerms={usesterms([],vocab[key])}
              />,
              <hr key={'hrvocab'+key} />
            ])
            ,[]
          )
        }
      </content>
    </div>
  );

});
