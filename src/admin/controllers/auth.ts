import { createToken, verifyToken, refreshToken } from "../libs/jwt";
import { SaveUser } from "../business/user";
import { response } from "../../core";

class AuthController {
  login = async (req: any, res: any) => {
    let { params } = req.body;
    let { user_id } = params;
    let { token, refresh } = await createToken(user_id);

    let _result: any = await SaveUser(user_id);
    if (_result.code !== 200) {
      res
        .status(_result.code)
        .send({ ..._result, data: { ..._result.data._doc, connected: false } });
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
      .send({ ..._result, data: { ..._result.data._doc, connected: true } });
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
