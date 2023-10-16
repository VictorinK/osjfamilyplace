const nodemailer = require('nodemailer');

const authEmail = process.env['AUTH_EMAIL']


module.exports = {
  //Method that will send a email to admin from the contact us form 
  sendMail:  (receiver, name, msg) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: authEmail,
        pass: process.env['AUTH_PASS']
      }
});

    console.log("Starting to send e-mail...");
    
    const mailOptions = {
      from: authEmail,
      to: receiver,
      subject: name + ' Recieved E-mail from contact us form',
      text: msg
};
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
});
  }
}