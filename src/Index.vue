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
            <b-button-group class="pull-right float-righ:wt">
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
                                  v-b-modal="button.name" :variant="button.variant"
                                  :href="button.url ? button.url.replace(':id', props.row.id) : '#'"
                                  @click="showModal(button)">
                            <i :class="button.icon"></i>
                        </b-button>
                    </b-button-group>
                </div>
            </v-client-table>
            <b-modal ref="modal" :id="modal.name" :variant="modal.variant" :title="modal.title" body-class="bg-white">
                {{ modal.text}}
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
            let options = this.options ? Object.assign(this.options, defaultOptions) : defaultOptions;

            console.log(options.pagination);
            return {
                settings: options,
                modal: {}
            }
        },
        methods: {
            showModal(button) {
                console.log("Hi!");
                if (button.modal) {
                    this.modal = {
                        variant: button.variant,
                        title: button.modal.title,
                        text: button.modal.text,
                        form: {
                            method: button.modal.method,
                            url: button.modal.url
                        }
                    };
                    this.$refs.modal.show();
                }
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