import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailSender = async (email, title, body) => {
    console.log(email);
    try{
        let transporter = nodemailer.createTransport({
            host : "smtp.gmail.com",
            port :  587,
            auth : {
                user : process.env.MAILER_USER,
                pass : process.env.MAILER_PASS,
            },
        });

        let info = await transporter.sendMail({
            from : 'E-Commerce <heyyahoo143@gmail.com>',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        });
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}

export default mailSender;