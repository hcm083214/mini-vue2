/*
 * @Author: 黄灿民
 * @Date: 2021-12-15 15:25:10
 * @LastEditTime: 2021-12-17 12:37:16
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \mini-vue2\src\core\observer\index.ts
 */
import { def } from "../util/lang";
import { hasOwn, isObject } from "../util/util";

interface LooseObject {
    [key: string]: any
}

export function observe(data: any) {
    console.log("🚀 ~ file: index.ts ~ line 18 ~ observe ~ isObject(data)",data, isObject(data))

    if (!isObject(data)) return;
    let ob: Observer | void;
    // 观察者若存在直接返回，不存在则创建新的实例
    if (hasOwn(data,'__ob__') && data.__ob__ instanceof Observer) {
        ob = data.__ob__;
    } else {
        ob = new Observer(data);
    }
    return ob;
}

function defineReactive(obj: LooseObject, key: string, value?: any) {
    arguments.length === 2 && (value = obj[key]);
    observe(value);
    
    Object.defineProperty(obj, key, {
        configurable:true,
        enumerable:true,
        get() {
            console.log("🚀 ~ file: index.ts ~ line 32 ~ get ~ get",value)
            return value
        },
        set(newVal) {
            console.log("🚀 ~ file: index.ts ~ line 36 ~ set ~ set",value,newVal)
            this.value = newVal;
            observe(newVal);
        }
    })

}

class Observer {
    public value: any
    constructor(value: any) {
        this.value = value;
        // 给数据贴上 __ob__ 属性，值为 Observer 实例，如果有 __ob__ 属性，则不再 observe
        // 这边有个细节，enumerable 需要设置为 false，防止遍历 __ob__ 里面的属性进行响应化操作导致死循环
        def(value, "__ob__", this);
        
        //对每个数据进行响应化
        this.walk(value);
    }
    private walk(obj: Object) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }
}