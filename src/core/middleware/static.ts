import express from "express";
import { join } from "path";

const staticMiddleware = async (app: any) => {
  app.use(
    `/${process.env.UPLOAD_FOLDER}/users`,
    express.static(join(process.env.UPLOAD_FOLDER, "users"))
  );

  app.use(
    `/${process.env.UPLOAD_FOLDER}/teams`,
    express.static(join(process.env.UPLOAD_FOLDER, "teams"))
  );
};

export default staticMiddleware;
