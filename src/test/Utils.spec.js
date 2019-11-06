import * as Utils from '~/scripts/utils'

describe('formatNum', () => {
  it('Add a thousand separator when necessary', () => {
    expect(Utils.formatNum(4000)).toBe('4.000')
    expect(Utils.formatNum(40)).toBe('40')
    expect(Utils.formatNum(3244340)).toBe('3.244.340')
  })
})

describe('objToArr', () => {
  describe('Converts an object into an array of object`s values', () => {
    it('One level object', () => {
      const obj = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      }
      const result = ['value1', 'value2', 'value3']
      expect(Array.isArray(obj)).toBeFalsy()
      expect(Utils.objToArr(Array.isArray(obj))).toBeTruthy()
      expect(Utils.objToArr(obj)).toEqual(result)
    })

    it('Two level object', () => {
      const obj = {
        key1: {
          subkey1: 'value1',
          subket2: 'value2'
        },
        key2: {
          subkey1: 'value1',
          subket2: 'value2'
        }
      }
      const result = [
        {
          subkey1: 'value1',
          subket2: 'value2'
        },
        {
          subkey1: 'value1',
          subket2: 'value2'
        }
      ]
      expect(Array.isArray(obj)).toBeFalsy()
      expect(Utils.objToArr(Array.isArray(obj))).toBeTruthy()
      expect(Utils.objToArr(obj)).toEqual(result)
    })
  })
})

describe('hexToRGB', () => {
  describe('Convert a hexadecimal color to RGB', () => {
    it('without alpha channel', () => {
      expect(Utils.hexToRGB('#FFFF00')).toEqual('rgb(255, 255, 0)')
      expect(Utils.hexToRGB('#C0C0C0')).toEqual('rgb(192, 192, 192)')
      expect(Utils.hexToRGB('#B7B8CD')).toEqual('rgb(183, 184, 205)')
    })
    it('with alpha channel', () => {
      expect(Utils.hexToRGB('#FFFF00', 0.2)).toEqual('rgba(255, 255, 0, 0.2)')
      expect(Utils.hexToRGB('#C0C0C0', 0.5)).toEqual('rgba(192, 192, 192, 0.5)')
      expect(Utils.hexToRGB('#B7B8CD', 1)).toEqual('rgba(183, 184, 205, 1)')
    })
  })
})
