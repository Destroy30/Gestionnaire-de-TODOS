<template>
    <div class="todoForm">

        <input type="text" id="nom" v-model="nom"/>
        <label for="nom">Nom de la tâche</label>

        <br>

        <textarea id="description" v-model="description"/></textarea>
        <label for="description">Description de la tâche</label>

        <button type="button" @click="submitForm">Créer la tâche</button>
    </div>
</template>

<script>
    const axios = require('axios')
    export default {
        name: 'todoForm',
        data () {
        return {
            nom: '',
            description: '',
        }
    },
    methods: {
        submitForm () {
            var params = new URLSearchParams();
            params.append('nom', this.nom);
            params.append('description', this.description);
            axios.post('http://localhost:3000/addTodo/', params,{withCredentials : true})
                    .then(function (response) {
                        console.log(response);
                        if(response) {

                        }
                    })
        }
    }
    }
</script>