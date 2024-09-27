const router = require("express").Router();
const authController = require("./authController");

router.post("/login", authController.loginController);
router.get("/refresh", authController.refrshAcessTokenController);

module.exports = router;
