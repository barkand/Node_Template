import { readdirSync, existsSync } from "fs";

const DynamicRoutes = (routers: any) => {
  const ignoreList: any = ["admin", "core", "log", "server.ts"];

  readdirSync("./src").forEach(async (system) => {
    if (!ignoreList.includes(system)) {
      const routes_path = `${system}/routes`;

      if (existsSync(`./src/${routes_path}`)) {
        var system_routers = require(`../../${routes_path}`).default;
        routers.use(`/${system}`, system_routers);
      }
    }
  });

  return routers;
};

export default DynamicRoutes;
