import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";
import { Todolist } from "../models/todoList.model.js";


const createTodo = AsyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const todoListId = req.params.todolist_id;

    if (!title.trim()) {
        throw new ApiError(400, "Title is required to create a todo");
    }

    const todo = await Todo.create({
        title,
        description: description || "",
        todoList_Id:todoListId //we are storing the id of todolist in which the todo is created for easy other crud operation
    });

    const createdTodo = await Todo.findById(todo._id);

    if (!createdTodo) {
        throw new ApiError(500, "Something went wrong while creating a todo");
    }

    const todoList = await Todolist.findById(todoListId);

    if (!todoList) {
        throw new ApiError(404, "Todo list not found");
    }

    todoList.todos.push(todo._id);
    await todoList.save();

    return res.status(201).json(new ApiResponse(201, createdTodo, "Todo created successfully"));
});

const updateTodo = AsyncHandler( async(req, res) =>{
    
    const { title, description} = req.body;

    if(!title.trim()){
        throw new ApiError(400, "new tile must be required to update it");
    }

    const id =req.params._id;

    if(!id){
        throw new ApiError(400, "id is required to update");
    }
    const todo = await Todo.findByIdAndUpdate(
        id,
        {
            $set:{
                title,
                description:description || ""
            }
        },
        {new:true}
    )
    if(!todo){
        throw new ApiError(500 ,"error while updating title of todo");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "todo update successfully")
    );
});

const updateTodoCompletion = AsyncHandler( async(req, res) =>{

    const {completed} = req.body;
    if(!completed){
        throw new ApiError(400, "first complete the todo");
    }
    const todo = await Todo.findByIdAndUpdate(
        req.params._id,
        {
            $set:{
                completed,
            }
        },
        {new:true}
    )
    if(!todo){
        throw new ApiError(500 ,"error while updating todo");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "todo update successfully")
    );

});

const getTodo = AsyncHandler( async(req, res)=>{

    const todo = await Todo.findById(req.params._id);
    if(!todo){
        throw new ApiError(404, "todo not found !!!");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "todo fetch successfully")
    )
});

const deleteTodo = AsyncHandler( async(req, res)=>{
    const id = req.params;
    if(!id){
        throw new ApiError(400, "id is needed to delete todo !!!");
    }

    const todo = await Todo.findByIdAndDelete(id);

    if(!todo){
        throw new ApiError(400, "todo not found or deleted !!!");
    }
    const todoList = await Todolist.findById(todo.todoList_Id);
    
    if (!todoList) {
        throw new ApiError(404, "Todo list not found.");
    }
    todoList.todos.pull(id);
    await todoList.save();

    return res.status(200).json(
        new ApiResponse(200, todo, "todo deleted successfully")
    )

});

export {
    createTodo,
    updateTodo,
    updateTodoCompletion,
    getTodo,
    deleteTodo
};