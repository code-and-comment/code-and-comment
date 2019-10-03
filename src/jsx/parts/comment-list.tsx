import { h, FunctionalComponent } from 'preact'
import { connect } from 'unistore/preact'

import { scrollIntoView } from '../utils'


type I = {
  comments: Record<string, string>
  lines: string
}

type T = {
  handler: Function
}

type Props = T & I


export function _onChange(event: Event) {
  // @ts-ignore
  const number = event.target.value
  if (number === '0') {
    return
  }
  scrollIntoView(number)
}

export const CommentList: FunctionalComponent<Props> = function ({ comments, lines, handler }: Props) {
  function onChange(event: Event) {
    handler(event)
    _onChange(event)
    // @ts-ignore
    event.target.blur()
  }
  return (
    <select className="cc-comment-list" onChange={ onChange }>
      <option value="0">Select comment</option>
      {
        Object.keys(comments).map((_number: string) => {
          const number = +_number
          const lineNumber = number + 1
          return (
            <option value={ lineNumber } key={ number }>
              { lineNumber }: { lines[number].trim().substr(0, 100) }
            </option>
          )
        })
      }
    </select>
  )
}


export default connect<T, {}, {}, I>(['comments', 'lines'])(CommentList)
