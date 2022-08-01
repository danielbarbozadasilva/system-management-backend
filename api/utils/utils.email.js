const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const UtilSendEmail = async ({ to, from, subject, text, html }) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email successfully sent')
    })
    .catch((error) => {
      console.log('Error sending the e-mail', error)
    })
}

module.exports = {
  UtilSendEmail
}
