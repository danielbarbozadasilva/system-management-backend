const EmailHabilitar = (titulo, menssagem, url) => {
  return ` 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title></title>

    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
      rel="stylesheet"
    />

    <style>
      a {
        text-decoration: none;
      }
      sup {
        font-size: 100% !important;
      }

      .rollover:hover .rollover-first {
        max-height: 0px !important;
        display: none !important;
      }

      .rollover:hover .rollover-second {
        max-height: none !important;
        display: block !important;
      }

      #outlook a {
        padding: 0;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      .es-button-border:hover {
        border-style: solid solid solid solid !important;
        background: #0b317e !important;
        border-color: #42d159 #42d159 #42d159 #42d159 !important;
      }

      .es-button-border:hover a.es-button,
      .es-button-border:hover button.es-button {
        background: #0b317e !important;
        border-color: #0b317e !important;
      }

      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 10px 20px 10px 20px !important;
      }

      [data-ogsb] .es-button.es-button-1625641687235 {
        padding: 10px 20px !important;
      }

      [data-ogsb] .es-button.es-button-1625641687239 {
        padding: 10px 20px !important;
      }

      td .es-button-border:hover a.es-button-1625643544548 {
        background: #0b5394 !important;
        border-color: #0b5394 !important;
        color: #ffffff !important;
      }

      td .es-button-border-1626207534692:hover {
        background: #0b5394 !important;
      }
      body {
        width: 100%;
        font-family: roboto, "helvetica neue", helvetica, arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
      }

      table td,
      body,
      .es-wrapper {
        padding: 0;
        margin: 0;
      }

      .es-content,
      .es-header,
      .es-footer {
        table-layout: fixed !important;
        width: 100%;
      }

      img {
        display: block;
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p,
      hr {
        margin: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 0;
        line-height: 120%;
        mso-line-height-rule: exactly;
        font-family: roboto, "helvetica neue", helvetica, arial, sans-serif;
      }

      p,
      ul li,
      ol li,
      a {
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        mso-line-height-rule: exactly;
      }

      .es-left {
        float: left;
      }

      .es-right {
        float: right;
      }

      .es-p5 {
        padding: 5px;
      }

      .es-p5t {
        padding-top: 5px;
      }

      .es-p5b {
        padding-bottom: 5px;
      }

      .es-p5l {
        padding-left: 5px;
      }

      .es-p5r {
        padding-right: 5px;
      }

      .es-p10 {
        padding: 10px;
      }

      .es-p10t {
        padding-top: 10px;
      }

      .es-p10b {
        padding-bottom: 10px;
      }

      .es-p10l {
        padding-left: 10px;
      }

      .es-p10r {
        padding-right: 10px;
      }

      .es-p15 {
        padding: 15px;
      }

      .es-p15t {
        padding-top: 15px;
      }

      .es-p15b {
        padding-bottom: 15px;
      }

      .es-p15l {
        padding-left: 15px;
      }

      .es-p15r {
        padding-right: 15px;
      }

      .es-p20 {
        padding: 20px;
      }

      .es-p20t {
        padding-top: 20px;
      }

      .es-p20b {
        padding-bottom: 20px;
      }

      .es-p20l {
        padding-left: 20px;
      }

      .es-p20r {
        padding-right: 20px;
      }

      .es-p25 {
        padding: 25px;
      }

      .es-p25t {
        padding-top: 25px;
      }

      .es-p25b {
        padding-bottom: 25px;
      }

      .es-p25l {
        padding-left: 25px;
      }

      .es-p25r {
        padding-right: 25px;
      }

      .es-p30 {
        padding: 30px;
      }

      .es-p30t {
        padding-top: 30px;
      }

      .es-p30b {
        padding-bottom: 30px;
      }

      .es-p30l {
        padding-left: 30px;
      }

      .es-p30r {
        padding-right: 30px;
      }

      .es-p35 {
        padding: 35px;
      }

      .es-p35t {
        padding-top: 35px;
      }

      .es-p35b {
        padding-bottom: 35px;
      }

      .es-p35l {
        padding-left: 35px;
      }

      .es-p35r {
        padding-right: 35px;
      }

      .es-p40 {
        padding: 40px;
      }

      .es-p40t {
        padding-top: 40px;
      }

      .es-p40b {
        padding-bottom: 40px;
      }

      .es-p40l {
        padding-left: 40px;
      }

      .es-p40r {
        padding-right: 40px;
      }

      .es-menu td {
        border: 0;
      }

      .es-menu td a img {
        display: inline !important;
      }

      s {
        text-decoration: line-through;
      }

      p,
      ul li,
      ol li {
        font-family: roboto, "helvetica neue", helvetica, arial, sans-serif;
        line-height: 150%;
      }

      ul li,
      ol li {
        margin-bottom: 15px;
      }

      a {
        text-decoration: underline;
      }

      .es-menu td a {
        text-decoration: none;
        display: block;
      }

      .es-wrapper {
        width: 100%;
        height: 100%;
        background-image: ;
        background-repeat: repeat;
        background-position: center top;
      }

      .es-wrapper-color {
        background-color: #f8f9fd;
      }

      .es-header {
        background-color: transparent;
        background-image: ;
        background-repeat: repeat;
        background-position: center top;
      }

      .es-header-body {
        background-color: transparent;
      }

      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li {
        color: #333333;
        font-size: 14px;
      }

      .es-header-body a {
        color: #1376c8;
        font-size: 14px;
      }

      .es-content-body {
        background-color: transparent;
      }

      .es-content-body p,
      .es-content-body ul li,
      .es-content-body ol li {
        color: #131313;
        font-size: 16px;
      }

      .es-content-body a {
        color: #2cb543;
        font-size: 16px;
      }

      .es-footer {
        background-color: #0a2b6e;
        background-image: url(https://pjnogm.stripocdn.email/content/guids/CABINET_9bfedeeeb9eeabe76f8ff794c5e228f9/images/2191625641866113.png);
        background-repeat: repeat;
        background-position: center center;
      }

      .es-footer-body {
        background-color: transparent;
      }

      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li {
        color: #212121;
        font-size: 16px;
      }

      .es-footer-body a {
        color: #ffffff;
        font-size: 16px;
      }

      .es-infoblock,
      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li {
        line-height: 120%;
        font-size: 12px;
        color: #ffffff;
      }

      .es-infoblock a {
        font-size: 12px;
        color: #ffffff;
      }

      h1 {
        font-size: 30px;
        font-style: normal;
        font-weight: bold;
        color: #212121;
      }

      h2 {
        font-size: 24px;
        font-style: normal;
        font-weight: bold;
        color: #212121;
      }

      h3 {
        font-size: 20px;
        font-style: normal;
        font-weight: normal;
        color: #212121;
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 30px;
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 24px;
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 20px;
      }

      a.es-button,
      button.es-button {
        border-style: solid;
        border-color: #071f4f;
        border-width: 10px 20px 10px 20px;
        display: inline-block;
        background: #071f4f;
        border-radius: 5px;
        font-size: 16px;
        font-family: roboto, "helvetica neue", helvetica, arial, sans-serif;
        font-weight: normal;
        font-style: normal;
        line-height: 120%;
        color: #ffffff;
        text-decoration: none;
        width: auto;
        text-align: center;
      }

      .es-button-border {
        border-style: solid solid solid solid;
        border-color: #2cb543 #2cb543 #2cb543 #2cb543;
        background: #071f4f;
        border-width: 0px 0px 0px 0px;
        display: inline-block;
        border-radius: 5px;
        width: auto;
      }

      .es-button img {
        display: inline-block;
        vertical-align: middle;
      }

      @media only screen and (max-width: 600px) {
        .st-br {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }

        h1 {
          font-size: 30px !important;
          text-align: center;
          line-height: 120% !important;
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 120% !important;
        }

        h3 {
          font-size: 20px !important;
          text-align: center;
          line-height: 120% !important;
        }

        h1 a {
          text-align: center;
        }

        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
        }

        h2 a {
          text-align: center;
        }

        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 26px !important;
        }

        h3 a {
          text-align: center;
        }

        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
        }

        .es-menu td a {
          font-size: 14px !important;
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important;
        }

        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 16px !important;
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }

        *[class="gmail-fix"] {
          display: none !important;
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }

        .es-button-border {
          display: block !important;
        }

        a.es-button,
        button.es-button {
          font-size: 16px !important;
          display: block !important;
          border-left-width: 0px !important;
          border-right-width: 0px !important;
        }

        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }

        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }

        .es-m-p0 {
          padding: 0 !important;
        }

        .es-m-p0r {
          padding-right: 0 !important;
        }

        .es-m-p0l {
          padding-left: 0 !important;
        }

        .es-m-p0t {
          padding-top: 0 !important;
        }

        .es-m-p0b {
          padding-bottom: 0 !important;
        }

        .es-m-p20b {
          padding-bottom: 20px !important;
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }

        tr.es-desk-hidden {
          display: table-row !important;
        }

        table.es-desk-hidden {
          display: table !important;
        }

        td.es-desk-menu-hidden {
          display: table-cell !important;
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }

        table.es-social {
          display: inline-block !important;
        }

        table.es-social td {
          display: inline-block !important;
        }

        .es-m-p5 {
          padding: 5px !important;
        }

        .es-m-p5t {
          padding-top: 5px !important;
        }

        .es-m-p5b {
          padding-bottom: 5px !important;
        }

        .es-m-p5r {
          padding-right: 5px !important;
        }

        .es-m-p5l {
          padding-left: 5px !important;
        }

        .es-m-p10 {
          padding: 10px !important;
        }

        .es-m-p10t {
          padding-top: 10px !important;
        }

        .es-m-p10b {
          padding-bottom: 10px !important;
        }

        .es-m-p10r {
          padding-right: 10px !important;
        }

        .es-m-p10l {
          padding-left: 10px !important;
        }

        .es-m-p15 {
          padding: 15px !important;
        }

        .es-m-p15t {
          padding-top: 15px !important;
        }

        .es-m-p15b {
          padding-bottom: 15px !important;
        }

        .es-m-p15r {
          padding-right: 15px !important;
        }

        .es-m-p15l {
          padding-left: 15px !important;
        }

        .es-m-p20 {
          padding: 20px !important;
        }

        .es-m-p20t {
          padding-top: 20px !important;
        }

        .es-m-p20r {
          padding-right: 20px !important;
        }

        .es-m-p20l {
          padding-left: 20px !important;
        }

        .es-m-p25 {
          padding: 25px !important;
        }

        .es-m-p25t {
          padding-top: 25px !important;
        }

        .es-m-p25b {
          padding-bottom: 25px !important;
        }

        .es-m-p25r {
          padding-right: 25px !important;
        }

        .es-m-p25l {
          padding-left: 25px !important;
        }

        .es-m-p30 {
          padding: 30px !important;
        }

        .es-m-p30t {
          padding-top: 30px !important;
        }

        .es-m-p30b {
          padding-bottom: 30px !important;
        }

        .es-m-p30r {
          padding-right: 30px !important;
        }

        .es-m-p30l {
          padding-left: 30px !important;
        }

        .es-m-p35 {
          padding: 35px !important;
        }

        .es-m-p35t {
          padding-top: 35px !important;
        }

        .es-m-p35b {
          padding-bottom: 35px !important;
        }

        .es-m-p35r {
          padding-right: 35px !important;
        }

        .es-m-p35l {
          padding-left: 35px !important;
        }

        .es-m-p40 {
          padding: 40px !important;
        }

        .es-m-p40t {
          padding-top: 40px !important;
        }

        .es-m-p40b {
          padding-bottom: 40px !important;
        }

        .es-m-p40r {
          padding-right: 40px !important;
        }

        .es-m-p40l {
          padding-left: 40px !important;
        }
      }

      .es-p-default {
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 0px;
        padding-left: 20px;
      }

      .es-p-all-default {
        padding: 0px;
      }
    </style>
  </head>

  <body>
    <div class="es-wrapper-color">
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td class="esd-email-paddings" valign="top">
              <table
                cellpadding="0"
                cellspacing="0"
                class="esd-header-popover es-header"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="rgba(0, 0, 0, 0)"
                        class="es-header-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="
                                esd-structure
                                es-p10t es-p15b es-p30r es-p30l
                              "
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="540"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-image"
                                              style="font-size: 0px"
                                            >
                                              <a target="_blank"
                                                ><img
                                                  class="adapt-img"
                                                  src="https://pjnogm.stripocdn.email/content/guids/CABINET_bf731fdfebd851d178f90e62aab979c4/images/10571626206621526.png"
                                                  alt
                                                  style="display: block"
                                                  width="285"
                                              /></a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe"
                      align="center"
                      bgcolor="#f8f9fd"
                      style="background-color: #f8f9fd"
                    >
                      <table
                        bgcolor="transparent"
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                        style="background-color: transparent"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="
                                esd-structure
                                es-p20t es-p10b es-p20r es-p20l
                              "
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="560"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-text es-p10b"
                                            >
                                              <h1 style="color: #838080">
                                                Bem-vindo ao Sistema Regale!
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              class="
                                                esd-block-text
                                                es-p10t es-p10b
                                              "
                                            >
                                              <p style="color: #5b5858">
                                                O Administrador ativou o seu
                                                acesso ao sistema.
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="
                                esd-structure
                                es-p15t es-m-p15t es-m-p0b es-m-p0r es-m-p0l
                              "
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="600"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-image"
                                              style="font-size: 0px"
                                            >
                                              <a target="_blank"
                                                ><img
                                                  class="adapt-img"
                                                  src="https://pjnogm.stripocdn.email/content/guids/CABINET_1ce849b9d6fc2f13978e163ad3c663df/images/3991592481152831.png"
                                                  alt
                                                  style="display: block"
                                                  width="600"
                                              /></a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-footer"
                align="center"
                style="background-position: center center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe"
                      align="center"
                      bgcolor="#f5f7f9"
                      style="background-color: #f5f7f9"
                    >
                      <table
                        bgcolor="rgba(0, 0, 0, 0)"
                        class="es-footer-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="
                                esd-structure
                                es-p40t
                                es-p40b
                                es-m-p40t
                                es-m-p40b
                                es-m-p20r
                                es-m-p20l
                              "
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="600"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        bgcolor="#f0f3fe"
                                        style="
                                          background-color: #f0f3fe;
                                          border-radius: 20px;
                                          border-collapse: separate;
                                        "
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="
                                                esd-block-text
                                                es-p25t es-p10b es-p20r es-p20l
                                              "
                                            >
                                              <h1
                                                style="
                                                  text-align: center;
                                                  line-height: 150%;
                                                  color: #838080;
                                                "
                                              >
                                                Acesse já a sua conta.
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              class="
                                                esd-block-button
                                                es-p10t
                                                es-p25b
                                                es-p20r
                                                es-p20l
                                                es-m-p15t
                                                es-m-p20b
                                                es-m-p20r
                                                es-m-p20l
                                              "
                                            >
                                              <span
                                                class="
                                                  es-button-border-1626207534692
                                                  es-button-border
                                                "
                                                style="background: #3d85c6"
                                                ><a
                                                  href="${url}"
                                                  class="
                                                    es-button
                                                    es-button-1625643544548
                                                  "
                                                  target="_blank"
                                                  style="
                                                    border-width: 10px 20px;
                                                    font-size: 14px;
                                                    background: #3d85c6;
                                                    border-color: #3d85c6;
                                                  "
                                                  >Acessar
                                                  <img
                                                    src="https://pjnogm.stripocdn.email/content/guids/CABINET_1ce849b9d6fc2f13978e163ad3c663df/images/32371592816290258.png"
                                                    alt="icon"
                                                    width="16"
                                                    class="esd-icon-right"
                                                    align="absmiddle"
                                                    style="margin-left: 10px"
                                                  /> </a
                                              ></span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content esd-footer-popover"
                align="center"
              >
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table
                        bgcolor="#ffffff"
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="es-p20t es-p20r es-p20l esd-structure"
                              align="left"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="560"
                                      class="esd-container-frame"
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-text"
                                            >
                                              <p>
                                                Desenvolvido por Daniel Barboza
                                                da Silva
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

 
    `
};

module.exports = { EmailHabilitar };
