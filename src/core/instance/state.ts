import { Component } from "./index";
import { observe } from "../observer/index";

function proxy(source:Object,sourceKey:string,key:string):void{
    Object.defineProperty(source,key,{
        enumerable:true,
        configurable:true,
        get(){
            console.log('proxy --> get')
            return this[sourceKey][key];
        },
        set(newVal){
            console.log('proxy --> set')
            this[sourceKey][key] = newVal;
        }
    })
}

function initData(vm:Component){
    let data = vm.$options.data;
    //给实例对象设置代理，能从 data 中访问数据,
    // eg: vm.key = vm._data.key = data.key
    data = vm._data = data;
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        proxy(vm,"_data",key)
    }

    // 调用 observe 函数进行数据响应化
    observe(data);
}

export function initState(vm:Component){
    initData(vm);
}