import express from "express";

import authController from "../controllers/auth";
import adminController from "../controllers/user";
import notifyController from "../controllers/notify";

const AdminRouters = express.Router();
AdminRouters.use(express.json());

AdminRouters.get("/", (req: any, res: any) => {
  res.send(
    `
      /send_code
      /login
      /login_code
      /logout
      /verify
      /refresh

      /user
      /upload
      /update_user
      
      /get_notifications
      /save_notify
      /seen_notify
      /delete_notify
    `
  );
});

AdminRouters.post(`/send_code`, authController.sendCode);
AdminRouters.post(`/login`, authController.login);
AdminRouters.post(`/login_code`, authController.loginWithCode);
AdminRouters.post(`/logout`, authController.logout);
AdminRouters.post(`/verify`, authController.verifyUser);
AdminRouters.post(`/refresh`, authController.refreshUser);

AdminRouters.post(`/user`, adminController.user);
AdminRouters.post(`/upload`, adminController.uploadImage);
AdminRouters.post(`/update_user`, adminController.updateUsername);

AdminRouters.post(`/get_notifications`, notifyController.getNotifications);
AdminRouters.post(`/save_notify`, notifyController.saveNotify);
AdminRouters.post(`/seen_notify`, notifyController.seenNotify);
AdminRouters.post(`/delete_notify`, notifyController.deleteNotify);

export default AdminRouters;
