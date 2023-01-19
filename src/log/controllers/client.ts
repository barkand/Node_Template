import logger from "..";

class ClientController {
  log = async (req: any, res: any) => {
    let { type, message } = req.body;
    let ip =
      req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let browser = req.headers["user-agent"];

    logger[type](`${ip} ${message} ${browser}`);
  };
}

export default new ClientController();
