const express = require("express");
const router = express.Router();
const CheckAuth = require("../middleware/check-auth");
const RequestController = require("../controllers/request");

//INDEX, USADA POR USUARIOS
router.get("/", CheckAuth.checkAuth, RequestController.requests_get_all);

//POST
router.post("/", CheckAuth.checkAuth, RequestController.request_create);

//UPDATE
router.put("/:id", CheckAuth.checkAdmin, RequestController.request_update);

//DELETE
router.delete("/:id", CheckAuth.checkDelete, RequestController.request_delete);

//GET USER REQUEST, USADA POR ADMIN
router.get("/search-user-requests/:userId", CheckAuth.checkAdmin, RequestController.search_user_requests);

//Get All Requests, USADA POR ADMIN
router.get("/search-all-requests", CheckAuth.checkAdmin, RequestController.search_all_requests);

//Delete 
module.exports = router;