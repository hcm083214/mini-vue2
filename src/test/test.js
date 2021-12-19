import Vue from "../index";

const vm = new Vue({
    data: {
        obj: {
            name: 'zs',
            age: 10,
        },
        id: 1,
        arr: [1, 2, 3]
    }
})
vm.obj.age