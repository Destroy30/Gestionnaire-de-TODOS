class TodoList {
    constructor() {
        this.list = [];
    }
    addTodo(nom,description) {
        let todoToAdd = new Todo(this.getNextId(),nom,description);
        this.list.push(todoToAdd);
    }
    getTodo(id) {
        let index = this.getIndexOf(id);
        if(index==-1) {
            return false;
        }
        return this.list[index];
    }
    updateTodo(id,nom,description) {
        let todo = this.getTodo(id);
        if(!todo) {
            return false;
        }
        todo.nom = nom;
        todo.description=description;
        return true;

    }
    deleteTodo(id) {
        let todo = this.getTodo(id);
        if(!todo) {
            return false;
        }
        this.list.splice(index,1);
        return true;
    }
    getNextId() {
        if(this.list.length == 0) {
            return 0;
        }
        let lastTodo = this.list[this.list.length-1];
        return lastTodo.id+1;
    }
    getIndexOf(id) {
        let i=0;
        while(i<this.list.length && this.list[i].id!=id) {
            i++;
        }
        return i<this.list.length ? i : -1;
    }
    getNumberOfTodos() {
        return this.list.length;
    }
    getAllTodosByLimit(offset=0,size = 6) {
        let limit = ((offset+size)>this.list.length) ? this.list.length :  offset+size;
        return this.list.slice(offset,limit);
    };
}

class Todo  {
    constructor(id,nom,description) {
        this.id = id;
        this.nom = nom;
        this.description = description;
    }
}


module.exports = {
    TodoList : TodoList,
    Todo : Todo,
};
