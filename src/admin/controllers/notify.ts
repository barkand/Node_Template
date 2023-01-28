import { verifyToken } from "../libs/jwt";
import {
  SaveNotify,
  SeenNotify,
  DeleteNotify,
  GetNotifications,
} from "../business/notify";

class NotifyController {
  saveNotify = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;
    let { params } = req.body;
    let { notify } = params;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _result: any = await SaveNotify(user_id, notify);
    res.status(_result.code).send(_result);
  };

  seenNotify = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;
    let { params } = req.body;
    let { item_id } = params;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _result: any = await SeenNotify(user_id, item_id);
    res.status(_result.code).send(_result);
  };

  deleteNotify = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;
    let { params } = req.body;
    let { item_id } = params;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _result: any = await DeleteNotify(user_id, item_id);
    res.status(_result.code).send(_result);
  };

  getNotifications = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _result: any = await GetNotifications(user_id);
    res.status(_result.code).send(_result);
  };
}

export default new NotifyController();
