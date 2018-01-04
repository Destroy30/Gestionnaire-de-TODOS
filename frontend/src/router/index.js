import Vue from 'vue'
import Router from 'vue-router'
import TodosList from '@/components/TodosList'
import createTodo from '@/components/createTodo'
import updateTodo from '@/components/updateTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodosList',
      component: TodosList
    },
    {
      path: '/addTodo',
      name: 'createTodo',
      component: createTodo
    },
    {
      path: '/updateTodo/:id',
      name: 'updateTodo',
      props: true,
      component: updateTodo
    }
  ]
})
