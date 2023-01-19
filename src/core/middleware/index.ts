import securityMiddleware from "./security";
import baseMiddleware from "./base";
import fileMiddleware from "./file";
import staticMiddleware from "./static";
import accessLogMiddleware from "./accessLog";

const setMiddleware = async (app: any) => {
  securityMiddleware(app);
  baseMiddleware(app);
  fileMiddleware(app);
  staticMiddleware(app);
  accessLogMiddleware(app);
};

export default setMiddleware;
