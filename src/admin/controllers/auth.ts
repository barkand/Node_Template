import { createToken, verifyToken, refreshToken } from "../libs/jwt";
import { SaveUser, SaveUserWithCode, CheckCode } from "../business/user";
import SendMail from "../libs/sendMail";
import SendSMS from "../libs/sendSms";

import { response } from "../../core";

class AuthController {
  sendCode = async (req: any, res: any) => {
    let { params } = req.body;
    let { user_id, type } = params;

    let _result: any = await SaveUserWithCode(user_id, type);
    if (_result.code === 200)
      if (type === "mail") SendMail(user_id, "Code", _result.data?.active_code);
      else SendSMS(user_id, _result.data?.active_code);

    res
      .status(_result.code)
      .send({ code: _result.code, message: _result.message });
  };

  login = async (req: any, res: any) => {
    let { params } = req.body;
    let { user_id } = params;
    let { token, refresh } = await createToken(user_id);

    let _result: any = await SaveUser(user_id);
    let _data: any = _result.data;
    if (_result.code !== 200) {
      res.status(_result.code).send({
        code: _result.code,
        message: _result.message,
        data: {
          user_id: _data?.user_id,
          wallet: _data?.wallet,
          connected: false,
        },
      });
      return;
    }

    res
      .cookie("user_id", user_id, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: process.env.REFRESH_SECRET_KEY_LIFE_TIME,
      })
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: process.env.SECRET_KEY_LIFE_TIME,
      })
      .cookie("refresh", refresh, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: process.env.REFRESH_SECRET_KEY_LIFE_TIME,
      })
      .status(_result.code)
      .send({
        code: _result.code,
        message: _result.message,
        data: {
          user_id: _data?.user_id,
          wallet: _data?.wallet,
          connected: true,
        },
      });
  };

  loginWithCode = async (req: any, res: any) => {
    let { params } = req.body;
    let { user_id, code } = params;

    let _result_check: any = await CheckCode(user_id, code);
    let _data_check: any = _result_check.data;
    if (_result_check.code !== 200) {
      res.status(_result_check.code).send({
        code: _result_check.code,
        message: _result_check.message,
        data: {
          user_id: _data_check.user_id,
          active_code: _data_check.active_code,
          connected: false,
        },
      });
      return;
    }

    let { token, refresh } = await createToken(user_id);

    let _result: any = await SaveUser(user_id);
    let _data: any = _result.data;
    if (_result.code !== 200) {
      res.status(_result.code).send({
        code: _result.code,
        message: _result.message,
        data: {
          user_id: _data.user_id,
          active_code: _data.active_code,
          connected: false,
        },
      });
      return;
    }

    res
      .cookie("user_id", user_id, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: process.env.REFRESH_SECRET_KEY_LIFE_TIME,
      })
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: process.env.SECRET_KEY_LIFE_TIME,
      })
      .cookie("refresh", refresh, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: process.env.REFRESH_SECRET_KEY_LIFE_TIME,
      })
      .status(_result.code)
      .send({
        code: _result_check.code,
        message: _result_check.message,
        data: {
          user_id: _data_check.user_id,
          active_code: _data_check.active_code,
          connected: true,
        },
      });
  };

  logout = async (req: any, res: any) => {
    res
      .cookie("user_id", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
      })
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
      })
      .cookie("refresh", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
      })
      .status(200)
      .send({
        ...response.success,
        data: { user_id: "", connected: false },
      });
  };

  verifyUser = async (req: any, res: any) => {
    const { token } = req.cookies;

    let result = await verifyToken(token);
    if (result.code !== 200) {
      res.status(result.code).send(result);
      return;
    }

    res.status(result.code).send(result);
  };

  refreshUser = async (req: any, res: any) => {
    const { refresh, user_id } = req.cookies;

    try {
      let result = await refreshToken(user_id, refresh);
      if (result.code !== 200) {
        res
          .cookie("user_id", "", {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 0,
          })
          .cookie("token", "", {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 0,
          })
          .cookie("refresh", "", {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 0,
          })
          .status(result.code)
          .send({ ...response.error, data: { connected: false } });

        return;
      }

      res
        .cookie("token", result.data.token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: process.env.SECRET_KEY_LIFE_TIME,
        })
        .status(200)
        .send({ ...response.success, data: { connected: true } });
    } catch (err: any) {
      res.status(500).send({ ...response.error, data: { connected: false } });
    }
  };
}

export default new AuthController();
