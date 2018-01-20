<template>
    <div class="todoAdd">
        <h1>Ajout d'une nouvelle tâche</h1>
        <todoForm ref="createForm"></todoForm>
        <button type="button" class="btn btn-primary btn-lg" @click="submitForm">Créer la tâche</button>
    </div>
</template>

<script>

    /**
     * Ce composant va permettre de créer une todo en utilisant le composant rodoForm.
     */

    import todoForm from '@/components/todoForm'
    import router from '../router'
    const axios = require('axios')

    export default {
        name: 'createTodo',
        components: {
            todoForm
        },
        methods: {

            /**
             * Methode appellée à la somussion du formulaire
             */
            submitForm () {
                var params = new URLSearchParams();
                let nom = this.$refs.createForm.nom;
                let description = this.$refs.createForm.description
                if(nom.trim()=="") { //Avertissement (pour ne pas créer de todo vide)
                    alert("Vous devez compléter le nom de la tâche");
                }
                else {
                    params.append('nom', nom);
                    params.append('description', description);
                    axios.post('http://localhost:3000/addTodo/', params, {withCredentials: true})
                            .then(function (response) {
                                if (response.data) {
                                    router.go(-1) //Dès qu'on a fini, on retourne une page en arrière (la page où on a normalement cliqué pour venir ici)
                                }
                            })
                }
            }

        }
    }
</script>