const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const enviar = async ({ recipient, sender, assunto, body }) => {
  const msg = {
    to: recipient,
    from: sender,
    subject: assunto,
    html: body,
  };

  await sendgrid.send(msg);
  console.log('O e-mail foi enviado com success!');
};

module.exports = {
  enviar,
};
