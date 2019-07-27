import { h, FunctionalComponent, ComponentChildren } from 'preact'

type clickHandler = (event: MouseEvent) => any
type Props = { disabled?: boolean, onClick?: clickHandler, children: ComponentChildren }

const Button: FunctionalComponent<Props> = function ({ disabled, onClick, children }) {
  const className = disabled ? 'cc-button cc-button-disabled' : 'cc-button'
  const _onClick = disabled ? undefined : onClick
  return <span className={ className } onClick={ _onClick }>{ children }</span>
}

export default Button
