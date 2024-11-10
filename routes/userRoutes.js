const express = require("express");
const { route } = require("./contactRoutes");
const { registerUser, loginUser, currentUser, showUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current", validateToken,currentUser)
router.get("/allUser", showUser)

module.exports = router;

