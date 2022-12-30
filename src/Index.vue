<template>
    <div class="dynamic-tables">

        <nav aria-label="breadcrumb" v-if="breadcrumbs.length">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text">
                    <a :href="breadcrumb.url">
                        <i :class="breadcrumb.icon"></i>{{ breadcrumb.icon ? " " : "" }}{{ breadcrumb.text }}
                    </a>
                </li>
            </ol>
        </nav>
        <h2 class="page-title">{{ title }}</h2>
        <div class="card" :class="{ 'no-card': hasCard }" >
            <div class="card-body">
                <h5 class="card-title">{{ subtitle }}</h5>

                <div class="btn-group pull-right float-right">
                    <a class="btn" v-for="button in toolbar" :class="'btn-'+button.variant" :key="button.text"
                              class="btn-rounded-f width-100 mb-xs mr-xs btn-rounded"
                              :href="button.url" @click="button.tap">
                        <i v-if="button.icon" :class="button.icon"></i>{{ button.icon ? " " : "" }}{{ button.text }}
                    </a>
                </div>
                <v-client-table :data="data" :columns="columns" :options="settings">
                    <div :slot="actionsColumn" slot-scope="props">
                        <slot v-if="buttons.length==0" name="buttons" :row="props.row" :id="props.row.id"
                              :index="props.index"></slot>
                        <div class="btn-group m-auto" v-else>
                            <a
                                    class="btn btn-rounded-f pull-right btn-rounded btn-sm" v-for="button in buttons" :key="button.text"
                                    v-if="button.visible==null || button.visible(props.row)"
                                    data-toggle="modal" :data-target="'#'+button.name" :class="'btn-'+button.variant"
                                    @click="showModal(button, props.row.id)"
                                    :href="button.url ? button.url.replace(':id', props.row.id) : null">
                                <i :class="button.icon"></i>
                            </a>
                        </div>
                    </div>
                </v-client-table>
                <div class="modal fade" ref="modal" :id="modal.name">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{{ modal.title }}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" class="bg-white">
                                {{ modal.text}}
                            </div>
                            <div class="modal-footer">
                                <button class="btn float-right" :class="'btn-'+modal.variant" @click="accept()">
                                    {{ this.modal.accept }}
                                </button>
                                <button class="btn float-right mr-1" @click="cancel()">{{ this.modal.cancel }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        props: {
            title: {type: String, default: null},
            breadcrumbs: {type: Array, default: () => []},
            subtitle: {type: String, default: null},
            toolbar: {type: Array, default: null},
            data: {type: Array, default: null},
            columns: {type: Array, default: null},
            actionsColumn: {type: String, default: null},
            buttons: {type: Array, default: () => []},
            hasCard: {type: Boolean, default: null},
            options: {type: Object, default: null}
        },
        data() {
            let defaultOptions = {
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
            let options = this.options ? Object.assign(defaultOptions, this.options) : defaultOptions;
            return {
                settings: options,
                modal: {}
            }
        },
        methods: {
            showModal(button, id) {
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
            cancel() {
                this.$refs.modal.hide();
            },
            accept() {
                axios({
                    method: this.modal.form.method,
                    url: this.modal.form.url,
                }).then(() => {
                    let index = this.data.findIndex(row => row.id == this.modal.id);
                    this.data.splice(index, 1);
                }).catch(err => {
                    console.error(err);
                });
                this.$refs.modal.hide();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .no-card {
        border: 0;
        background-color: transparent;
    }
</style>