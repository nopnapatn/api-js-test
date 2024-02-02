const express = require("express")
const { check } = require("express-validator")
const router = express.Router()
const usersController = require("../controllers/users-controller")

router.get("/", usersController.getUsers)

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup,
)
router.post("/signin", usersController.signin)

module.exports = router
