import { Notifications } from "../models";

import logger from "../../log";
import { response } from "../../core";

const path = "Admin>Business>notify>";

const SaveNotify = async (
  user_id: string,
  notify: { item_id: number; message: string; refer_link: string }
) => {
  try {
    let _notification = await Notifications.findOne({
      user_id: user_id,
      refer_id: notify.item_id,
    });

    if (!_notification) {
      _notification = new Notifications({
        user_id: user_id,
        message: notify.message,
        refer_id: notify.item_id,
        refer_link: notify.refer_link,
        seen: false,
        active: false,
      });

      await _notification.save();
    }

    return response.success;
  } catch (e: any) {
    logger.error(`${path}SaveNotify: ${e}`);
    return response.error;
  }
};

const SeenNotify = async (user_id: string, item_id: number) => {
  try {
    await Notifications.updateOne(
      {
        user_id: user_id,
        refer_id: item_id,
      },
      { $set: { seen: true } }
    );

    return response.success;
  } catch (e: any) {
    logger.error(`${path}SeenNotify: ${e}`);
    return response.error;
  }
};

const ActiveNotify = async (item_id: number) => {
  try {
    await Notifications.updateMany(
      { refer_id: item_id },
      { $set: { active: true } }
    );

    return response.success;
  } catch (e: any) {
    logger.error(`${path}ActiveNotify: ${e}`);
    return response.error;
  }
};

const DeleteNotify = async (user_id: string, item_id: number) => {
  try {
    await Notifications.deleteOne({ user_id: user_id, refer_id: item_id });

    return response.success;
  } catch (e: any) {
    logger.error(`${path}DeleteNotify: ${e}`);
    return response.error;
  }
};

const GetNotifications = async (user_id: string) => {
  try {
    let _notifications = await Notifications.find(
      { user_id: user_id, seen: false, active: true },
      { _id: 0 }
    );

    return { ...response.success, data: _notifications };
  } catch (e: any) {
    logger.error(`${path}GetNotifications: ${e}`);
    return response.error;
  }
};

export { SaveNotify, SeenNotify, ActiveNotify, DeleteNotify, GetNotifications };
