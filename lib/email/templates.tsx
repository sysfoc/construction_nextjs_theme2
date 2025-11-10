export function quoteRequestTemplate(name: string, email: string, phone: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6600; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
          .info { margin: 15px 0; }
          .label { font-weight: bold; color: #ff6600; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Quote Request Received</h2>
          </div>
          <div class="content">
            <p>Hi, A new quote request has been submitted. Here are the details:</p>
            <div class="info">
              <span class="label">Name:</span> ${name}
            </div>
            <div class="info">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="info">
              <span class="label">Phone:</span> ${phone}
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              Please log in to your dashboard to view the full details and project information.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function contactMessageTemplate(name: string, email: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6600; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
          .info { margin: 15px 0; }
          .label { font-weight: bold; color: #ff6600; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Message</h2>
          </div>
          <div class="content">
            <p>Hi, A new message has been received through the contact form:</p>
            <div class="info">
              <span class="label">Name:</span> ${name}
            </div>
            <div class="info">
              <span class="label">Email:</span> ${email}
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              Please log in to your dashboard to view the full message.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function jobApplicationTemplate(
  firstName: string,
  lastName: string,
  email: string,
  position: string,
  phone: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6600; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
          .info { margin: 15px 0; }
          .label { font-weight: bold; color: #ff6600; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application</h2>
          </div>
          <div class="content">
            <p>Hi, A new job application has been submitted. Here are the details:</p>
            <div class="info">
              <span class="label">Name:</span> ${firstName} ${lastName}
            </div>
            <div class="info">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="info">
              <span class="label">Phone:</span> ${phone}
            </div>
            <div class="info">
              <span class="label">Position:</span> ${position}
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              Please log in to your dashboard to review the full application including CV and cover letter.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function serviceBookingTemplate(
  name: string,
  email: string,
  phone: string,
  service: string,
  date: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6600; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
          .info { margin: 15px 0; }
          .label { font-weight: bold; color: #ff6600; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Service Booking</h2>
          </div>
          <div class="content">
            <p>Hi, A new service booking has been submitted. Here are the details:</p>
            <div class="info">
              <span class="label">Name:</span> ${name}
            </div>
            <div class="info">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="info">
              <span class="label">Phone:</span> ${phone}
            </div>
            <div class="info">
              <span class="label">Service:</span> ${service}
            </div>
            <div class="info">
              <span class="label">Preferred Date:</span> ${date}
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              Please log in to your dashboard to view the full booking details and project specifications.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

