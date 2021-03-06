import { h } from 'preact'
import { spy } from 'sinon'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { RepositorySelector } from '../../src/tsx/parts/repository-selector'

describe('parts/repository-selector', () => {
  describe('<RepositorySelector />', () => {
    it('displays repositories', () => {
      const setCodeAndComments = function() {}
      let wrapper = mount(<RepositorySelector repositories={ ['a', 'b'] } searchRepository={ 'b' } setCodeAndComments={ setCodeAndComments } />)
      let html = '<div class="cc-repository-selector"><div class="application-name">Code and Comment</div><div data-repository="a" class="repository">a</div><div data-repository="b" class="repository selected">b</div></div>'
      expect(wrapper.html()).to.equal(html)

      wrapper = mount(<RepositorySelector repositories={ [] } searchRepository={ 'b' } setCodeAndComments={ setCodeAndComments } />)
      html = '<div class="cc-repository-selector"><div class="application-name">Code and Comment</div></div>'
      expect(wrapper.html()).to.equal(html)
    })

    it('selects a repository', () => {
      const setCodeAndComments = spy()
      const wrapper = mount(<RepositorySelector repositories={ ['a', 'b'] } searchRepository={ 'b' } setCodeAndComments={ setCodeAndComments } />)
      const repository = wrapper.find('.repository').at(1)
      repository.simulate('click')
      expect(setCodeAndComments.args[0][0]).to.equal('b')
    })

    it('shouldComponentUpdate', () => {
      const repositories = []
      const searchRepository = 'foo'
      const repositorySelector = new RepositorySelector({ repositories, searchRepository })
      expect(repositorySelector.shouldComponentUpdate({ repositories, searchRepository })).to.be.false
      expect(repositorySelector.shouldComponentUpdate({ repositories: [], searchRepository })).to.be.true
      expect(repositorySelector.shouldComponentUpdate({ repositories, searchRepository: 'bar' })).to.be.true
    })
  })
})
