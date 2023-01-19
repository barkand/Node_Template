import cors from "cors";
import helmet from "helmet";
import contentSecurityPolicy from "helmet-csp";

const securityMiddleware = async (app: any) => {
  app.use(
    cors({
      origin: [`${process.env.SITE_PATH}`],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  app.use(helmet());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());

  app.use(
    contentSecurityPolicy({
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'", process.env.SITE_PATH],
        scriptSrc: ["'self'", process.env.SITE_PATH],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
      reportOnly: false,
    })
  );

  app.set("trust proxy", true);
};

export default securityMiddleware;
