/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
  sendEmail(targetEmail, content) {
    const message = {
      from: "Openmusic Apps",
      to: targetEmail,
      subject: "Ekspor Playlist",
      text: "Terlampir hasil dari ekspor Playlist",
      attachments: [
        {
          filename: "playlist.json",
          content,
        },
      ],
    };
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
