import nodemailer from "nodemailer";
import { logger } from "./logger.js";
import env from '../config/environment.config.js'

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASS,
    },
  });


export async function registerEmail({ recipient }) {
    const result = await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: recipient,
        subject: "Welcome to Precinct",
        html: `
                  <div>
                      <h1>Thank you!</h1>
                      <h3>You have successfully registered your email in our e-commerce</h3>
                      <p><em>Correo de pruebas para el curso de backend de Coderhouse.</em></p>
                  </div>
              `,
    });
    logger.debug(result);
    return result
}

export async function orderEmail({ recipient, order }) {
    const result = await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: recipient,
        subject: `Order ${order}`,
        html: `
                  <div>
                      <h1>Order confirmed!</h1>
                      <h3>Your order has been placed</h3>
                      <p><em>Correo de pruebas para el curso de backend de Coderhouse.</em></p>
                  </div>
              `,
    });
    return result
}

export async function recoverEmail({ recipient, token }) {
    const result = await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: recipient,
        subject: `Password recovery`,
        html: `
                  <div>
                      <h3>Forgot your password?</h3>
                      <p>We received a request to reset the password for your account.</p>
                      <p>To reset your password, click on the button below</p>

                      <a href="${env.apiUrl}/auth/pass-change?token=${token}&email=${recipient}"><button>Reset password</button></a>	

                      <p>or copy and paste the link below in your browser</p>
                      <p>${env.apiUrl}/auth/pass-change?token=${token}&email=${recipient}</p>

                      <p>The link will expire in 1 hour.</p>

                  </div>
              `,
    });
    return result
}


//--------------------TWILIO----------------------------
import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export async function sendSms() {
    const result = await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+61434830695",
        body: "que onda che",
    });
    
    logger.debug(result);
}