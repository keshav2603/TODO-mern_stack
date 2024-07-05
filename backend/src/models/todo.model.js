import {mongoose, Schema}from "mongoose";

const todoSchema = new Schema(
    {
        title:{
           type:String,
          required:true
        },
        description:{
            type:String,
            default:""
        },
        completed:{
            type:Boolean,
            default:false,
        }
    },
    {
        timestamps:true
    }
);

export const Todo = mongoose.model("Todo", todoSchema);