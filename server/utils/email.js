import nodemailer from "nodemailer";
import pug from "pug";
import { htmlToText } from "html-to-text";
import path from "path";

const __dirname = path.resolve();

// new Email(user, url).sendWelcome() .sendReset
export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Shan Mi <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // 1) prod
    if (process.env.NODE_ENV === "production") {
      // sendgrid
      // nodemailer know how to configure it
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // 2) dev
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email

  async send(template, subject) {
    // 1) render html based on a pug template
    const html = pug.renderFile(`${__dirname}/views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
      // html: we can transfer text to html here
    };

    // 3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
    // await transport.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Ghibli Fan's Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}
