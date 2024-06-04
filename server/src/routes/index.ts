import * as express from "express"
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ContentController";
import authMiddleware from '../middlewares/auth'
import uploadFile from "../middlewares/uploadFile";

const router = express.Router()

//auth
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)

//product
router.post("/content", authMiddleware.auth, uploadFile.upload("image") , ProductController.create)
router.get("/contents", ProductController.getAll)
router.get("/content/:id", ProductController.get)
router.patch("/content/:id", authMiddleware.auth, uploadFile.upload("image"), ProductController.update)
router.delete("/content/:id", authMiddleware.auth, ProductController.delete)
export default router;