import { Router } from "express";
import userRouter from "./userRoutes.js";
import chatRouter from "./chatRoutes.js";
const router = Router();
// APP ROUTE 1: Related to the user : /api/v1/user
router.use("/user", userRouter);
// APP ROUTE 2: Related to the chats : /api/v1/chats
router.use("/chats", chatRouter);
export default router;
//# sourceMappingURL=index.js.map