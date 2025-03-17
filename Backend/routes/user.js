const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const userController=require("../controllers/user");
const authMiddleware=require("../middlewares/auth");


// Register route
router.post("/register",[
	body('email').isEmail().withMessage("Invalid Email"),
	body('fullname.firstname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
	body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], userController.registerUser);


// login route
router.post('/login', [
	body('email').isEmail().withMessage('Invalid Email'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
	userController.loginUser
)

// userProfile route
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);


router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports=router;



