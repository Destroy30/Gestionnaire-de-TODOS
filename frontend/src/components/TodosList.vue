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

            deleteTodos(id)
            {
                let i=0;
                while(i<this.todos.length && this.todos[i].id!=id) {
                    i++;
                }
                this.todos.splice(i,1);
                this.loadData();
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
                                this.$emit("noData");
                            }
                        });
            }
        },
        created () {
            this.loadData();
        }
    }
</script>