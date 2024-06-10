import express from "express";
import {Register, getUser, login, logout} from '../controllers/userController.js'
import {isAuthorized} from "../middlewaers/auth.js"

const router = express.Router();

router.post("/register" , Register)
router.post("/login" , login);
router.get("/logout" , isAuthorized , logout);
router.get("/getUser", isAuthorized ,getUser);

export default router; 
