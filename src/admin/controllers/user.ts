import { verifyToken } from "../libs/jwt";
import { GetUser, SaveUsername, SaveAvatar } from "../business/user";

import { uploadImage } from "../../core";

class AdminController {
  user = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result = await GetUser(wallet);
    res.status(_result.code).send(_result);
  };

  uploadImage = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    const image = req.files.file;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _upload: any = await uploadImage(image, "users", wallet);
    if (_upload.code !== 200) res.status(_upload.code).send(_upload);

    let _result = await SaveAvatar(wallet);
    res.status(_result.code).send(_result);
  };

  updateUsername = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;
    let { username } = req.body;

    let _verify = await verifyToken(token);
    if (_verify.code !== 200) res.status(_verify.code).send(_verify);

    let _result = await SaveUsername(wallet, username);
    res.status(_result.code).send(_result);
  };
}

export default new AdminController();
