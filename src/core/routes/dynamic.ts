import { existsSync } from "fs";

const Dynamic = (routers: any, system: string) => {
  const path = `../../${system}`;
  if (existsSync(path)) {
    const _routers = require(`${path}/routes`);
    routers.use(`/${system}`, _routers);

    return routers;
  }
};

export default Dynamic;
