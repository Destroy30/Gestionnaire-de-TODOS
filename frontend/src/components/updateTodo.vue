<template>
    <div class="todoUpdate">
        <h1>Mise à jour de la tâche</h1>
        <todoForm ref="updateForm" :key="id" :id="id"></todoForm>
        <input type="hidden" v-model="id">
        <button type="button" class="btn btn-primary btn-lg" @click="submitForm">Modifier la tâche</button>
    </div>
</template>

<script>
    import todoForm from '@/components/todoForm'
    import router from '../router'
    const axios = require('axios')

    export default {
        name: 'updateTodo',
        components: {
            todoForm
        },
        props: [
            'id',
        ],
        methods: {

            submitForm () {
                var params = new URLSearchParams();
                params.append('id', this.id);
                params.append('nom', this.$refs.updateForm.nom);
                params.append('description', this.$refs.updateForm.description);
                axios.post('http://localhost:3000/updateTodo/', params,{withCredentials : true})
                        .then(function (response) {
                            if(response.data) {
                                router.push('/');
                            }
                        })
            },
        }
    }
</script>