import Index from './Index';

const vueIndexTable = {
    install(Vue, options) {
        Vue.component('alv-form', Index);
        Vue.mixin({
            mounted() {
                console.log('ALV is running!!!!');
            }
        });
    }
};

export default vueIndexTable;