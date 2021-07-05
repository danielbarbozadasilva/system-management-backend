const EmailDesativar = (titulo, menssagem, url) => {
  return ` 
<table style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;" align="left" bgcolor="#ffffff">
<h1 style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: -1px; line-height: 48px;">&nbsp;</h1>
</td>
</tr>
</tbody>
</table>
Sistema REGALE</td>
</tr>
<tr>
<td align="center" bgcolor="#e9ecef">
<table style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><!-- start copy -->
<tbody>
<tr>
<td style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;" align="left" bgcolor="#ffffff">
<p style="margin: 0;">O seu acesso ao sistema REGALE foi Desativado pelo Administrador! 

E-mail automático, por favor não responder a este e-mail.</p>
</td>
</tr>

<!-- [if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]--></td>
</tr>
<!-- end copy block --> <!-- start footer -->
<tr>
<td style="padding: 24px;" align="center" bgcolor="#e9ecef"><!-- [if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
<table style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><!-- start permission -->
<tbody>
<tr>
<td style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;" align="center" bgcolor="#e9ecef">
<p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
</td>
</tr>
<!-- end permission --> <!-- start unsubscribe -->
<tr>
<td style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;" align="center" bgcolor="#e9ecef">
<p style="margin: 0;">To stop receiving these emails, you can <a href="https://sendgrid.com" target="_blank">unsubscribe</a> at any time.</p>
<p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
</td>
</tr>
<!-- end unsubscribe --></tbody>
</table>
<!-- [if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]--></td>
</tr>
<!-- end footer --></tbody>
</table>
<!-- end body -->
    
    `;
};

module.exports = {EmailDesativar}