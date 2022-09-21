import express from 'express'
import { login, isAuth, logout } from "../controllers/authController.js"
import { consultarUser, guardarUser, borrarUser } from "../controllers/userController.js"
import { consultarRol, guardarRol, borrarRol } from "../controllers/rolController.js"
import { consultarMenu, consultarMenuRol, consultarMenuModulo, guardarMenu, borrarMenu } from "../controllers/menuController.js"

const router = express.Router()

router.post('/login', login)
router.post('/isAuth', isAuth)
router.post('/logout', logout)

router.get('/users', consultarUser)
router.get('/users/:pid', consultarUser)
router.post('/users', guardarUser)
router.put('/users/:pid', guardarUser)
router.delete('/users/:pid', borrarUser)

router.get('/menu', consultarMenu)
router.get('/menu/:pid', consultarMenu)
router.get('/menurol/:pid', consultarMenuRol)
router.get('/menumodulo', consultarMenuModulo)
router.post('/menu', guardarMenu)
router.put('/menu/:pid', guardarMenu)
router.delete('/menu/:pid', borrarMenu)

router.get('/roles', consultarRol)
router.get('/roles/:pid', consultarRol)
router.post('/roles', guardarRol)
router.put('/roles/:pid', guardarRol)
router.delete('/roles/:pid', borrarRol)

export default router