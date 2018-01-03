<template>
    <div class="todos">
        <ul>
        <todo v-for="(todo) in todos" :nom="todo.nom"></todo>
        </ul>
    </div>
</template>

<script>
    import todo from '@/components/todo'
    const axios = require('axios')

    export default {
            name: 'TodosList',
            components: {
                todo
            },
            // Ici, les données de notre composant
            data () {
            return {
                todos: [

                ]
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