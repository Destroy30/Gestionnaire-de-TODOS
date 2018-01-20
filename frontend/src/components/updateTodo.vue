<template>
    <div class="todoUpdate">
        <h1>Mise à jour de la tâche</h1>
        <todoForm @noData="backHome()" ref="updateForm" :key="id" :id="id"></todoForm>
        <input type="hidden" v-model="id">
        <button type="button" class="btn btn-primary btn-lg" @click="submitForm">Modifier la tâche</button>
    </div>
</template>

<script>
    /**
     * Ce composant va permettre de mettre  à jour une todo
     * Elle va utiliser un composant todoForm pour y palcer les données
     * On va lui passer un id, qui va permettre au todoForm de pré-charger les données
     */

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
            /**
             * Méthode appellée lors de la soumission du formulaire
             */
            submitForm () {
                var params = new URLSearchParams();
                let nom = this.$refs.updateForm.nom;
                let description = this.$refs.updateForm.description
                if(nom.trim()=="") { //De même que pour la création, on ne permet pas de mettre un nom vide
                    alert("Vous devez compléter le nom de la tâche");
                }
                else {
                    params.append('id', this.id);
                    params.append('nom', nom);
                    params.append('description', description);
                    axios.post('http://localhost:3000/updateTodo/', params, {withCredentials: true})
                            .then(function (response) {
                                if (response.data) {
                                    router.go(-1) //Dès qu'on a fini, on retourne une page en arrière (la page où on a normalement cliqué pour venir ici)
                                }
                            })
                }
            },
            /**
             * Méthode appellée dans le cas où il n'y a pas de données pour l'id de la todo passée
             * On retourne donc sur la page d'accueil
             */
            backHome() {
                router.push("/");
            }
        }
    }
</script>