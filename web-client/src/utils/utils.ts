/**
 * Rounds the number to x decimal places
 * @param {number} number value to round
 * @param {number} precision round to decimal places
 */
export function precisionRound(number: number, precision: number) {
    const factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
}

/**
 * Similar to ''.indexOf() but applies from the nth occurrence
 * @param {string} source source string
 * @param {string} subString string to find
 * @param {number} index get the x occurrence
 */
export function getNthIndexOf(source: string, subString: string, index: number) {
    return source.split(subString, index).join(subString).length
}

/**
 * Debounce promises
 * @param {function} fn function to debounce
 * @param {number} ms milliseconds to execute
 */
export function debouncePromise(fn: Function, ms: number = 0) {
    // @ts-ignore
    let timer = null
    // @ts-ignore
    let resolves = []

    // @ts-ignore
    return function(...args) {
        // Run the function after a certain amount of time
        // @ts-ignore
        clearTimeout(timer)
        timer = setTimeout(() => {
            // Get the result of the inner function, then apply it to the resolve function of
            // each promise that has been created since the last time the inner function was run
            let result = fn(...args)
            // @ts-ignore
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

export function executeWhen(action: Function, predicate: Function) {
    setTimeout(() => {
        if (predicate()) {
            action()
        } else {
            executeWhen(action, predicate)
        }
    }, 1000)
}

export function resolveWhen(predicate: Function) {
    const retryCount = 10
    let count = 0

    return new Promise((resolve, reject) => {
        const intervalId = window.setInterval(() => {
            count++
            if (predicate()) {
                window.clearInterval(intervalId)
                resolve()
            } else if (count >= retryCount) reject('exceeded retry count')
        })
    })
}

export function pluralize(array: any[], singular: string, plural: string) {
    return array.length === 1 ? singular : plural
}

export function extractAllPagedData(
    promiseFactory: Function,
    pageSize: number,
    continuePredicate: Function
): Promise<any[]> {
    const output: any[] = []
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

export function extractQueryString(querystring: string): object {
    const qs = querystring
        .slice(1)
        .split('&')
        .reduce((p: object, i: string) => {
            const [key, value] = i.split('=')
            return { ...p, [key]: value }
        }, {})
    return qs
}

export function extractParamsFromHash(hash: string) {
    const params = window.location.hash
        .slice(1)
        .split('&')
        .reduce((acc, item) => {
            const [key, value] = item.split('=')
            return { ...acc, [key]: value }
        }, {})

    return params
}
export function mutateQueryStringWithoutReload(newQs?: string) {
    if (newQs && !newQs.startsWith('?`')) throw new Error("query string must start with a '?'")

    if ('pushState' in window.history) {
        const uri = `${window.location.protocol}//${window.location.host}${window.location.pathname}${newQs || ''}${
            window.location.hash
        }`
        window.history.pushState({ path: uri }, '', uri)
    }
}
