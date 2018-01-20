<template>
    <div class="todoForm">
        <div class="container">
            <div class="row">
                <div class="form-group col-lg-4 col-lg-offset-4">
                    <label for="nom">Nom de la tâche</label>
                    <input class="form-control" type="text" id="nom" v-model="nom"/>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-lg-6 col-lg-offset-3">
                    <label for="description">Description de la tâche</label>
                    <textarea class="form-control" rows="5" id="description" v-model="description"/></textarea>
                </div>
           </div>
        </div>
    </div>
</template>

<script>

    /**
     * Ce component présente un formulaire contenant les informations d'une todo
     * Il est utilisé soit par le composant pour créer ou celui pour mettre à jour
     * Il ne possède pas d'action lors de la soumission, ce sont les composants qui l'utilisent (create/update) qui définissent la bonne action.
     */

    const axios = require('axios')

    export default {
        name: 'todoForm',
        props: [
            'id',
        ],
        data () {
        return {
                nom:'',
                description:''
            }
        },
        created(){
            if (this.id !== undefined) { //Cas de mise à jour, ou plus largement, si on veut avoir les données (on passe alors l'id de la todo pour récupérer les données)
                var link = "http://localhost:3000/getTodo/" + this.id;
                axios.get(link, {withCredentials: true})
                        .then(response=>{
                    var todo = response.data;
                    if(!todo) {
                        this.$emit("noData"); //Si il n'y a pas de données (id inconnu) on préviens le composant parent
                    }
                    else {
                        this.nom = todo.nom;
                        this.description = todo.description;
                    }
                });
            }
        }
    }
</script>