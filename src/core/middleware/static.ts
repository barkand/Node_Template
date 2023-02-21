import express from "express";
import { join } from "path";

const staticMiddleware = async (app: any) => {
  app.use(
    `/${process.env.UPLOAD_FOLDER}/users`,
    express.static(join("public", process.env.UPLOAD_FOLDER, "users"))
  );

  app.use(
    `/${process.env.UPLOAD_FOLDER}/teams`,
    express.static(join("public", process.env.UPLOAD_FOLDER, "teams"))
  );

  app.use(`/metadata`, express.static(join("public", "metadata")));
};

export default staticMiddleware;
