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
    .post(verifyJWT, createTodo);

router.route("/todo/:_id")
    .put(verifyJWT, updateTodo)
    .patch(verifyJWT, updateTodoCompletion)
    .get(verifyJWT, getTodo)
    .delete(verifyJWT, deleteTodo);

// TodoList Routes
router.route("/todolist")
    .post(verifyJWT, createTodoList);

router.route("/todolist/:_id")
    .put(verifyJWT, updateTodoList)
    .delete(verifyJWT, deleteTodoList)
    .get(verifyJWT, getTodoList);

// User Routes
router.route("/register")
    .post(registerUser);

router.route("/login")
    .post(loginUser);

router.route("/logout")
    .post(verifyJWT, logoutUser);

router.route("/get-user")
    .get(verifyJWT, logoutUser);

// Refresh Token Route
router.route("/refresh-token")
    .post(verifyJWT, refreshAccessToken);


export default router;