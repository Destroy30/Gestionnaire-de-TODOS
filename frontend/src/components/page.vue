<template>
    <div class="page">
        <TodosList @noData="backToContentPage()" @deletedLastElement="deletedLastElement()" @update="loadData()" :page="page" :key="page"></TodosList>
        <router-link v-for="n in (totalPage)" :key="n" :to="'/page/' + n"><button class="btn btn-default">{{ n }}</button></router-link>
    </div>
</template>

<script>

    /**
     * Ce component définie une "page" du site, c'est à dire un composant contenant une liste de todos
     * Elle va calculer, selon le numéro de la page, le offset de todos à récupérer
     * Elle va egalement calculer préalablement le nombre de todos qu'il est possible d'afficher sur une page
     */

    import TodosList from '@/components/TodosList'
    const axios = require('axios')
    import router from '../router'

    export default {
        name: 'page',
        props : [
            'page'
        ],
        components: {
            TodosList,
        },
        data () {
        return {
                totalPage: 1
            }
        },
        methods : {
            loadData() {
                axios.get('http://localhost:3000/todosSize/',{withCredentials: true})
                        .then(response => {
                    let totalSize=(response.data.todoSize); //Nombre de todos disponnibles
                    this.totalPage = 1+parseInt((totalSize-1)/6);}); //Nombre de todos qui devront être affichées sur la page
            },
            /**
             * Si jamais l'élément supprimé est le dernier de la liste, on reviens une page en arrière
             */
            deletedLastElement() {
                this.loadData();
                if(this.page>1) {
                    var previousPage=this.page-1;
                    router.push("/page/"+previousPage);
                }
            },
            /**
             * Si jamais il n'y a pas de données à afficher, on reviens sur la page pricnipale (page une) sauf si on y est déjà
             */
            backToContentPage() {
                if(this.page>1) {
                    router.push("/");
                }
            }
        },
        created () {
            this.loadData();
        },

    }

</script>