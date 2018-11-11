import { h } from 'preact'
import { expect } from 'chai'

import Header from '../../src/jsx/parts/header.jsx'

describe('parts/header', () => {
  it('returns vnodes ', () => {
    expect(Header()).to.deep.equal(<div className="header"><h1>Code and Comment</h1></div>)
  })
})
