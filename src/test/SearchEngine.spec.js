import { shallowMount, Wrapper } from '@vue/test-utils'
import SearchEngine from '~/components/home/SearchEngine.vue'

describe('SearchEngine.vue', () => {
  let wrapper =
    Wrapper <
    SearchEngine >
    beforeEach(() => {
      wrapper = shallowMount(SearchEngine, {
        mocks: {
          $t: key => key
        },
        propsData: {}
      })
    })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
