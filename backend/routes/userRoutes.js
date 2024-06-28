//import the necessary packages
import express from "express";
import { createUser, loginUser, logoutUser } from '../controllers/userController.js'

//create an instance of the express router
const router = express.Router()

//assign an address to the router
router.route('/').post(createUser);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);

export default router;