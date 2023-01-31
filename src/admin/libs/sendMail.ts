import { createTransport } from "nodemailer";

import logger from "../../log";

const SendMail = async (mail_to: string, subject: string, content: string) => {
  let config: any = {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
    },
  };

  var transporter: any = createTransport(config);

  var mailOptions: any = {
    from: process.env.MAIL_FROM,
    to: mail_to,
    subject: `${subject}`,
    html: `${content}`,
  };

  await transporter.sendMail(mailOptions, function (e: any, info: any) {
    if (e) {
      logger.error(`sendMail: ${e}`);

      return { code: 500, status: "error" };
    } else {
      return { code: 200, status: "success" };
    }
  });

  return { code: 200, status: "success" };
};

export default SendMail;
