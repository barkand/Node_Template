import { createClient } from "redis";

import logger from "../../log";

var client: any;
const ConnectToCacheDatabase = async () => {
  const socket: any = {
    host: process.env.DB_CACHE_HOST,
    port: process.env.DB_CACHE_PORT,
  };

  try {
    client = createClient({
      socket: socket,
      password: process.env.DB_CACHE_PASSWORD,
    });
    await client.connect();

    logger.info(`Redis is listening on port ${process.env.DB_CACHE_PORT}`);
  } catch (e: any) {
    logger.error(`Redis Connect: ${e}`);
  }
};

export default ConnectToCacheDatabase;
export { client };
