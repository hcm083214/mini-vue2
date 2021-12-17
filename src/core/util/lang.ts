/*
 * @Author: 黄灿民
 * @Date: 2021-12-16 11:59:24
 * @LastEditTime: 2021-12-17 12:03:58
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \mini-vue2\src\core\util\lang.ts
 */

//定义一个对象的属性
export function def(obj: Object, key: string, val: any,enumerable?:boolean) {
    Object.defineProperty(obj, key, {
        enumerable: !!enumerable,
        configurable: true,
        writable: true,
        value: val,
    })
}