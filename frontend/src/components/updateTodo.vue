<template>
    <div class="todoUpdate">
        <h1>Mise à jour de la tâche</h1>
        <todoForm @noData="backHome()" ref="updateForm" :key="id" :id="id"></todoForm>
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
                let nom = this.$refs.updateForm.nom;
                let description = this.$refs.updateForm.description
                if(nom.trim()=="") {
                    alert("Vous devez compléter le nom de la tâche");
                }
                else {
                    params.append('id', this.id);
                    params.append('nom', nom);
                    params.append('description', description);
                    axios.post('http://localhost:3000/updateTodo/', params, {withCredentials: true})
                            .then(function (response) {
                                if (response.data) {
                                    router.go(-1)
                                }
                            })
                }
            },
            backHome() {
                router.push("/");
            }
        }
    }
</script>