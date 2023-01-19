import { Notifications } from "../models";

import { Products } from "../../market/models";
import logger from "../../log";
import { response } from "../../core";

const path = "Admin>Business>notify>";

const SaveNotify = async (wallet: string, product: string) => {
  try {
    let notify = await Notifications.findOne({
      user_id: wallet,
      product_id: product,
    });

    if (!notify) {
      notify = new Notifications({
        user_id: wallet,
        product_id: product,
        seen: false,
      });

      await notify.save();
    }

    return response.success;
  } catch (e: any) {
    logger.error(`${path}SaveNotify: ${e}`);
    return response.error;
  }
};

const DeleteNotify = async (wallet: string, product: string) => {
  try {
    await Notifications.deleteOne({ user_id: wallet, product_id: product });

    return response.success;
  } catch (e: any) {
    logger.error(`${path}DeleteNotify: ${e}`);
    return response.error;
  }
};

const GetNotifications = async (wallet: string, lang: string) => {
  let _notifications: any = [];

  try {
    let items = await Notifications.find(
      { user_id: wallet, seen: false },
      { _id: 0 }
    );

    for (let i = 0; i < items.length; i++) {
      let product: any = await Products.findOne({ id: items[i].product_id });
      if (product.forSale === true) {
        _notifications.push({
          id: product.id,
          title:
            lang === "en"
              ? `${product.nameEn} - ${product.cardEn} (${product.price})`
              : `${product.name} - ${product.card} (${product.price})`,
        });
      }
    }

    return { ...response.success, data: _notifications };
  } catch (e: any) {
    logger.error(`${path}GetNotify: ${e}`);
    return { ...response.error, data: _notifications };
  }
};

export { SaveNotify, DeleteNotify, GetNotifications };
