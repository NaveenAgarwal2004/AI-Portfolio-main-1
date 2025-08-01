const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// 📩 Email to Admin (from contact form)
const sendContactEmail = async ({ name, email, message }) => {
  try {
    await resend.emails.send({
      from: 'Naveen Agarwal <onboarding@resend.dev>', // Verified domain sender
      to: 'naveenagarwal7624@gmail.com',               // Your admin inbox
      replyTo: email,                                  // So you can reply directly
      subject: 'New Contact Message from Portfolio',
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
    throw new Error('Failed to send contact email');
  }
};

// 🤖 Auto Reply to User
const sendAutoReply = async ({ name, email }) => {
  try {
    await resend.emails.send({
      from: 'Naveen Agarwal <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for contacting me!',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out through my portfolio website.</p>
        <p>I’ve received your message and will get back to you shortly.</p>
        <p>Regards,<br><strong>Naveen Agarwal</strong></p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('⚠️ Failed to send auto-reply:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  resend,
  sendContactEmail,
  sendAutoReply
};
