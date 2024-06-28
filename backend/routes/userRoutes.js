//import the necessary packages
import express from "express";
import { 
    createUser, 
    loginUser, 
    logoutUser,
    getAllUsers 
} from '../controllers/userController.js'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

//create an instance of the express router
const router = express.Router()

//assign an address to the router
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);

export default router;