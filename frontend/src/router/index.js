import Vue from 'vue'
import Router from 'vue-router'
import TodosList from '@/components/TodosList'
import todoForm from '@/components/todoForm'

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
      name: 'todoForm',
      component: todoForm
    }
  ]
})
