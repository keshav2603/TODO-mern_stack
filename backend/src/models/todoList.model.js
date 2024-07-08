import {mongoose, Schema}from "mongoose";

const todoListSchema = new Schema(
    {
        title:{
            type:String,
           required:true
         },
         description:{
             type:String,
             default:""
         },
        todo:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Todo"
            }
        ],
    },
    {
        timestamps:true
    }
);

export const Todolist = mongoose.model("Todolist", todoListSchema);