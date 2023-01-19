import { verifyToken } from "../libs/jwt";
import { SaveNotify, DeleteNotify, GetNotifications } from "../business/notify";

class NotifyController {
  saveNotify = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { product } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await SaveNotify(wallet, product);
    res.status(_result.code).send(_result);
  };

  deleteNotify = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { product } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await DeleteNotify(wallet, product);
    res.status(_result.code).send(_result);
  };

  getNotifications = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { lang } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await GetNotifications(wallet, lang);
    res.status(_result.code).send(_result);
  };
}

export default new NotifyController();
