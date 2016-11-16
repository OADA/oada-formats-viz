import React from 'react'
import {connect} from 'cerebral-view-react'
import { Menu, MenuItem, Button } from 'react-pure'
import style from './style.lcss'
import classnames from 'classnames/bind'

const cx = classnames.bind(style);

export default connect({
  formatsActiveNotVocab: [ 'formatsActiveNotVocab' ],
},{
  // signals
  formatsVocabSwitchClicked: 'formatsVocabSwitchClicked',
}, function TopMenu(props) {

  // Only one button can have the primary class at a time (indicates which view is active)
  const fclass = cx({'pure-button-primary': props.formatsActiveNotVocab });
  const vclass = cx({'pure-button-primary': !props.formatsActiveNotVocab });

  return (
    <Menu horizontal={true} className={cx('menu')}>
      <span className={cx('pure-menu-heading')}>OADA Model Viz</span>

      <MenuItem>
        <Button className={fclass} onClick={() => props.formatsVocabSwitchClicked() }>
          Formats
        </Button>
      </MenuItem>

      <MenuItem>
        <Button className={vclass} onClick={() => props.formatsVocabSwitchClicked()}>
          Vocabulary
        </Button>
      </MenuItem>

    </Menu>
  );

});
