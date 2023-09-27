import nodemailer from "nodemailer";

const parseMultipart = body => {
  return body
    .filter(el => el.name !== "file")
    .reduce((acc, el) => {
      acc[el.name] = el.data.toString("utf-8");
      return acc;
    }, {});
};

const getFiles = body => {
  return body.filter(el => {
    return el.name === "file";
  });
};

export default eventHandler(async event => {
  const body = await readMultipartFormData(event);
  const parsed = parseMultipart(body);
  const files = getFiles(body);
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: "465",
    auth: {
      user: "support@websculptor.online",
      pass: "UzeraF55!",
    },
  });
  const mailOptions = {
    from: "Allegria Store 💎 <support@websculptor.online>",
    to: "dmitry.conquer@gmail.com",
    subject: "Allegria Store 💎 Дякуємо за зворотній зв'язок!",
    text: `${parsed.text} | ми отримали повідомлення, та зв'яжимося з Вами найближчим часом!`,
    attachments: [
      {
        filename: files[0].filename,
        content: files[0].data,
        contentType: files[0].type,
      },
      {
        filename: files[1].filename,
        content: files[1].data,
        contentType: files[1].type,
      },
    ],
  };

  const mailOptions2 = {
    from: "Allegria Store 💎 <support@websculptor.online>",
    to: "dmitry.conquer@gmail.com",
    subject: "Allegria Store 💎 Дякуємо за зворотній зв'язок!",
    text: `${parsed.text} | ми отримали повідомлення, та зв'яжимося з Вами найближчим часом!`,
    attachments: [
      {
        filename: files[0].filename,
        content: files[0].data,
        contentType: files[0].type,
      },
      {
        filename: files[1].filename,
        content: files[1].data,
        contentType: files[1].type,
      },
    ],
  };

  const results = await Promise.all([transporter.sendMail(mailOptions), transporter.sendMail(mailOptions2)]);
  return results;
});
