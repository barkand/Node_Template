import morgan from "morgan";
import fs from "fs";

const accessLogMiddleware = async (app: any) => {
  var accessLogStream = fs.createWriteStream("logs/access.log", { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));
};

export default accessLogMiddleware;
