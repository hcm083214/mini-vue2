import initMixin from "./init";

export type options = {
    data: Object ;
}

export type ComponentOptions ={
    data: Object ;
}

export interface Component {
    $options: ComponentOptions;
    _init: Function;
    _data:Object
}

export default class Vue {
    
    constructor(options: options) {
        this._init(options)
    }
    private _init(options:options):void{};

}

initMixin(Vue); // 定义