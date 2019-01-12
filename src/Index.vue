<template>
    <div class="dynamic-tables">
        <b-breadcrumb v-if="typeof breadcrumbs !== 'undefined'">
            <b-breadcrumb-item v-for="breadcrumb in breadcrumbs">
                <a :href="breadcrumb.url">
                    <i :class="breadcrumb.icon"></i>{{ breadcrumb.icon ? " " : "" }}{{ breadcrumb.text }}
                </a>
            </b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="page-title">{{ title }}</h2>
        <b-card :title="subtitle" :class="{ 'no-card': hasCard }" collapse close customHeader>
            <b-button-group class="pull-right float-right">
                <b-button v-for="button in toolbar" :variant="button.variant"
                          class="btn-rounded-f width-100 mb-xs mr-xs btn-rounded"
                          :href="button.url" @click="button.tap">
                    <i v-if="button.icon" :class="button.icon"></i>{{ button.icon ? " " : "" }}{{ button.text }}
                </b-button>
            </b-button-group>
            <v-client-table :data="data" :columns="columns" :options="settings">
                <div :slot="actionsColumn" slot-scope="props">
                    <b-button-group size="sm" class="m-auto">
                        <b-button class="btn-rounded-f pull-right btn-rounded" v-for="button in buttons"
                                  v-if="button.exceptions ? button.exceptions.indexOf(props.row.id) < 0 : true"
                                  v-b-modal="button.name" :variant="button.variant" @click="showModal(button, props.row.id)"
                                  :href="button.url ? button.url.replace(':id', props.row.id) : null">
                            <i :class="button.icon"></i>
                        </b-button>
                    </b-button-group>
                </div>
            </v-client-table>
            <b-modal ref="modal" :id="modal.name" :variant="modal.variant" :header-text-variant="modal.variant" :title="modal.title" body-class="bg-white">
                {{ modal.text}}
                <div slot="modal-footer" class="w-100">
                    <b-btn class="float-right" :variant="modal.variant" @click="accept()">{{ this.modal.accept }}</b-btn>
                    <b-btn class="float-right mr-1" @click="cancel()">{{ this.modal.cancel }}</b-btn>
                </div>
            </b-modal>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "Index",
        props: {
            title: {type: String, default: null},
            breadcrumbs: {type: Array, default: null},
            subtitle: {type: String, default: null},
            toolbar: {type: Array, default: null},
            data: {type: Array, default: null},
            columns: {type: Array, default: null},
            actionsColumn: {type: String, default: null},
            buttons: {type: Array, default: null},
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

            console.log(options);
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
                    window.location.reload();
                }).catch(err => {
                    console.error(JSON.stringify(err));
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