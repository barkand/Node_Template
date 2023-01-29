import { Users } from "../models";

import logger from "../../log";
import { response } from "../../core";

const path = "Admin>Business>user>";

const GetUser = async (user_id: string) => {
  try {
    let user = await Users.findOne({ user_id: user_id }, { _id: 0, __v: 0 });
    return { ...response.success, data: user };
  } catch (e: any) {
    logger.error(`${path}GetUser: ${e}`);
    return response.error;
  }
};

const SaveUser = async (user_id: string) => {
  try {
    let user = await Users.findOne({ user_id: user_id }, { _id: 0, __v: 0 });

    if (!user) {
      user = new Users({ user_id: user_id });
      await user.save();
    }

    return { ...response.success, data: user };
  } catch (e: any) {
    logger.error(`${path}SaveUser: ${e}`);
    return response.error;
  }
};

const CheckUser = async (user_id: string) => {
  try {
    let user = await Users.findOne({ user_id: user_id }, { _id: 0, __v: 0 });

    if (!user) return response.error;
    return { ...response.success, data: user };
  } catch (e: any) {
    logger.error(`${path}SaveUser: ${e}`);
    return response.error;
  }
};

const SaveUsername = async (user_id: string, username: string) => {
  try {
    let user = await Users.findOne({
      username: username,
      user_id: { $ne: user_id },
    });

    if (user) {
      return response.custom(300, "Username Exist");
    } else {
      await Users.updateOne(
        { user_id: user_id },
        { $set: { username: username, score: 1 } } //TODO: Score have to Fix
      );

      let user = await Users.findOne({ user_id: user_id });
      return {
        ...response.success,
        data: { username: user?.username, score: user?.score },
      };
    }
  } catch (e: any) {
    logger.error(`${path}SaveUsername: ${e}`);
    return response.error;
  }
};

const SaveAvatar = async (user_id: string) => {
  try {
    let user = await Users.findOne({ user_id: user_id });

    if (user) {
      await Users.updateOne(
        { user_id: user_id },
        { $set: { avatar: true, score: 1 } }
      );
      return response.success;
    }
  } catch (e: any) {
    logger.error(`${path}SaveAvatar: ${e}`);
    return response.error;
  }
};

export { GetUser, SaveUser, CheckUser, SaveUsername, SaveAvatar };
