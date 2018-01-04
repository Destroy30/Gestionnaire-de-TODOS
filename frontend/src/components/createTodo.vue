<template>
    <div class="todoAdd">
        <h1>Ajout d'une nouvelle tâche</h1>
        <todoForm ref="createForm"></todoForm>
        <button type="button" class="btn btn-primary btn-lg" @click="submitForm">Créer la tâche</button>
    </div>
</template>

<script>
    import todoForm from '@/components/todoForm'
    import router from '../router'
    const axios = require('axios')

    export default {
        name: 'createTodo',
        components: {
            todoForm
        },
        methods: {

            submitForm () {
                var params = new URLSearchParams();
                params.append('nom', this.$refs.createForm.nom);
                params.append('description', this.$refs.createForm.description);
                axios.post('http://localhost:3000/addTodo/', params,{withCredentials : true})
                        .then(function (response) {
                            if(response.data) {
                                router.push('/');
                            }
                        })
            }

        }
    }
</script>