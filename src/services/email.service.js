import { registerEmail, orderEmail } from "../utils/email.js"

class EmailService {

    async register({ email }) {
        const emailResponse = await registerEmail({ recipient: email });
        return emailResponse
    }

    async order({ email, order }) {
        const emailResponse = await orderEmail({ recipient: email, order });
        return emailResponse
    }

}

export const emailService = new EmailService()
