const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const enviar = async ({ destinatario, remetente, assunto, corpo }) => {
  const msg = {
    to: destinatario, 
    from: remetente, 
    subject: assunto,
    text: corpo,
  }

  await sendgrid.send(msg)
  console.log('O e-mail foi envia com sucesso!');
}

module.exports = {
  enviar
}
