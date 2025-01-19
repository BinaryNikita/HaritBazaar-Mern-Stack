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

export const sendOrderEmail = async (orderResponse) => {
  try {
    const { orderDetails, total, product, userEmail } = orderResponse;

    const mailOptions = {
      from: 'nikita.works32@gmail.com',
      to: userEmail,  
      subject: `Order ${orderDetails.orderStatus || 'Pending'} - Order ID: ${orderDetails._id}`,
      html: `
        <h1>Order ${orderDetails.orderStatus || 'Pending'}</h1>
        <p>Order ID: ${orderDetails._id}</p>
        <p>Order Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}</p>
        <p>Estimated Delivery Date: ${new Date(orderDetails.orderDate)
          .setDate(new Date(orderDetails.orderDate).getDate() + 5)
          .toLocaleDateString()}</p>
        <h2>Product Details</h2>
        <p>Product Name: ${product ? product.name : 'Not Found'}</p>
        <p>Price: ${product ? product.price : 'N/A'}</p>
        <p>Total Amount: ${total}</p>
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
