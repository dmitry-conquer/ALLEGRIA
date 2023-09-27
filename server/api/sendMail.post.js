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
    subject: `Нове повідомлення`,
    text: `${body.firstName}, ${body.lastName}, ${body.tel}, ${body.email}`,
  };

  const mailOptions2 = {
    from: "Allegria Store 💎 <support@websculptor.online>",
    to: body.email,
    subject: "Allegria Store 💎 Дякуємо за зворотній зв'язок!",
    text: `${body.firstName}, ми отримали повідомлення, та зв'яжимося з Вами найближчим часом!`,
  };

  const results = await Promise.all([transporter.sendMail(mailOptions), transporter.sendMail(mailOptions2)]);
  return results;
});
