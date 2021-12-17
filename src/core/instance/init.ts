import { initState } from "./state";

import  {ComponentOptions, Component} from "../instance/index";

export default function initMixin(Vue:Function) {
    Vue.prototype._init = function (options:ComponentOptions) {
        const vm:Component = this;
        vm.$options = options;
        initState(vm);//数据初始化响应式
    }
}