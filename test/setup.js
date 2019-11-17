/// <reference types='enzyme-adapter-preact-pure'/>

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-preact-pure'


const adapter = new Adapter()
configure({ adapter })
