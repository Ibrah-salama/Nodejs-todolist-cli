const { Console } = require('console');
const fs = require('fs');
const path = './todo.json'

/*Check if The todo file exists */
function checkFileExistence(){
    if(fs.existsSync(path)){
        console.log('todo exists')
    }else {
        fs.writeFileSync('./todo.json',JSON.stringify([]))
    }
}

/*Read tod */
function readTodo(){
    fs.readFileSync('./todo.json');
    todolist = JSON.parse(fs.readFileSync('./todo.json'))
    return todolist;
}
function writeTodo(todolist){
    fs.writeFileSync('./todo.json',JSON.stringify(todolist))
}

/* ADD Todo */
var addTodo = function(args){
    todolist = readTodo()
    if (todolist.length==0) {
        const todo = {
            todoId:1,
            title: args[3],
            body: args[4],
            completed:false
        }
        todolist.push(todo)
        writeTodo(todolist)
    }else{
        const todo = {
            todoId:todolist[todolist.length-1].todoId+1,
            title: args[3],
            body: args[4],
            completed:false
        }
        todolist.push(todo);
        writeTodo(todolist)
    }
    console.log("addTodo")
}

/* Edit Todo */
var editTodo = function(args){
    let id = args[3];
    let todolist = readTodo();
    console.log(todolist)
    if(todolist[id-1].todoId == id){
        for(let i=0;i<args.length; i++){
            switch(i){
                case 4:
                    todolist[id-1].title = args[4]
                case 5:
                    todolist[id-1].body = args[5]
            }
        }
        writeTodo(todolist)
    }else{
        console.log('not exisit')
    }
}

/* Remove Todo */
var removeTodo = function(args){
    console.log("DELETING TODO: Make sure you enterd the right index")
    const todolist = readTodo()
    let id = parseInt(args[3])
    if(id && todolist.length>=id){
        if(todolist[id-1].todoId=id){
            todolist.splice(id-1,1)
            console.log(`Todo ${id} deleted successfully`)
        }
    }else{
        console.log('todo does not exist')
    }
    writeTodo(todolist)
}

/* List Completed Todo */
var checkTodo = function(args){
    let todolist = readTodo();
    let todoId = args[3];
    if(todoId && todolist.length>=todoId){
        let todo = todolist.findIndex((todo)=>{ 
            return todo.todoId == todoId
            })
        todolist[todo].completed='true'
        writeTodo(todolist)
    }else{
        console.log('Please Enter a valid todo ID')
    }
}

/* List Uncompleted Todo */
var uncheckTodo = function(args){
    let todolist = readTodo();
    let todoId = args[3];
    if(todoId && todolist.length>=todoId){
        let todo = todolist.findIndex((todo)=>{ 
            return todo.todoId == todoId
            })
        todolist[todo].completed='false'
        writeTodo(todolist)
    }else{
        console.log('Please Enter a valid todo ID')
    }
}

/* List todolist */
var listTodo = function(args){
    let todolist =readTodo();
    console.log('List todo')
    for(let todo of todolist){
        console.log(`[${todo.todoId}] Tilte: ${todo.title} -> Subject: ${todo.body} -> Status ${todo.completed}`);
    }
}

/*List completed todos */
var listCompletedTodo = function(args){
    const todolist = readTodo();
    let checked = todolist.filter((todo)=>{
        if(todo.completed=='true'){
            return todo
        }
    })
    console.log(checked)
}

/*List uncompleted todos */
var listUnCompletedTodo = function(args){
    const todolist = readTodo();
    let unchecked = todolist.filter((todo)=>{
        if(todo.completed=='false'){
            return todo
        }
    })
    console.log(unchecked)
}

module.exports = {
addTodo,
editTodo,
removeTodo,
checkTodo,
uncheckTodo,
listTodo,
listCompletedTodo,
listUnCompletedTodo,
}
