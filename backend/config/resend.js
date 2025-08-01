const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async (contactData) => {
  try {
    const { name, email, message } = contactData;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Contact</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #374151; margin-bottom: 5px; display: block; }
            .value { background: white; padding: 15px; border-radius: 5px; border: 1px solid #d1d5db; }
            .message-box { min-height: 100px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact from Portfolio</h1>
              <p>Naveen Agarwal Portfolio</p>
            </div>
            <div class="content">
              <div class="field">
                <label class="label">Name:</label>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <label class="label">Email:</label>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <label class="label">Message:</label>
                <div class="value message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio contact form.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Portfolio Contact <noreply@naveen-portfolio.com>',
      to: process.env.ADMIN_EMAIL || 'admin@naveen-portfolio.com',
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      html: emailHtml,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const sendAutoReply = async (contactData) => {
  try {
    const { name, email } = contactData;
    
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting me</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
              <p>Your message has been received</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
              <p>I appreciate your interest in my work and look forward to connecting with you!</p>
              <p>Best regards,<br><strong>Naveen Agarwal</strong><br>Front-End Web Developer</p>
            </div>
            <div class="footer">
              <p>This is an automated response from Naveen Agarwal's portfolio.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'Naveen Agarwal <noreply@naveen-portfolio.com>',
      to: email,
      subject: 'Thank you for your message - Naveen Agarwal',
      html: autoReplyHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    // Don't throw error for auto-reply failure - it's not critical
    return { success: false, error: error.message };
  }
};

module.exports = {
  resend,
  sendContactEmail,
  sendAutoReply
};