import { h, FunctionalComponent, ComponentChildren } from 'preact'

interface Props { disabled?: boolean, onClick?: (event: MouseEvent) => any, children: ComponentChildren }


const Button: FunctionalComponent<Props> = function ({ disabled, onClick, children }) {
  const className = disabled ? 'cc-button cc-button-disabled' : 'cc-button'
  const _onClick = disabled ? undefined : onClick
  return <span className={ className } onClick={ _onClick }>{ children }</span>
}

export default Button
