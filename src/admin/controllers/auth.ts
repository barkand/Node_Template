import { createToken, verifyToken, refreshToken } from "../libs/jwt";
import { SaveWallet } from "../business/user";
import { response } from "../../core";

class AuthController {
  login = async (req: any, res: any) => {
    let { params } = req.body;
    let { wallet } = params;
    let { token, refresh } = await createToken(wallet);

    let _result: any = await SaveWallet(wallet);
    if (_result.code !== 200) {
      res.status(_result.code).send({ ..._result, data: { connected: false } });
      return;
    }

    res
      .cookie("wallet", wallet, {
        httpOnly: true,
        sameSite: "lax",
        // secure: true, //TODO: Set Secure
        // domain : '.',
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
      .send({ ..._result, data: { connected: true } });
  };

  logout = async (req: any, res: any) => {
    const { wallet } = req.cookies;

    let _result: any = await SaveWallet(wallet);
    if (_result.code !== 200) {
      res.status(_result.code).send({ ..._result, data: { connected: false } });
      return;
    }

    res
      .cookie("wallet", "", {
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
      .status(_result.code)
      .send({ ..._result, data: { connected: false } });
  };

  verifyUser = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;

    let result = await verifyToken(token);
    if (result.code !== 200) {
      await SaveWallet(wallet);
      return;
    }

    res.status(result.code).send(result);
  };

  refreshUser = async (req: any, res: any) => {
    const { refresh, wallet } = req.cookies;

    try {
      let result = await refreshToken(wallet, refresh);
      if (result.code !== 200) {
        await SaveWallet(wallet);

        res
          .cookie("wallet", "", {
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

      await SaveWallet(wallet);

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
