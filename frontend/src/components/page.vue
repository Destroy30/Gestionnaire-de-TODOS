<template>
    <div class="page">
        <TodosList @noData="backToContentPage()" @deletedLastElement="deletedLastElement()" @update="loadData()" :page="page" :key="page"></TodosList>
        <router-link v-for="n in (totalPage)" :to="'/page/' + n"><button class="btn btn-default">{{ n }}</button></router-link>
    </div>
</template>

<script>

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
                    let totalSize=(response.data.todoSize);
                    this.totalPage = 1+parseInt((totalSize-1)/6);});
            },
            deletedLastElement() {
                this.loadData();
                if(this.page>1) {
                    var previousPage=this.page-1;
                    router.push("/page/"+previousPage);
                }
            },
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