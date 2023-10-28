import { Router } from "express";
import customerRouter from "./customer/route.js";
const router = Router();

router.use("/app", customerRouter);

export default router;
