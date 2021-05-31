const enviar = async ({ destinatario, remetente, assunto, corpo }) => {

  const msg = {
    to: destinatario,
    from: remetente,
    subject: assunto,
    text: corpo,
  }

  await sendgrid
    .send(msg)

  console.log('E-MAIL ENVIADO COM <SUCESSO!></SUCESSO!>');

}

module.exports = {
  enviar,
}
