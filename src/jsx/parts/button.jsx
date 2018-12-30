import { h } from 'preact'


function Button({ disabled, onClick, children }) {
  const className = disabled ? 'cc-button cc-button-disabled' : 'cc-button'
  onClick = disabled ? null : onClick
  return <span className={ className } onClick={ onClick }>{ children }</span>
}

export default Button
