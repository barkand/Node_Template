import formData from "express-form-data";

const fileMiddleware = async (app: any) => {
  app.use(formData.parse());
};

export default fileMiddleware;
