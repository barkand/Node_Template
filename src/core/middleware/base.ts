import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

const baseMiddleware = async (app: any) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cookieParser());
};

export default baseMiddleware;
