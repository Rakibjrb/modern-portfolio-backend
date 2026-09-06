import nodemailer from "nodemailer";
import env from "../config/env";

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

interface IContactEmailData {
    name: string;
    email: string;
    message: string;
}

const sendUserConfirmationEmail = async (data: IContactEmailData): Promise<void> => {

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333333;">Thank You for Reaching Out, ${data.name}!</h2>
        <p style="color: #555555; line-height: 1.6;">
            I have received your message and appreciate you taking the time to connect. I will review your inquiry and get back to you as soon as possible.
        </p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #333;">Your Message:</p>
            <p style="margin: 10px 0 0 0; color: #666; font-style: italic;">"${data.message}"</p>
        </div>
        <p style="color: #777777; font-size: 14px;">
            Best regards,<br>
            <strong>Rakibul Hasan</strong>
        </p>
    </div>
    `;

    console.log("Sending user confirmation email");

    const info = await transporter.sendMail({
        from: `"Portfolio Contact" <${env.SMTP_USER}>`,
        to: data.email,
        subject: "Thank you for reaching out!",
        html: htmlContent,
        text: data.message,
    });

    console.log("Transporter sendMail success (User)! Message ID:", info.messageId);

};

const sendAdminNotificationEmail = async (data: IContactEmailData): Promise<void> => {

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #d9534f;">📩 New Contact Message Received</h2>
        <p style="color: #333;"><strong>Name:</strong> ${data.name}</p>
        <p style="color: #333;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <div style="background-color: #f4f6f8; padding: 15px; border-left: 4px solid #d9534f; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #333;">Message:</p>
            <p style="margin: 10px 0 0 0; color: #444;">${data.message}</p>
        </div>
        <p style="color: #888; font-size: 12px;">Received at: ${new Date().toLocaleString()}</p>
        </div>
        `;


    console.log("Sending admin notification email");

    const info = await transporter.sendMail({
        from: `"Portfolio Alerts" <${env.SMTP_USER}>`,
        to: env.ADMIN_EMAIL,
        subject: `New Contact Form Submission from ${data.name}`,
        html: htmlContent,
        text: data.message,
    });

    console.log("Transporter sendMail success (Admin)! Message ID:", info.messageId);
};

export const sendContactEmails = async (data: IContactEmailData): Promise<void> => {
    try {
        await new Promise((resolve, reject) => {
            console.log("SMTP HOST", env.SMTP_HOST);
            console.log("SMTP PORT", env.SMTP_PORT);
            console.log("SMTP USER", env.SMTP_USER);
            console.log("ADMIN EMAIL", env.ADMIN_EMAIL);

            transporter.verify((error) => {
                console.log("Transporter verifying");
                if (error) {
                    console.log("Transporter verification problem!", error);
                    reject(error);
                } else {
                    console.log("Transporter verification success!");
                    resolve(true);
                }
            });
        });

        await Promise.all([
            sendUserConfirmationEmail(data),
            sendAdminNotificationEmail(data)
        ]);
    } catch (error) {
        console.error("❌ Error sending contact emails:", error);
    }
};

export const NodemailerManager = {
    sendUserConfirmationEmail,
    sendAdminNotificationEmail,
    sendContactEmails,
};
