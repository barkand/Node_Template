import jwt from "jsonwebtoken";

import { response } from "../../core";

const createToken = async (wallet: string) => {
  let payload: any = { wallet: wallet };

  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: `${process.env.SECRET_KEY_LIFE_TIME}`,
  });
  const refresh = jwt.sign(payload, `${process.env.REFRESH_SECRET_KEY}`, {
    expiresIn: `${process.env.REFRESH_SECRET_KEY_LIFE_TIME}`,
  });

  return { token, refresh };
};

const verifyToken = async (token: string) => {
  let state = { ...response.success, data: { connected: true } };
  if (token === undefined)
    return {
      ...response.custom(404, "No Token Found"),
      data: { connected: false },
    };

  jwt.verify(token, `${process.env.SECRET_KEY}`, (err: any) => {
    if (err)
      state = {
        ...response.custom(401, "Invalid Token"),
        data: { connected: false },
      };
  });

  return state;
};

const refreshToken = async (wallet: string, refresh: string) => {
  let payload: any = { wallet: wallet };
  let state = { ...response.success, data: { token: "" } };

  if (refresh === undefined)
    return {
      ...response.custom(404, "No Refresh Token Found"),
      data: { token: "" },
    };

  jwt.verify(refresh, `${process.env.REFRESH_SECRET_KEY}`, (err: any) => {
    if (err)
      state = {
        ...response.custom(403, "Authentication Failed"),
        data: { token: "" },
      };
  });

  //RefreshToken is valid so sign a new Token
  const new_token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: `${process.env.SECRET_KEY_LIFE_TIME}`,
  });

  return { ...state, token: new_token };
};

export { createToken, verifyToken, refreshToken };
