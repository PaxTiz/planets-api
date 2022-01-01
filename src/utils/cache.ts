import { NextFunction, Request, Response } from 'express'
const mc = require('memory-cache')

const cacheKey = (key: string) => `__cache__${key}`

/**
 * Returns a value of the cache
 * @param key key of the entry
 * @returns the value if it exists, or null
 */
export function read(key: string): string | null {
    return mc.get(cacheKey(key))
}

/**
 * Delete an entry in the cache if
 * it exists, does nothing otherwise
 * @param key key of the entry
 */
export function remove(key: string) {
    mc.del(key)
}

/**
 * Add data to the cache
 * @param key key of the entry, usually the 'req.originalUrl' from Express
 * @param value value to add in the cache for the given key
 * @param duration time the entry exists in the cache, default to 15 minutes
 * @returns the value
 */
export function write(key: string, value: any, duration: number = 15) {
    return mc.put(cacheKey(key), value, duration * 60000)
}

/**
 * Express middleware that returns value in the cache if it 
 * exists or execute the full request if it's not present
 */
export default function cache(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl
    const data = read(url)
    if (data !== null) {
        return res.send(data)
    } else {
        return next()
    }
}
