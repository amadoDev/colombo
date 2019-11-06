const formatNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const formatDate = (data, options) => {
  options = {
    ...options,
    ...{ year: 'numeric', month: 'numeric', day: 'numeric' }
  }
  const dateParse = Date.parse(data)
  if (dateParse) {
    return new Date(data).toLocaleDateString('es-ES', options)
  } else {
    return data
  }
}

const formatValue = value => {
  if (!value) {
    return 'No disponible'
  } else if (isNaN(value)) {
    return formatDate(value)
  } else {
    return formatNum(value)
  }
}

const splitDate = dateString => {
  // - dateString format yyyy/mm/dd
  const date = dateString.split('-')
  return {
    year: parseInt(date[0], 10),
    month: parseInt(date[1], 10),
    day: parseInt(date[2], 10)
  }
}

const objToArr = obj => {
  const toArray = Object.keys(obj).map(key => {
    return obj[key]
  })
  return toArray
}

const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

const isOdd = num => num % 2

export {
  formatNum,
  formatDate,
  formatValue,
  splitDate,
  objToArr,
  hexToRGB,
  isOdd
}
