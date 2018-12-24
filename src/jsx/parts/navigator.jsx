import { h } from 'preact'


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
      <button disabled={ leftDisabled } onClick={ leftClick }>{ leftLabel }</button>
    )
  )
  const rightButton = (
    rightLabel && addAnchor(
      rightUrl,
      <button disabled={ rightDisabled } onClick={ rightClick }>{ rightLabel }</button>
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
