import express from "express";
import DynamicRoutes from "./dynamic";

import AdminRouters from "../../admin/routes";
import LogRouters from "../../log/routes";

const routers = express.Router();
routers.use(express.json());

routers.use("/admin", AdminRouters);
routers.use("/log", LogRouters);

DynamicRoutes(routers);

export default routers;
