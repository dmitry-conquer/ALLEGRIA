import nodemailer from "nodemailer";

export default eventHandler(async event => {

  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: "465",
    auth: {
      user: "support@websculptor.online",
      pass: "UzeraF55!",
    },
  });

  const mailOptions = {
    from: "support@websculptor.online",
    to: "dmitry.conquer@gmail.com",
    subject: `♥♥♥♥♥♥`,
    text: body,
  };

  const mail = await transporter.sendMail(mailOptions);
  console.log(mail.messageId);
  return mail
});
