const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const CheckAuth = require("../middleware/check-auth");

router.post("/signup", UserController.user_signup);

router.post("/signin", UserController.user_signin);

router.get("/search-users", CheckAuth.checkAdmin, UserController.search_users);

router.get("/:id", CheckAuth.checkAdmin, UserController.search_user_id);

router.put("/:id", CheckAuth.checkAdmin, UserController.edit_user);

router.delete("/:id", CheckAuth.checkAdmin, UserController.delete_user);

module.exports = router;