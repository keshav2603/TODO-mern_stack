import {Router} from "express";
import {
    createTodo,
    updateTodo,
    updateTodoCompletion,
    getTodo,
    deleteTodo
} from "../controllers/todo.controller.js";
import {
    createTodoList,
    updateTodoList,
    deleteTodoList,
    getTodoList 
} from "../controllers/todoList.controller.js"
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();


// Todo Routes
router.route("/todo/:todolist_id")
    .post(createTodo);

router.route("/todo/:_id")
    .put(updateTodo)
    .patch(updateTodoCompletion)
    .get(getTodo)
    .delete(deleteTodo);

// TodoList Routes
router.route("/todolist")
    .post(verifyJWT, createTodoList);

router.route("/todolist/:_id")
    .put(updateTodoList)
    .delete(deleteTodoList)
    .get(getTodoList);

// User Routes
router.route("/register")
    .post(registerUser);

router.route("/login")
    .post(loginUser);

router.route("/logout")
    .post(verifyJWT, logoutUser);

router.route("/get-user")
    .post(verifyJWT, logoutUser);

// Refresh Token Route
router.route("/refresh-token")
    .post(refreshAccessToken);


export default router;