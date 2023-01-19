import express from "express";

import AdminRouters from "../../admin/routes";
import MarketRouters from "../../market/routes";
import GameRouters from "../../game/routes";
import LogRouters from "../../log/routes";

const routers = express.Router();
routers.use(express.json());

routers.get("/", (req: any, res: any) => {
  res.send(
    `
      /admin
      /market
      /game
      /log
    `
  );
});

routers.use("/admin", AdminRouters);
routers.use("/market", MarketRouters);
routers.use("/game", GameRouters);
routers.use("/log", LogRouters);

export default routers;
