import express from "express";

import authController from "../controllers/auth";
import adminController from "../controllers/user";
import notifyController from "../controllers/notify";

const AdminRouters = express.Router();
AdminRouters.use(express.json());

AdminRouters.get("/", (req: any, res: any) => {
  res.send(
    `
      /login
      /logout
      /verify
      /refresh

      /user
      /upload
      /update_user
      
      /get_notifications
      /save_notify
      /delete_notify
    `
  );
});

AdminRouters.post(`/login`, authController.login);
AdminRouters.post(`/logout`, authController.logout);
AdminRouters.post(`/verify`, authController.verifyUser);
AdminRouters.post(`/refresh`, authController.refreshUser);

AdminRouters.post(`/user`, adminController.user);
AdminRouters.post(`/upload`, adminController.uploadImage);
AdminRouters.post(`/update_user`, adminController.updateUsername);

AdminRouters.post(`/get_notifications`, notifyController.getNotifications);
AdminRouters.post(`/save_notify`, notifyController.saveNotify);
AdminRouters.post(`/delete_notify`, notifyController.deleteNotify);

export default AdminRouters;
