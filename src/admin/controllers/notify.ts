import { verifyToken } from "../libs/jwt";
import { SaveNotify, SeenNotify, DeleteNotify, GetNotifications } from "../business/notify";

class NotifyController {
  saveNotify = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { notify } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await SaveNotify(wallet, notify);
    res.status(_result.code).send(_result);
  };

  seenNotify = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { item_id } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await SeenNotify(wallet, item_id);
    res.status(_result.code).send(_result);
  };


  deleteNotify = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { item_id } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await DeleteNotify(wallet, item_id);
    res.status(_result.code).send(_result);
  };

  getNotifications = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result: any = await GetNotifications(wallet);
    res.status(_result.code).send(_result);
  };
}

export default new NotifyController();
