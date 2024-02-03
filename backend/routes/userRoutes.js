const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
  getAllUsersForBooks
} = require("../controllers/userController.js");
const { requireLogin, isAdmin, isWorker } = require("../middlewares/auth");


const router = express.Router();

router.get("/all-users-books", requireLogin, getAllUsersForBooks);

router.get("/all-users", requireLogin, isWorker, getAllUsers);
router.get("/get-user/:id", requireLogin, isWorker, getUserByIdController);
router.patch("/update-user/:id", requireLogin, isWorker, updateUserController);
router.delete("/delete-user/:id", requireLogin, isWorker, deleteUserController)


router.post("/register", registerController);
router.post("/login", loginController);


module.exports = router;