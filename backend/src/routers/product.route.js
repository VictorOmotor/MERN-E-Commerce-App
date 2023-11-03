import { Router } from "express"
import ProductController from "../controllers/product.controller.js";
import { tryCatchHandler } from '../utils/tryCatch.handler.js'
import { adminAuthMiddleWare, userAuthMiddleWare } from "../middlewares/auth.middleware.js";




const router = Router()

router.post("/create", userAuthMiddleWare, adminAuthMiddleWare, tryCatchHandler(ProductController.createProduct) )
router.get("/", tryCatchHandler(ProductController.getProducts) )
router.get("/:id", tryCatchHandler(ProductController.getProduct) )
router.delete("/:id", userAuthMiddleWare, adminAuthMiddleWare, tryCatchHandler(ProductController.deleteProduct) )
router.put("/:id", userAuthMiddleWare, adminAuthMiddleWare, tryCatchHandler(ProductController.updateProduct) )
router.put("/review/:id", userAuthMiddleWare, tryCatchHandler(ProductController.reviewProduct) )
router.delete("/deletereview/:id", userAuthMiddleWare, tryCatchHandler(ProductController.deleteReview) )
router.put("/updatereview/:id", userAuthMiddleWare, tryCatchHandler(ProductController.updateReview) )




export { router }
