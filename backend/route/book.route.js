import express from 'express';
import { getBook, addBook, updateBook, deleteBook , getCategories , addReview , getSingleBook} from '../controller/book.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", authMiddleware, addBook);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

router.get(
  "/categories",
  getCategories
);

router.get(
  "/:bookId",
  getSingleBook
);


router.post(
  "/:bookId/review",
  addReview
);


export default router;

