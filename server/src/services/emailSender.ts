import nodemailer from 'nodemailer';
import verificationEmailTemplate from '../utils/tamplate';

// transporter object
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify().then(() => {
    console.log("SMTP server is ready to take messages");
});

// send email to user
const sendEmail = async (email: string, subject: string, verificationLink: string) => {
    await transporter.sendMail({
        from: `"Deep LMS" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `"Deep LMS" ${subject}`,
        html: verificationEmailTemplate(verificationLink),
    });
}

export default sendEmail;
