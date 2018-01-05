import Vue from 'vue'
import Router from 'vue-router'
import TodosList from '@/components/TodosList'
import createTodo from '@/components/createTodo'
import updateTodo from '@/components/updateTodo'
import page from '@/components/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: page
    },
    {
      path: '/page/:page',
      name: 'content',
      component: page,
      props:true
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
    },
    {
      path: '*',
      component: page
    }
  ]
})
