import { Router } from "express";
import userRoutes from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";
const appRouter = Router();
// ROUTE 1: domain/api/v1/user
appRouter.use("/user", userRoutes);
// ROUTE 2: domain/api/v1/chats
appRouter.use("/chats", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map