import React from 'react';
import {connect} from 'cerebral-view-react';
import { Button, } from 'react-pure';
import Select from 'react-select';
import classnames from 'classnames/bind';
import _ from 'lodash';

import style from './style.css';
import 'react-select/dist/react-select.css';
const cx = classnames.bind(style);

export default connect({
  formatsActiveNotVocab: [ 'formatsActiveNotVocab' ],
  vocabs: [ 'vocabs' ],
  formats: [ 'formats' ],
  activeCore: [ 'activeCore' ],
},{
  // signals
  formatsVocabSwitchClicked: 'formatsVocabSwitchClicked',
  activeCoreSelected: 'activeCoreSelected',
}, function TopMenu(props) {

  // Only one button can have the primary class at a time (indicates which view is active)
  const fclass = cx({'pure-button-primary': props.formatsActiveNotVocab });
  const vclass = cx({'pure-button-primary': !props.formatsActiveNotVocab });

  const repos = (props.formatsActiveNotVocab ? props.formats : props.vocabs);
  const coreoptions = _.reduce(repos, (acc,r,reponame) => 
    acc.concat(
      _.map(_.keys(r), c => ({ value: reponame+':'+c, label: reponame+':'+c }) )
    )
  ,[]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
      <div className={cx('pure-menu-heading')} style={{ alignSelf: 'flex-start' }}>
        OADA Model Viz
      </div>

      <div>
        <Button className={fclass} onClick={() => props.formatsVocabSwitchClicked() }>
          Formats
        </Button>
        <Button className={vclass} onClick={() => props.formatsVocabSwitchClicked()}>
          Vocabulary
        </Button>
      </div>

      <div style={{ flexShrink: 0, flexGrow: 1, padding: '0px 5px 0px 5px' }}>
        <Select 
          value={props.activeCore} 
          options={coreoptions} 
          onChange={props.activeCoreChanged} 
        />
      </div>

    </div>
  );

});
