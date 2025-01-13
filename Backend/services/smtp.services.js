import nodemailer from 'nodemailer';
import { generateOtp } from './otp.service.js';
import { storeOtp } from './otp.service.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
       user: 'nikita.works32@gmail.com', 
       pass: 'zlks suzq qcwe bfpv' 
    }
});

export const sendOrderEmail = async (orderDetails) => {
    try {
      const mailOptions = {
        from: 'nikita.works32@gmail.com', 
        to: 'vishnoinikita376@gmail.com',                    
        subject: `New Order received`,
        html: `
          <h1>New Order Received</h1>
          <p>${orderDetails}</p>
        `, 
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
};

export const forgotPassword = async (email) => {
    const otp = generateOtp();
    try {
        const mailOptions = {
        from: 'nikita.works32@gmail.com',
        to: email,  
        subject: `Request for updating password`,
        html: `
          <h1>Here is the OTP to update your password: ${otp}</h1>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      if (info) {
        console.log('Email sent:', info.messageId);

        await storeOtp(email, otp);
        return otp; 
      } else {
        console.log("Unable to send OTP");
        return null;
      }
    } catch (err) {
        console.error("Error sending OTP:", err);
    }

    
};
