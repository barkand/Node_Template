import { mkdirSync, copyFileSync, existsSync } from "fs";
import { join } from "path";
import logger from "../../log";
import response from "./responses";

const path = "Core>libs>upload>";

const uploadImage = async (image: any, folder: string, name: string) => {
  const uploadPath = join("public", process.env.UPLOAD_FOLDER ?? "", folder);

  if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });

  try {
    const dest = join(uploadPath, name + ".webp");
    copyFileSync(image.path, dest);

    return response.success;
  } catch (e: any) {
    logger.error(`${path}uploadImage: ${e}`);
    return response.custom(500, `uploadImage: ${e.message}`);
  }
};

export { uploadImage };
