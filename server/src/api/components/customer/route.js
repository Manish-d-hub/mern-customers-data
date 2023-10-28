import { Router } from "express";
import {
  getAccIds,
  getAccTransactions,
  getAllCustomers,
  getAllProducts,
} from "./controller.js";

const router = Router();

router.get("/customers", getAllCustomers);
router.get("/acc-transactions", getAccTransactions);
router.get("/get-acc-ids", getAccIds);
router.get("/products", getAllProducts);

export default router;

// {
//   "stock": "GOOGL",
//   "date": "2023-09-01"
// }
