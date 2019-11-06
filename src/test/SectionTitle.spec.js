import { mount } from '@vue/test-utils'
import SectionTitle from '~/components/common/SectionTitle.vue'

describe('SectionTitle.vue', () => {
  test('Setup correctly', () => {
    expect(true).toBe(true)
  })
  test('component mount', () => {
    const wrapper = mount(SectionTitle)
    expect(wrapper.text()).toContain('')
  })
})
