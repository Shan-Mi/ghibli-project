import express from "express";
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  sendVerifyEmail,
  verifyEmail,
} from "../controllers/authController.js";
import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getOneUser,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUser,
  updateMe,
} from "../controllers/userController.js";

const router = express.Router();

// all endpoints that can get accessed by both users and admin
// after signup, we should send verification email,
// and any user whose email address has not been verified
// will be re-direct to send verification page if they tried to login
router.post("/signup", signup);
router.post("/verifyEmail", sendVerifyEmail);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// protect all routes that come after this endpoint,
// user has to be logged in to continue next middleware
router.use(protect);

// don't show below info to public
router.patch("/updateMyPassword", updatePassword);

// by getMe, we get current user's id,
// then pass it to req.params.id, then reuse getUser
router.get("/me", getMe, getOneUser);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);

// as a user, you can only change show status,
// cannot really delete yourself
// FIXME:this endpoint only works on postman now
router.patch("/deleteMe", deleteMe);

// can only run by admin user
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);
// as an admin, you can really delete any user's data from db,
// cannot retrieve again.
export default router;
