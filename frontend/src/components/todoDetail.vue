<template>

</template>

<script>
    import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

    export default {
        name: 'todoDetail',
        components: {
            SweetModal,
            SweetModalTab
        },
        props: [
            'idTodo',
            'nom',
            'description'
        ]

    }
</script>