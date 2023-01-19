import { Users } from "../models";

import logger from "../../log";
import { response } from "../../core";

const path = "Admin>Business>user>";

const GetUser = async (wallet: string) => {
  try {
    let user = await Users.findOne({ wallet: wallet });
    return { ...response.success, data: user };
  } catch (e: any) {
    logger.error(`${path}GetUser: ${e}`);
    return response.error;
  }
};

const SaveWallet = async (wallet: string) => {
  try {
    let user = await Users.findOne({ wallet: wallet });

    if (!user) {
      let user = new Users({ wallet: wallet });
      await user.save();
    }
    return response.success;
  } catch (e: any) {
    logger.error(`${path}SaveWallet: ${e}`);
    return response.error;
  }
};

const SaveUsername = async (wallet: string, username: string) => {
  try {
    let user = await Users.findOne({
      username: username,
      wallet: { $ne: wallet },
    });

    if (user) {
      return response.custom(300, "Username Exist");
    } else {
      await Users.updateOne(
        { wallet: wallet },
        { $set: { username: username, score: 1 } } //TODO: Score have to Fix
      );

      let user = await Users.findOne({ wallet: wallet });
      return {
        ...response.success,
        data: { name: user?.username, score: user?.score },
      };
    }
  } catch (e: any) {
    logger.error(`${path}SaveUsername: ${e}`);
    return response.error;
  }
};

const SaveAvatar = async (wallet: string) => {
  try {
    let user = await Users.findOne({ wallet: wallet });

    if (user) {
      await Users.updateOne(
        { wallet: wallet },
        { $set: { avatar: true, score: 1 } }
      );
      return response.success;
    }
  } catch (e: any) {
    logger.error(`${path}SaveAvatar: ${e}`);
    return response.error;
  }
};

export { GetUser, SaveWallet, SaveUsername, SaveAvatar };
