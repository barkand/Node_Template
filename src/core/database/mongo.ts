import mongoose from "mongoose";

import logger from "../../log";

const ConnectToDatabase = async () => {
  mongoose.set("strictQuery", false);
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
    logger.info(`Mongo is listening on port ${process.env.DB_PORT}`);
  } catch (e: any) {
    logger.error(`Mongo Connect: ${e}`);
  }
};

export default ConnectToDatabase;
