<template>
    <div class="todos">
        <h1>Liste des tâches  en cours</h1>
        <br>
        <div class="btn-group">
            <router-link to="/addTodo"><button type="button" class="btn btn-primary btn-lg">Ajouter une tâche</button></router-link>
        </div>
        <div class="container list-group">
            <todo v-for="(todo) in todos"  @deleteTodo="deleteTodos(todo.id)" :key="todo.id" :id="todo.id" :nom="todo.nom" :description="todo.description"></todo>
        </div>
    </div>
</template>

<script>
    /**
     * Ce composant va gérer une liste de todos, selon une page donnée (c'est à dire, une ifnormation sur les todos qui doivent être affichées)
     * Elle va donc être appellée par un composant page
     * La TodoList va présenter divers comportements, lors de la supression d'une todo par exemple
     */

    import todo from '@/components/todo'
    const axios = require('axios')

    export default {
            name: 'TodosList',
            components: {
                todo,
            },
            props : [
                'page'
            ],
            data () {
            return {
                    todos: [

                    ]
                }
            },
        methods: {
            /**
             * Methode de supression d'une todo par un id
             */
            deleteTodos(id)
            {
                //On supprime da ltodo de l'affichage de la liste
                let i=0;
                while(i<this.todos.length && this.todos[i].id!=id) {
                    i++;
                }
                this.todos.splice(i,1);
                this.loadData();
                //Si jamais il n'y a plus de todos à afficher, on previens la page (le composant) pour changer de page (revenir une page en arrière)
                if(this.todos.length==0) {
                    this.$emit('deletedLastElement');
                }
                else {
                    this.$emit('update');
                }
            },
            loadData() {
                var offset = (this.page!==undefined && this.page>=1) ? (this.page-1)*6 : 0;
                var link = "http://localhost:3000/listTodos/" + (offset)+"/6";
                axios.get(link,{withCredentials: true})
                        .then(response => {
                            this.todos=response.data;
                            if(this.todos.length==0) {
                                this.$emit("noData"); //Si n'ya pas de données à afficher, on previens le composant supérieur
                            }
                        });
            }
        },
        created () {
            this.loadData();
        }
    }
</script>