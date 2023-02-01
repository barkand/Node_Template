import { mkdirSync, existsSync, writeFile } from "fs";
import { join } from "path";

import logger from "../../log";
import response from "./responses";

const path = "Core>libs>saveFile>";

const SaveFile = async (data: string, folderName: string, fileName: string) => {
  const uploadPath = join("public", folderName ?? "");
  if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });

  const full_path = join(uploadPath, fileName);
  try {
    writeFile(full_path, data, function (err) {
      if (err) logger.error(`${path}SaveFile: ${err}`);
    });

    return response.success;
  } catch (e: any) {
    logger.error(`${path}SaveFile: ${e}`);
    return response.custom(500, `SaveFile: ${e.message}`);
  }
};

export default SaveFile;
