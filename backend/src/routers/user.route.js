import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import { tryCatchHandler } from '../utils/tryCatch.handler.js'
import { userAuthMiddleWare } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', tryCatchHandler(UserController.registerUser))
router.post('/login', tryCatchHandler(UserController.loginUser))
router.get(
  '/logout',
  tryCatchHandler(UserController.logout),
)
router.get('/:id', userAuthMiddleWare, tryCatchHandler(UserController.getUser))
router.get('/loginstatus', tryCatchHandler(UserController.getLoginStatus))

router.put(
  '/profile/:id',
  userAuthMiddleWare,
  tryCatchHandler(UserController.updateUserInfo),
)

router.put("/profile/photo", userAuthMiddleWare, tryCatchHandler(UserController.updateUserPhoto));
router.delete('/deleteall', tryCatchHandler(UserController.deleteAll))
router.delete(
  '/deleteuser/:id',
  userAuthMiddleWare,
  tryCatchHandler(UserController.deleteUser),
)

export { router }
