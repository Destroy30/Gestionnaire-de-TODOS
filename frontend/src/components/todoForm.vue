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
            if (this.id !== undefined) {
                var link = "http://localhost:3000/getTodo/" + this.id;
                axios.get(link, {withCredentials: true})
                        .then(response=>{
                    var todo = response.data;
                    this.nom = todo.nom;
                    this.description = todo.description;});

            }
        }
    }
</script>