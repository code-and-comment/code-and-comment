import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { RepositorySelector } from '../../src/jsx/parts/repository-selector.jsx'

describe('parts/repository-selector', () => {
  describe('<RepositorySelector />', () => {
    it('displays repositories', () => {
      const searchRepository = function() {}
      const wrapper = mount(<RepositorySelector repositories={ ['a', 'b'] } searchRepository={ searchRepository } />)
      const html = '<div class="cc-repository-selector"><div class="application-name">Code and Comment</div>'
      + '<div class="repository" data-repository="a">a</div><div class="repository" data-repository="b">b</div></div>'
      expect(wrapper.html()).to.equal(html)
    })
  })
})
