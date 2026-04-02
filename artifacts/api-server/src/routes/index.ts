import { Router, type IRouter } from "express";
import healthRouter from "./health";
import siteDataRouter from "./site-data";
import contactMessagesRouter from "./contact-messages";
import projectRequestsRouter from "./project-requests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(siteDataRouter);
router.use(contactMessagesRouter);
router.use(projectRequestsRouter);

export default router;
