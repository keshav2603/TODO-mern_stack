import {Router} from "express";
import {
    createTodo,
    updateTodoTitle,
    updateTodoDescription,
    updateTodoCompletion,
    getTodo,
    deleteTodo
} from "../controllers/todo.controller.js";

const router = Router();
router.route("/create-todo").post(createTodo);
router.route("/update-title").post(updateTodoTitle);
router.route("/update-description").post(updateTodoDescription);
router.route("/update-completion").post(updateTodoCompletion);
router.route("/get-todo").get(getTodo);
router.route("/delete-todo").post(deleteTodo);

export default router;