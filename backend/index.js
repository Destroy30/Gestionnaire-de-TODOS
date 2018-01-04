var todoManager = require('./todos/todosManager');
var TodoList = todoManager.TodoList;

var express = require('express');
var cors = require('cors');

var session = require('express-session');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : false});

var app=express();


app.use(cors({credentials: true, origin: true}));

app.options('*', cors());

app.use(session({
    secret: 'token'
}));

app.use(function(req, res, next) {
    next();
});

app.use(function (req, res, next) {
    //si la liste n'est pas encore crée
    if(!req.session.todoList) {
        req.session.todoList = new TodoList();
    }
    Object.setPrototypeOf(req.session.todoList,TodoList.prototype);
    next();
});

app.get('/listTodos', function(req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.session.todoList.getAllTodosByLimit());
});

app.get('/listTodos/:offset/:size', function(req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.session.todoList.getAllTodosByLimit(req.params.offset,req.params.size));
});

app.post('/addTodo',urlEncodedParser,function(req,res) {
    let nomTodo = req.body.nom;
    let descriptionTodo = req.body.description;
    res.setHeader('Content-Type', 'application/json');
    req.session.todoList.addTodo(nomTodo,descriptionTodo);
    res.send(true);
});

app.get('/getTodo/:id', function(req,res) {
    let todo = req.session.todoList.getTodo(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.send(todo);
});

app.post('/updateTodo',urlEncodedParser,function(req,res) {
    let id = req.body.id;
    let nomTodo = req.body.nom;
    let descriptionTodo = req.body.description;
    let result = req.session.todoList.updateTodo(id,nomTodo,descriptionTodo);
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

app.post('/deleteTodo/',urlEncodedParser,function(req,res) {
    let id = req.body.id;
    let result = req.session.todoList.deleteTodo(id);
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

app.listen(3000, function() {
    console.log('API de gestion de todos lancée!');
});