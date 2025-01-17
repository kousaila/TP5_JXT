const express = require('express')
const router = express.Router()
const checkAuth=require('../midlware/check-auth')

let usersModel = undefined

/* Control usermodel initialisation */
router.use((req, res, next) => {
  /* istanbul ignore if */
  if (!usersModel) {
    res
      .status(500)
      .json({message: 'model not initialised'})
  }
  next()
})

/* GET a specific user by id */
router.get('/:id',checkAuth, function (req, res, next) {
  const id = req.params.id

  /* istanbul ignore else */
  if (id) {
    try {
      const userFound = usersModel.get(id)
      if (userFound) {
        res.json(userFound)
      } else {
        res
          .status(404)
          .json({message: `User not found with id ${id}`})
      }
    } catch (exc) {
      /* istanbul ignore next */
      res
        .status(400)
        .json({message: exc.message})
    }

  } else {
    res
      .status(400)
      .json({message: 'Wrong parameter'})
  }
})

/* Add a new user. */
router.post('/', checkAuth, function (req, res, next) {
  const newUser = req.body

  /* istanbul ignore else */
  if (newUser) {
      usersModel
        .add(newUser)
        .then((user) => {
          res
            .status(201)
            .send(user)
        })
        .catch ((exc) => {
          res
            .status(400)
            .json({message: 'Error adding user'})
        })
  } else {
    res
      .status(400)
      .json({message: 'Wrong parameters'})
  }
})

/* Update a specific user */
router.patch('/:id',checkAuth,  function (req, res, next) {
  const id = req.params.id
  const newUserProperties = req.body

  /* istanbul ignore else */
  if (id && newUserProperties) {
      usersModel
        .update(id, newUserProperties)
        .then((updated) => {
          res
            .status(200)
            .json(updated)
        })
        .catch ((message) => {
          if (message === 'user.not.found') {
            res
              .status(404)
              .json({message: `User not found with id ${id}`})
          } else {
            res
              .status(400)
              .json({message: 'Invalid user data'})
          }
        })
  } else {
    res
      .status(400)
      .json({message: 'Wrong parameters'})
  }
})

/* REMOVE a specific user by id */
router.delete('/:id', checkAuth, function (req, res, next) {
  const id = req.params.id

  /* istanbul ignore else */
  if (id) {
    try {
      usersModel.remove(id)
      req
        .res
        .status(200)
        .end()
    } catch (exc) {
      /* istanbul ignore else */
      if (exc.message === 'user.not.found') {
        res
          .status(404)
          .json({message: `User not found with id ${id}`})
      } else {
        res
          .status(400)
          .json({message: exc.message})
      }
    }
  } else {
    res
      .status(400)
      .json({message: 'Wrong parameter'})
  }
})

/* GET all users */
router.get('/',checkAuth,  function (req, res, next) {
  res.json(usersModel.getAll())
})

/** return a closure to initialize model */
module.exports = (model) => {
  usersModel = model
  return router
}
