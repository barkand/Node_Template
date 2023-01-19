import client from "prom-client";

class LogController {
  prom = async (req: any, res: any) => {
    const register = new client.Registry();
    register.setDefaultLabels({
      app: "app-server",
    });
    client.collectDefaultMetrics({ register });

    try {
      res.setHeader("Content-Type", register.contentType);
      res.end(await register.metrics());
    } catch (ex) {
      res.status(500).send(ex);
    }
  };
}

let logController = new LogController();

export default logController;
