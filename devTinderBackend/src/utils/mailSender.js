const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        // create a Transporter to send emails
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // send emails to users
        let info = await transporter.sendMail({
            from: `"Shraddha Gaur" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = mailSender;