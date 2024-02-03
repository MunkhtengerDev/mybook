const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController.js");
const { requireLogin, isAdmin, isWorker } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/all-users", getAllUsers);

router.get("/admin-auth", requireLogin, isAdmin, (req, res) => res.status(200).send({ ok: true }));
router.get("/user-auth", requireLogin, (req, res) => res.status(200).send({ ok: true }));
router.get("/worker", requireLogin, isWorker, (req, res) => res.status(200).send({ ok: true }));



 router.post("/register", registerController);
 router.post("/login", loginController);

module.exports = router;