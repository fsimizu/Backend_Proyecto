import express from "express";
import { productsApiController } from '../controllers/products.api.controller.js';
import { isAdmin, canCreate } from "../middlewares/auth.js";
import { uploader } from "../utils/multer.js";
export const productsApiRouter = express.Router();

productsApiRouter.get('/', productsApiController.getAll)
productsApiRouter.post('/', canCreate, productsApiController.postOne);
productsApiRouter.get('/:pid', productsApiController.getOne)
productsApiRouter.put('/:pid', isAdmin, productsApiController.editOne);
productsApiRouter.delete('/:pid', canCreate, productsApiController.deleteOne);
productsApiRouter.post('/:pid/photo', uploader.array("products"), productsApiController.uploadPhoto);