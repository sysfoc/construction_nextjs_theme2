import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendNewsletter(
  recipientEmail: string,
  subject: string,
  content: string
) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #ff6600; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
              .newsletter-body { margin: 20px 0; }
              .newsletter-body p { margin: 10px 0; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>${subject}</h2>
              </div>
              <div class="content">
                <div class="newsletter-body">
                  ${content
                    .split("\n")
                    .map((line) => (line.trim() ? `<p>${line}</p>` : "<br>"))
                    .join("")}
                </div>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
