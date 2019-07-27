import { h } from 'preact'

import Button from './button'


function Navigator({
  rightLabel,
  rightClick,
  rightDisabled,
}) {
  return (
    <div className="cc-navigator">
      <div />
      <div>
        <Button disabled={ rightDisabled } onClick={ rightClick }>{ rightLabel }<img src="dist/arrow-forward.svg" /></Button>
      </div>
    </div>
  )
}


export default Navigator
