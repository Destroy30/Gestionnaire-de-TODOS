<template>
    <div class="todos">
        <h1>Liste des tâches  en cours</h1>
        <br>
        <div class="btn-group">
            <router-link to="addTodo"><button type="button" class="btn btn-primary btn-lg">Ajouter une tâche</button></router-link>
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
            }
        },
        created () {
            axios.get('http://localhost:3000/listTodos/',{withCredentials: true})
                    .then(response => {
                        console.log(response);
                        this.todos=response.data;});
        }
    }
</script>