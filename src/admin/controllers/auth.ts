import { createToken, verifyToken, refreshToken } from "../libs/jwt";
import { SaveWallet } from "../business/user";
import logger from "../../log";
import { response } from "../../core";

const path = "Admin>controllers>auth>";

class AuthController {
  login = async (req: any, res: any) => {
    let { wallet } = req.body;
    let { token, refresh } = await createToken(wallet);

    let _result: any = await SaveWallet(wallet);
    if (_result.code !== 200)
      res.status(_result.code).send({ ..._result, connected: false });

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
      .status(200)
      .send({ connected: true });
  };

  logout = async (req: any, res: any) => {
    const { wallet } = req.cookies;

    let _result: any = await SaveWallet(wallet);
    if (_result.code !== 200)
      res.status(_result.code).send({ ..._result, connected: false });

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
      .status(200)
      .send({ connected: false });
  };

  verifyUser = async (req: any, res: any) => {
    const { token, wallet } = req.cookies;

    let result = await verifyToken(token);
    if (result.code !== 200) {
      await SaveWallet(wallet);

      res.status(result.code).send({
        connected: false,
        message: result.message,
      });
      return;
    }

    res.status(200).send({ connected: true });
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
          .send({ ...response.error, message: false });

        logger.error(`${path}refreshUser: ${result.message}`);
        return;
      }

      await SaveWallet(wallet);

      res
        .cookie("token", result.token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: process.env.SECRET_KEY_LIFE_TIME,
        })
        .status(200)
        .send({ ...response.success, message: true });
    } catch (err: any) {
      res.status(500).send({ ...response.error, message: false });
      logger.error(`${path}SaveWallet: ${err}`);
    }
  };
}

export default new AuthController();
