(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




































var Index = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dynamic-tables"},[_c('b-breadcrumb',_vm._l((_vm.breadcrumbs),function(breadcrumb){return _c('b-breadcrumb-item',[_c('a',{attrs:{"href":breadcrumb.url}},[_c('i',{class:breadcrumb.icon}),_vm._v(_vm._s(breadcrumb.icon ? " " : "")+_vm._s(breadcrumb.text)+" ")])])}),1),_vm._v(" "),_c('h2',{staticClass:"page-title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('b-card',{attrs:{"title":_vm.subtitle,"collapse":"","close":"","customHeader":""}},[_c('b-button-group',{staticClass:"pull-right float-right"},_vm._l((_vm.toolbar),function(button){return _c('b-button',{staticClass:"btn-rounded-f width-100 mb-xs mr-xs",attrs:{"variant":button.variant,"href":button.url},on:{"click":button.tap}},[(button.icon)?_c('i',{class:button.icon}):_vm._e(),_vm._v(_vm._s(button.icon ? " " : "")+_vm._s(button.text)+" ")])}),1),_vm._v(" "),_c('v-client-table',{attrs:{"data":_vm.data,"columns":_vm.columns,"options":_vm.options},scopedSlots:_vm._u([{key:"actions",fn:function(props){return _c('div',{},[_c('b-button-group',{attrs:{"size":"sm"}},_vm._l((_vm.buttons),function(button){return _c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal",value:(button.name),expression:"button.name"}],staticClass:"btn-rounded-f pull-right",attrs:{"variant":button.variant,"href":button.URL},on:{"click":function($event){_vm.showModal(button);}}},[_c('i',{class:button.icon})])}),1)],1)}}])}),_vm._v(" "),_c('b-modal',{ref:"modal",attrs:{"id":_vm.modal.name,"variant":_vm.modal.variant,"title":_vm.modal.title,"body-class":"bg-white"}},[_vm._v(" "+_vm._s(_vm.modal.text)+" ")])],1)],1)},staticRenderFns: [],
    name: "Index",
    props: {
        title: {type: String},
        breadcrumbs: {type: Array},
        subtitle: {type: String},
        toolbar: {type: Array},
        data: {type: Array},
        columns: {type: Array},
        buttons: {type: Array}
    },
    data: function data() {
        return {
            options: {
                perPage: 10,
                pagination: {chunk: 10, dropdown: false},
                texts: {filter: '', count: '', limit: ''},
                columnsClasses: {id: 'width-100'},
                skin: 'table table-striped',
                sortIcon: {
                    base: 'fa text-muted', up: 'fa-chevron-up', down: 'fa-chevron-down', is: 'fa-sort',
                }
            },
            modal: {
                variant: 'primary',
                title: '',
                text: '',
                form: {
                    method: '',
                    url: ''
                }
            }
        }
    },
    methods: {
        showModal: function showModal(button) {
            this.modal = {
                variant: button.variant,
                title: button.modal.title,
                text: button.modal.text,
                form: {
                    method: button.method,
                    url: button.URL
                }
            };
            this.$refs.modal.show();
        }
    }
}

/* eslint-disable */

function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('IndexTable', Index);
}

var plugin = {
    install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default Index;
export { install };
