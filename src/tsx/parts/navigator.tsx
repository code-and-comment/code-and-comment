import { h, FunctionalComponent } from 'preact'

import Button from './button'


interface Props {
  rightLabel: string,
  rightClick: (event: MouseEvent) => any,
  rightDisabled?: boolean,
}

const Navigator: FunctionalComponent<Props> = function Navigator({
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
