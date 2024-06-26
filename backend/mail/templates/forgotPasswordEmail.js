const forgotPasswordEmail = (fullname, linkForChangePassword) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Contact Form Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
              h1{
                  color: #FFD60A;
                  background: #1F2937;
                  padding: 10px;
                  
              }
      
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
      <div class="container">
      <h1>E-Commerce</h1>
      <div class="message">Password Change Request</div>
      <div class="body">
          <p>Dear ${fullname},</p>
          <p>YOUR PASSWORD RESET LINK IS READY</p>
          <p>Just click the link to reset it - but be quick, it expires in 5 minutes.</p>
                  <p>To reset your E-Commerce password, click the link below : </p>
          <p><a href="${linkForChangePassword}">Reset Password</a></p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,</p>
          <p>Knowledge Hub Team</p>    
          <p>Thank you for using our platform.</p>
      </div>
      <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
          out to us at <a href="mailto:info@ecommerce.com">info@ecommerce.com</a>. We are here to help!
      </div>
  </div>
      </body>
      
      </html>`;
  };
  
  export { forgotPasswordEmail };