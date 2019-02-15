import { h } from 'preact'

import Button from './button.jsx'


function addAnchor(url, button) {
  if (url) {
    return <a href={ url } target="_blank" rel="noopener noreferrer">{ button }</a>
  }
  return button
}


function Navigator({
  leftLabel,
  leftClick,
  leftDisabled,
  leftUrl,
  rightLabel,
  rightClick,
  rightDisabled,
  rightUrl,
}) {
  const leftButton = (
    leftLabel && addAnchor(
      leftUrl,
      <Button disabled={ leftDisabled } onClick={ leftClick }><img src="dist/arrow-back.svg" />{ leftLabel }</Button>
    )
  )
  const rightButton = (
    rightLabel && addAnchor(
      rightUrl,
      <Button disabled={ rightDisabled } onClick={ rightClick }>{ rightLabel }<img src="dist/arrow-forward.svg" /></Button>
    )
  )
  return (
    <div className="cc-navigator">
      <div>
        { leftButton }
      </div>
      <div>
        { rightButton }
      </div>
    </div>
  )
}


export default Navigator
