const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const enviar = async ({ destinatario, remetente, assunto, corpo }) => {

  const msg = {
    to: destinatario, // Change to your recipient
    from: remetente, // Change to your verified sender
    subject: assunto,
    text: corpo,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  await sgMail
    .send(msg)

  console.log('E-MAIL ENVIADO');

}

module.exports = {
  enviar,
}

