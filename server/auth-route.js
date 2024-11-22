const express = require("express");
const router = express.Router();
const authControllers = require("../server/auth-controller.js");
const validate = require("../server/validate-middleware.js");
const {signupSchema, loginSchema} = require("../server/auth-validator.js");

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);
module.exports = router;