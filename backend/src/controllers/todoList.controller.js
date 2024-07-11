import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";
import {Todolist} from "../models/todoList.model.js";
import { User } from "../models/user.model.js";

const createTodoList = AsyncHandler( async(req, res) =>{
    
    // 1.take the  data from req body like tile, discription
    // 2.take user id from req.user {if user is authorised he is attached with the req with help of middleware}
    // 3. add that new created todolist to array of todolist that user have 
    const {title, description} = req.body
    if(title.trim() ===""){
       throw new ApiError(400, "title is required to create a todlist");
    }
    const user =await User.findById(req.user?._id);

    if(!user){
        throw new ApiError(400, "user not authenticated");
    }
    const todoList = await Todolist.create({
        title,
        description: description || ""
    })
    
    if (!todoList) {
        throw new ApiError(500, "Error while creating todo list");
    }

    user.todoWork.push(todoList._id);
        await user.save();

    return res.status(200)
    .json( new ApiResponse(200, createdTodoList, "todolist created successfully"))
});

const updateTodoList = AsyncHandler( async(req, res)=>{
    const {title, description} = req.body
    if(title.trim()===""){
        throw new ApiError(400, " new title is required to update")
    }

    if(description.trim()===""){
        throw new ApiError(400, "new description is required to update");
    }
    const todoListId = req.params.id;
    if(!todoListId){
        throw new ApiError(400, "todolist id is required");
    }

    const todoList = await Todolist.findByIdAndUpdate(todoListId,
        {
            title,
            description: description || ""
        }
    )

    if(!todoList){
        throw new ApiError(500, "error while updating the todolist")
    }
    
    return res.status(200)
    .json(new ApiResponse(200,todoList, "todolist updated successfully"))

})





export {
    createTodoList,
    updateTodoList,
    
}

