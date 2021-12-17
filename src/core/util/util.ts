/*
 * @Author: 黄灿民
 * @Date: 2021-12-16 12:46:00
 * @LastEditTime: 2021-12-16 20:22:27
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \mini-vue2\src\core\util\util.ts
 */
export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object'
}

/**
 * Check whether an object has the property.
 */
 const hasOwnProperty = Object.prototype.hasOwnProperty
 export function hasOwn (obj: Object , key: string): boolean {
   return hasOwnProperty.call(obj, key)
 }