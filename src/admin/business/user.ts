import { Users } from "../models";
import { GetActiveCode, ValidationCheck } from "../libs/activeCode";

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

const SaveUserWithCode = async (user_id: string) => {
  try {
    const { active_code, expire_code }: any = GetActiveCode();

    let user = await Users.findOne({ user_id: user_id }, { _id: 0, __v: 0 });

    if (!user) {
      user = new Users({
        user_id: user_id,
        active_code: active_code,
        expire_code: expire_code,
      });
      await user.save();
    } else {
      await Users.updateOne(
        { user_id: user_id },
        { $set: { active_code: active_code, expire_code: expire_code } }
      );
    }

    return { ...response.success, data: { active_code: active_code } };
  } catch (e: any) {
    logger.error(`${path}SaveUserWithCode: ${e}`);
    return response.error;
  }
};

const CheckUser = async (user_id: string) => {
  try {
    let user = await Users.findOne({ user_id: user_id }, { _id: 0, __v: 0 });

    if (!user) return response.error;
    return { ...response.success, data: user };
  } catch (e: any) {
    logger.error(`${path}CheckUser: ${e}`);
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

const CheckCode = async (user_id: string, code: string) => {
  try {
    let user = await Users.findOne(
      { user_id: user_id, active_code: code },
      { _id: 0, __v: 0 }
    );

    if (!user) return response.error;

    let check = ValidationCheck(user.expire_code);
    if (!check) return response.error;

    await Users.updateOne(
      { user_id: user_id },
      { $set: { active_code: null, expire_code: null } }
    );

    return { ...response.success, data: user };
  } catch (e: any) {
    logger.error(`${path}CheckCode: ${e}`);
    return response.error;
  }
};

export {
  GetUser,
  SaveUser,
  SaveUserWithCode,
  CheckUser,
  SaveUsername,
  SaveAvatar,
  CheckCode,
};
