import express from "express";
import router from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/todo", router);

export { app };
