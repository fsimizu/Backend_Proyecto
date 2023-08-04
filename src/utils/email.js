import nodemailer from "nodemailer";

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
    // console.log(result);
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

    console.log(result);
}