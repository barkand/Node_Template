import express from "express";
import dotenv from "dotenv";

import setMiddleware from "./core/middleware";
import routers from "./core/routes";
import ConnectToDatabase from "./core/database";
import logger from "./log";

dotenv.config();
const app = express();

setMiddleware(app);

app.use("/api", routers);

ConnectToDatabase();

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`Server is listening on port ${process.env.SERVER_PORT}`);
});

export default app;
