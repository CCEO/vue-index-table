<template>
    <div class="dynamic-tables">
        <b-breadcrumb>
            <b-breadcrumb-item v-for="breadcrumb in breadcrumbs">
                <a :href="breadcrumb.url">
                    <i :class="breadcrumb.icon"></i>{{ breadcrumb.icon ? " " : "" }}{{ breadcrumb.text }}
                </a>
            </b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="page-title">{{ title }}</h2>
        <b-card :title="subtitle" collapse close customHeader>
            <b-button-group class="pull-right float-right">
                <b-button v-for="button in toolbar" :variant="button.variant"
                          class="btn-rounded-f width-100 mb-xs mr-xs" :href="button.url"
                          @click="button.tap">
                    <i v-if="button.icon" :class="button.icon"></i>{{ button.icon ? " " : "" }}{{ button.text }}
                </b-button>
            </b-button-group>
            <v-client-table :data="data" :columns="columns" :options="options">
                <div slot="actions" slot-scope="props">
                    <b-button-group size="sm">
                        <b-button class="btn-rounded-f pull-right" v-for="button in buttons"
                                  v-b-modal="button.name" :variant="button.variant" :href="button.URL"
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
            title: {type: String},
            breadcrumbs: {type: Array},
            subtitle: {type: String},
            toolbar: {type: Array},
            data: {type: Array},
            columns: {type: Array},
            buttons: {type: Array}
        },
        data() {
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
            showModal(button) {
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
</script>
