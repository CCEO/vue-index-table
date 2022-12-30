(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.IndexTable = {})));
}(this, (function (exports) { 'use strict';

    (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".no-card[data-v-be5268ae] { border: 0; background-color: transparent; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();


































































    var Index = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dynamic-tables"},[(_vm.breadcrumbs.length)?_c('nav',{attrs:{"aria-label":"breadcrumb"}},[_c('ol',{staticClass:"breadcrumb"},_vm._l((_vm.breadcrumbs),function(breadcrumb){return _c('li',{key:breadcrumb.text,staticClass:"breadcrumb-item"},[_c('a',{attrs:{"href":breadcrumb.url}},[_c('i',{class:breadcrumb.icon}),_vm._v(_vm._s(breadcrumb.icon ? " " : "")+_vm._s(breadcrumb.text)+" ")])])}),0)]):_vm._e(),_vm._v(" "),_c('h2',{staticClass:"page-title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"card",class:{ 'no-card': _vm.hasCard }},[_c('div',{staticClass:"card-body"},[_c('h5',{staticClass:"card-title"},[_vm._v(_vm._s(_vm.subtitle))]),_vm._v(" "),_c('div',{staticClass:"btn-group pull-right float-right"},_vm._l((_vm.toolbar),function(button){return _c('a',{key:button.text,staticClass:"btn-rounded-f width-100 mb-xs mr-xs btn-rounded",class:'btn-'+button.variant,attrs:{"class":"btn-rounded-f width-100 mb-xs mr-xs btn-rounded","href":button.url},on:{"click":button.tap}},[(button.icon)?_c('i',{class:button.icon}):_vm._e(),_vm._v(_vm._s(button.icon ? " " : "")+_vm._s(button.text)+" ")])}),0),_vm._v(" "),_c('v-client-table',{attrs:{"data":_vm.data,"columns":_vm.columns,"options":_vm.settings},scopedSlots:_vm._u([{key:_vm.actionsColumn,fn:function(props){return _c('div',{},[(_vm.buttons.length==0)?_vm._t("buttons",null,{row:props.row,id:props.row.id,index:props.index}):_c('div',{staticClass:"btn-group m-auto"},_vm._l((_vm.buttons),function(button){return (button.visible==null || button.visible(props.row))?_c('a',{key:button.text,staticClass:"btn btn-rounded-f pull-right btn-rounded btn-sm",class:'btn-'+button.variant,attrs:{"data-toggle":"modal","data-target":'#'+button.name,"href":button.url ? button.url.replace(':id', props.row.id) : null},on:{"click":function($event){_vm.showModal(button, props.row.id);}}},[_c('i',{class:button.icon})]):_vm._e()}),0)],2)}}])}),_vm._v(" "),_c('div',{ref:"modal",staticClass:"modal fade",attrs:{"id":_vm.modal.name}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title",attrs:{"id":"exampleModalLabel"}},[_vm._v(_vm._s(_vm.modal.title))]),_vm._v(" "),_vm._m(0)]),_vm._v(" "),_c('div',{staticClass:"bg-white",attrs:{"class":"bg-white"}},[_vm._v(" "+_vm._s(_vm.modal.text)+" ")]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn float-right",class:'btn-'+_vm.modal.variant,on:{"click":function($event){_vm.accept();}}},[_vm._v(" "+_vm._s(this.modal.accept)+" ")]),_vm._v(" "),_c('button',{staticClass:"btn float-right mr-1",on:{"click":function($event){_vm.cancel();}}},[_vm._v(_vm._s(this.modal.cancel))])])])])])],1)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}],_scopeId: 'data-v-be5268ae',
        name: "Index",
        props: {
            title: {type: String, default: null},
            breadcrumbs: {type: Array, default: function () { return []; }},
            subtitle: {type: String, default: null},
            toolbar: {type: Array, default: null},
            data: {type: Array, default: null},
            columns: {type: Array, default: null},
            actionsColumn: {type: String, default: null},
            buttons: {type: Array, default: function () { return []; }},
            hasCard: {type: Boolean, default: null},
            options: {type: Object, default: null}
        },
        data: function data() {
            var defaultOptions = {
                perPage: 5,
                pagination: {
                    chunk: 5,
                    dropdown: false,
                },
                texts: {
                    filter: '',
                    count: '',
                    limit: ''
                },
                //skin: 'table table-striped',
                sortIcon: {
                    base: 'fa text-muted ml-1',
                    up: 'fa-chevron-up ml-1',
                    down: 'fa-chevron-down ml-1',
                    is: 'fa-sort ml-1',
                }
            };
            var options = this.options ? Object.assign(defaultOptions, this.options) : defaultOptions;
            return {
                settings: options,
                modal: {}
            }
        },
        methods: {
            showModal: function showModal(button, id) {
                if (button.modal) {
                    this.modal = {
                        variant: button.variant,
                        title: button.modal.title,
                        text: button.modal.text,
                        id: id,
                        form: {
                            method: button.modal.method,
                            url: button.modal.url.replace(':id', id)
                        },
                        accept: button.modal.accept ? button.modal.accept : "Accept",
                        cancel: button.modal.cancel ? button.modal.cancel : "Cancel"
                    };
                    this.$refs.modal.show();
                }
            },
            cancel: function cancel() {
                this.$refs.modal.hide();
            },
            accept: function accept() {
                var this$1 = this;

                axios({
                    method: this.modal.form.method,
                    url: this.modal.form.url,
                }).then(function () {
                    var index = this$1.data.findIndex(function (row) { return row.id == this$1.modal.id; });
                    this$1.data.splice(index, 1);
                }).catch(function (err) {
                    console.error(err);
                });
                this.$refs.modal.hide();
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

    exports.install = install;
    exports.default = Index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
