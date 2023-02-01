import fs from "fs";
import { join } from "path";

import logger from "../../log";

const path = "Core>libs>saveFile>";

const SaveFile = (data: string, folderName: string, fileName: string) => {
  const full_path = join("public", folderName ?? "", fileName);
  fs.writeFile(full_path, data, function (err) {
    if (err) logger.error(`${path}SaveFile: ${err}`);
  });
};

export default SaveFile;
