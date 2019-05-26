import { h } from 'preact'

import Line from './line.jsx'


function FileBody({
  id,
  lines,
  comments,
  updateComment,
  editable,
  hiddenSignal,
  highlightLineNumber,
  setHighlightLineNumber
}) {
  return (
    <div className="cc-file-body">
      { lines.map((code, index) => {
        return (<Line
          id={ id }
          key={ index }
          code={ code }
          comment={ comments[index + ''] }
          index={ index }
          updateComment={ updateComment }
          editable={ editable }
          hiddenSignal={ hiddenSignal }
          isHighlight={ highlightLineNumber === (index + 1) }
          setHighlightLineNumber={ setHighlightLineNumber }
        />)
      }
      ) }
    </div>
  )
}


export default FileBody
