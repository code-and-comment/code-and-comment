import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { RepositoriesDatalist } from '../../src/jsx/parts/repositories-datalist.jsx'

describe('parts/repositories-datalist', () => {
  describe('<RepositoriesDatalist />', () => {
    it('returns null when repositories is empty', () => {
      const wrapper = mount(<RepositoriesDatalist repositories={ [] } />)
      expect(wrapper.html()).to.equal(null)
    })

    it('returns datalist', () => {
      const wrapper = mount(<RepositoriesDatalist repositories={ ['a', 'b'] } />)
      expect(wrapper.html()).to.equal('<datalist id="repositories"><option value="a"></option><option value="b"></option></datalist>')
    })
  })
})
