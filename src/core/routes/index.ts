import express from "express";
import { existsSync } from "fs";

import AdminRouters from "../../admin/routes";
import LogRouters from "../../log/routes";

const routers = express.Router();
routers.use(express.json());

routers.use("/admin", AdminRouters);
routers.use("/log", LogRouters);

const marketPath = "../../market";
if (existsSync(marketPath)) {
  const MarketRouters = require(`${marketPath}/routes`);
  routers.use("/market", MarketRouters);
}

const gamePath = "../../game";
if (existsSync(gamePath)) {
  const GameRouters = require(`${gamePath}/routes`);
  routers.use("/game", GameRouters);
}

export default routers;
