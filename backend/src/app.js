import express from "express";
import router from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/todo", router)



export {app};