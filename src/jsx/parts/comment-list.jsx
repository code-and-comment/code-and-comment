import { h } from 'preact'
import { connect } from 'unistore/preact'

import { scrollIntoView } from '../utils.jsx'


export function _onChange(event) {
  const number = event.target.value
  if (number === '0') {
    return
  }
  scrollIntoView(number)
}

export function CommentList({ comments, lines, handler }) {
  function onChange(event) {
    handler(event)
    _onChange(event)
  }
  return (
    <select className="cc-comment-list" onChange={ onChange }>
      <option value="0">Select comment</option>
      {
        Object.keys(comments).map((number) => {
          number -= 0
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


export default connect(['comments', 'lines'])(CommentList)
