import nodemailer from 'nodemailer'

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000);
// }


export function verifyEmail(userEmail, opt) {
  console.log(userEmail, opt)
  const otp = opt; 
  const receiverEmail = userEmail; 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arsalangg05@gmail.com', 
      pass: 'gsrjumjoejdqmfqj'      // Gmail App Password (not normal password)
    }
  });

  const mailOptions = {
    from: 'arsalangg05@gmail.com',
    to: receiverEmail,
    subject: 'Blog App OTP',
    text: `your blog app OPT : ${otp}`,
    html: `<b>${otp}</b>`,
  };

  console.log(mailOptions)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email error:', error);
    } else {
      console.log('Email res:', info.response);
    }
  });
}



