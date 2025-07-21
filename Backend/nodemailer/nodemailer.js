import nodemailer from 'nodemailer'



export function verifyEmail(userEmail, opt) {
  console.log(userEmail, opt)
  const otp = opt; 
  const receiverEmail = userEmail; 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arsalangg05@gmail.com', 
      pass: 'gsrjumjoejdqmfqj'      
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



