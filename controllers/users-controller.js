const { v4: uuidv4 } = require("uuid")
const HttpError = require("../models/http-error")

const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "password",
  },
]

const signup = (req, res, next) => {
  const { name, email, password } = req.body
  const hasUser = DUMMY_USERS.find((u) => u.email === email)

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422)
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  }

  DUMMY_USERS.push(createdUser)

  res.status(201).json({ user: createdUser })
}

const signin = (req, res, next) => {
  const { email, password } = req.body
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email)

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401,
    )
  }

  res.json({ message: "Sign In success." })
}

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS })
}

exports.signup = signup
exports.signin = signin
exports.getUsers = getUsers
