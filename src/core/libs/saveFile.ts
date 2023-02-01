import fs from "fs";

import logger from "../../log";

const path = "Core>libs>saveFile>";

const SaveFile = (data: string, file_path: string) => {
  fs.writeFile(file_path, data, function (err) {
    if (err) logger.error(`${path}SaveFile: ${err}`);
  });
};

export default SaveFile;
