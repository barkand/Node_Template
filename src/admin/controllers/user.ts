import { verifyToken } from "../libs/jwt";
import { GetUser, SaveUsername, SaveAvatar } from "../business/user";

import { uploadImage } from "../../core";

class AdminController {
  user = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _result = await GetUser(user_id);
    res.status(_result.code).send(_result);
  };

  uploadImage = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;
    const image = req.files.file;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _upload: any = await uploadImage(image, "users", user_id);
    if (_upload.code !== 200) {
      res.status(_upload.code).send(_upload);
      return;
    }

    let _result = await SaveAvatar(user_id);
    res.status(_result.code).send(_result);
  };

  updateUsername = async (req: any, res: any) => {
    const { token, user_id } = req.cookies;
    let { params } = req.body;
    let { username } = params;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) {
      res.status(_verify.code).send(_verify);
      return;
    }

    let _result = await SaveUsername(user_id, username);
    res.status(_result.code).send(_result);
  };
}

export default new AdminController();
