import {mongoose, Schema}from "mongoose";

const todoListSchema = new Schema(
    {
        title:{
            required:true,
            type:String,
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