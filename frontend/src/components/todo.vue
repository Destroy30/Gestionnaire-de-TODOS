<template>
        <li>{{ nom }}</li>
</template>

<script>
    export default {
        name: 'todo',
        props: [
            'id',
            'nom'
        ]
    }
</script>

