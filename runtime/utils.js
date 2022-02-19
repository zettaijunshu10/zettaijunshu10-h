export const clamp = (x, low, high) => {
  if (x < low) {
    return low
  } else if (x > high) {
    return high
  }
  return x
}

export const hexByte = n => {
  const nString = n.toString(16)
  return nString.length < 2
    ? `0${nString}`
    : nString.substr(0, 2)
}

export const parseRGBAFromObject = color => {
  const { r, g, b, a } = color

  const rgba = [r, g, b, a]
    .map(x => x === undefined ? 0 : clamp(x, 0, 255))
    .map(x => `${hexByte(x)}`)

  const hexColor = `#${rgba.join('')}`

  return hexColor
}

export const parseColor = color => {
  if (typeof color === 'string') {
    return color
  } else if (typeof color === 'object') {
    return parseRGBAFromObject(color)
  }
}
