<template>
    <div class="row todoElmt" >
        <div class="col-lg-6 col-lg-offset-3 btn-group list-group-item itemTodoGroup" role="group">
            <button class="col-lg-10 btn btn-default" @click="openModal" type="button" data-toggle="modal" :data-target="'#modal-todo-'+id" :data-idTodo="id">{{ nom }}</button>
            <div class="col-lg-1"><router-link :to="'/updateTodo/'+id"><button class="btn btn-warning glyphicon glyphicon-pencil"></button></router-link></div>
            <div class="col-lg-1"><button class="btn btn-danger glyphicon glyphicon-remove" @click="deleteSelf"></button></div>
            <sweet-modal :title="nom" :ref="'modal-todo-'+id">{{ description }}</sweet-modal>
        </div>
    </div>
</template>

<script>

    /**
     * Cette classe va permettre l'affichage d'une todo
     * De base, il s'agit simplement d"une ligne avec le nom de la todo
     * Des boutons sont également mis à disposition pour modifier, supprimer la todo...
     * Le clic sur la todo, va ouvrir une modal pour présenter le contenu en détail
     */

    import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
    const axios = require('axios')

    export default {
        name: 'todo',
        components: {
            SweetModal,
            SweetModalTab
        },
        props: [
            'id',
            'nom',
            'description',
        ],
        methods : {
            /**
             * Peremet d'ouvrir une modal présentant le contenu de la todo en détail
             */
            openModal() {
                var ref = "modal-todo-" + this.id
                this.$refs[ref].open();
            },
            /**
             * Permet à la todo de se supprimer
             */
            deleteSelf() {
                var params = new URLSearchParams();
                params.append('id', this.id);
                axios.post('http://localhost:3000/deleteTodo/', params,{withCredentials : true})
                        .then(response => {
                            if(response.data) {
                                this.$emit('deleteTodo'); //On informe la liste que la todo vient d'être supprimée
                            }
                        })
            }
        }
    }
</script>

