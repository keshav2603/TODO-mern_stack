import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";

const createTodo = AsyncHandler( async(req, res) =>{
    
    const { title,  description } = req.body;

    if(title.trim()===''){
        throw new ApiError(400, "Tile is required to create a todo !!!");
    }

    const todo = await Todo.create({
        title,
        description: description || ""
    });

    const createdTodo = await Todo.findById(todo._id);

    if(!createdTodo){
        throw new ApiError(500, "something went wrong while creating a todo");
    }

    return res.status(201)
    .json( new ApiResponse(200, createdTodo, "todo created successfully"));
});

const updateTodoTitle = AsyncHandler( async(req, res) =>{
    
    const { title } = req.body;

    if(title.trim()===""){
        throw new ApiError(400, "new tile must be required to update it !!!");
    }
    const id =req.todo?._id;
    if(!id){
        throw new ApiError(400, "id is required to update");
    }
    const todo = await Todo.findByIdAndUpdate(
        id,
        {
            $set:{
                title
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

const updateTodoDescription = AsyncHandler( async(req, res) =>{
    
    const { description } = req.body;

    const todo = await Todo.findByIdAndUpdate(
        req.todo?._id,
        {
            $set:{
                description:description || ""
            }
        },
        {new:true}
    )
    if(!todo){
        throw new ApiError(500 ,"error while updating description of todo");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "todo update successfully")
    );
});

const updateTodoCompletion = AsyncHandler( async(req, res) =>{

    const {completed} = req.body;
    if(!completed){
        throw new ApiError(400, "first complete the todo!!!");
    }
    const todo = await Todo.findByIdAndUpdate(
        req.todo?._id,
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

    const todo = await Todo.findById(req.todo._id);
    if(!todo){
        throw new ApiError(400, "todo not found !!!");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "todo fetch successfully")
    )
});

const deleteTodo = AsyncHandler( async(req, res)=>{
    const {id} = req.todo._id;
    if(!id){
        throw new ApiError(400, "id is needed to delete todo !!!");
    }

    const todo = await Todo.findByIdAndDelete(id);
    if(!todo){
        throw new ApiError(400, "todo not found or deleted !!!");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "todo deleted successfully")
    )

});

export {
    createTodo,
    updateTodoTitle,
    updateTodoDescription,
    updateTodoCompletion,
    getTodo,
    deleteTodo
};