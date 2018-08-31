/**
 * Rounds the number to x decimal places
 * @param {number} number value to round
 * @param {number} precision round to decimal places
 */
export function precisionRound(number, precision) {
  const factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}

/**
 * Similar to ''.indexOf() but applies from the nth occurrence
 * @param {string} source source string
 * @param {string} subString string to find
 * @param {number} index get the x occurrence
 */
export function getNthIndexOf(source, subString, index) {
  return source.split(subString, index).join(subString).length
}

/**
 * Debounce promises
 * @param {function} fn function to debounce
 * @param {number} ms milliseconds to execute
 */
export function debouncePromise(fn, ms = 0) {
  let timer = null
  let resolves = []

  return function(...args) {
    // Run the function after a certain amount of time
    clearTimeout(timer)
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      let result = fn(...args)
      resolves.forEach(r => r(result))
      resolves = []
    }, ms)

    return new Promise(r => resolves.push(r))
  }
}

export function getRandomHexColor() {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function executeWhen(action, conditionFn) {
  setTimeout(() => {
    if (conditionFn()) {
      action()
    } else {
      executeWhen(action, conditionFn)
    }
  }, 1000)
}

export function resolveWhen(conditionFn) {
  const retryCount = 10
  let count = 0

  return new Promise((resolve, reject) => {
    const intervalId = window.setInterval(() => {
      count++
      if (conditionFn()) {
        window.clearInterval(intervalId)
        resolve()
      } else if (count >= retryCount) reject('exceeded retry count')
    })
  })
}

export function pluralize(array, singular, plural) {
  return array.length === 1 ? singular : plural
}

export function extractAllPagedData(promiseFactory, pageSize, continuePredicate) {
  const output = []
  return new Promise(async (resolve, reject) => {
    let counter = 0
    let lastRes = null
    do {
      try {
        const res = await promiseFactory(counter * pageSize)
        lastRes = res
        output.push(...res.data)
        counter++
      } catch (err) {
        reject(err)
      }
    } while (continuePredicate(lastRes))
    resolve(output)
  })
}
