import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";
import {Todolist} from "../models/todoList.model.js";

const createTodoList = AsyncHandler( async(req, res) =>{
    
    const {title} = req.body;
    if(!title){
        throw new ApiError(400, "title is required !!!");
    }
     const todoList = Todolist.create({
        title,
     });
     

});