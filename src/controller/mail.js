const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.host_mailer,
        port: process.env.port_mailer,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.user_mailer,
            pass: process.env.pass_mailer
        }
    });

    // Email content
    const mailOptions = {
        from: process.env.user_mailer,
        to,
        subject,
        html: text
    };

    // Sending email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { sendEmail };
