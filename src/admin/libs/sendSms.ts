import http from "http";

import logger from "../../log";

const SendSMS = async (phone: string, code: string) => {
  let url = `${process.env.MOBILE_LINK}?apikey=${process.env.MOBILE_KEY}&pid=${process.env.MOBILE_PATTERN_CODE}&fnum=${process.env.MOBILE_FROM}&tnum=${phone}&p1=${process.env.MOBILE_VAR}&v1=${code}`;

  let data = "";
  const request = http
    .get(url, (resp) => {
      resp.on("data", (chunk) => (data += chunk));

      resp.on("end", () => {
        logger.info("data", JSON.parse(data));
        logger.info(JSON.parse(data).explanation);
      });
    })
    .on("error", (err: any) => {
      logger.error(`Error: ${err.message}`);
    });

  request.end();

  return { code: 200 };
};

export default SendSMS;
