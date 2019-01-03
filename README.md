# Index table

📄 Index table for Vue It has been created to accelerate the task of creating a table to index a resource and add 
buttons for its administration.

## Features

- Cancel requests

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Installing

Using npm:

```bash
$ npm install @cceo/vue-index-table --save
```

## Example


```vue
<template>
    <div>
        <Index
            :title="title"
            :subtitle="subtitle"
            :homeURL="homeURL"
            :addButton="addButton"
            :columns="columns"
            :data="data"
            :buttons="buttons"
        ></Index>
    </div>
</template>

<script>
    import Index from 'vue-index-table';

    export default {
        name: 'FieldsPage',
        components: {Index},
        data() {
            return {
                title: 'Fields',
                subtitle: 'Index of Fields',
                homeURL: '/',
                addButton: {
                    title: 'New',
                    URL: '/system/field/create'
                },
                columns: ['id', 'nombre', 'direccion', 'responsable', 'actions'],
                data: [
                    {
                        id: 1,
                        nombre: 'Canchita 1',
                        direccion: 'Juarez #123',
                        responsable: 'David Martínez'
                    },
                    {
                        id: 2,
                        nombre: 'Canchita 2',
                        direccion: 'Las lomas #45',
                        responsable: 'Roberto López'
                    },
                    {
                        id: 3,
                        nombre: 'Canchita 3',
                        direccion: 'Av. Universidad #565',
                        responsable: 'María Gutierrez'
                    }
                ],
                buttons: [
                    {
                        name: 'show',
                        icon: 'fa fa-eye',
                        URL: 'fields/show',
                        method: 'get',
                        variant: 'success'
                    },
                    {
                        name: 'edit',
                        icon: 'fa fa-pencil',
                        URL: 'fields/edit',
                        method: 'get',
                        variant: 'primary'
                    },
                    {
                        name: 'delete',
                        icon: 'fa fa-trash',
                        URL: '',
                        method: 'delete',
                        variant: 'danger',
                        modal: {
                            title: 'Eliminar',
                            text: 'Si se elimina no se podrá recuperar después.'
                        }
                    },
                ]
            };
        },
    };
</script>
```
