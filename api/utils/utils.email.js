const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const UltilSendEmail = async ({ recipient, sender, subject, body }) => {
  const msg = {
    to: recipient,
    from: sender,
    subject: subject,
    html: body,
  };

  const resultSend = await sendgrid.send(msg);
  if (resultSend) {
    return {
      success: true,
      message: 'The email was sent successfully.',
    };
  } else {
    return {
      success: false,
      message: 'Error sending the e-mail.',
    };
  }
};

module.exports = {
  UltilSendEmail,
};
