<template>
    <div class="dynamic-tables">
        <b-breadcrumb>
            <b-breadcrumb-item>
                <a :href="homeURL">
                    <i class="fa fa-home"></i>
                </a>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>{{ title }}</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="page-title">{{ title }}</h2>
        <b-card :title="subtitle" collapse close customHeader>
            <b-button variant="primary" class="btn-rounded-f width-100 mb-xs mr-xs pull-right" :href="addButton.URL">
                {{ addButton.title }}
            </b-button>
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
            homeURL: {type: String},
            subtitle: {type: String},
            addButton: {type: Object},
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
