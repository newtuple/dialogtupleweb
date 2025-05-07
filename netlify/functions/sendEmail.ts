import nodemailer from 'nodemailer';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL_FROM,
      to: 'sharad@newtuple.com',
      subject: 'New Demo Request from DialogTuple',
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'No message provided.'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);


    return {
      statusCode: 200,
      body: JSON.stringify({ success: true,mailOptions }),
    };
  } catch (err) {
    console.error('Send email error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Failed to send email' }),
    };
  }
};