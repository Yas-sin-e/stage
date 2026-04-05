const nodemailer = require('nodemailer');
//node mailer est une biblioteque de node js qui permet d'envoyer des emails facilement en utilisant différents services de messagerie (comme Gmail, Outlook, etc.)
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // le mode pass de  l'application google 
    }
  });
// le contenu de l'email
  const mailOptions = {
    from: `AutoExpert <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  await transporter.sendMail(mailOptions); 
};

module.exports = sendEmail;
