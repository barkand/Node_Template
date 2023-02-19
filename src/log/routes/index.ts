import express from "express";

import logController from "../controllers/prom";
import clientController from "../controllers/client";

const LogRouters = express.Router();
LogRouters.use(express.json());

LogRouters.get(`/metrics`, logController.prom);
LogRouters.use(`/client`, clientController.log);

export default LogRouters;
