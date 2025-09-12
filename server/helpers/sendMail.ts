// bice funkcija kojoj se prosledjuju parametri i onda salje mail
import nodemailer from "nodemailer";
import catchAsync from "../utills/catchAsync";

type Options = {
  email: string;
  subject: string;
  text: string;
};

const sendMail = (options: Options) =>
  catchAsync(async (req, res, next) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "Kristijan Stojanovic krimster8@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.text,
    };
    await transporter.sendMail(mailOptions);
  });

export default sendMail;
