import { randomBytes } from 'crypto';
import { TokenModel, UserModel } from '../dao/factory.js';
import { deleteProduct, orderEmail, recoverEmail, registerEmail } from "../utils/email.js";
import { createHash } from '../utils/passEncryption.js';

const tokenModel = new TokenModel();
const userModel = new UserModel();

class EmailService {

    async register({ email }) {
        const emailResponse = await registerEmail({ recipient: email });
        return emailResponse
    }

    async order({ email, order }) {
        const emailResponse = await orderEmail({ recipient: email, order });
        return emailResponse
    }

    async deleteProduct({ owner, title, code }) {
        const emailResponse = await deleteProduct({ recipient: owner, title, code });
        return emailResponse
    }

    async createToken({ email }) {
        try {
            const token = randomBytes(20).toString('hex');
            const expiration = Date.now() + 3600000;
            await tokenModel.createToken({ email, token, expiration });
            await recoverEmail({ recipient: email, token });
            return token
        } catch (error) {
            throw new Error('Error creating token')
        }
    }

    async findToken({ token, email }) {
        const tokenFound = await tokenModel.findToken({ token, email });
        return tokenFound
    }

    async passChange({ email, password, password2 }) {
        try {
            const samePassword = password === password2;
            if (samePassword) {
                const newPass = createHash(password);
                await userModel.updatePassword({ email, password: newPass });
                return "Your password has been updated successfully."
            }
            else {
                throw new Error ("Passwords dont match");
            }
        } catch (error) {
            return "Error resetting the password. " + error;
        }
        
    }

}

export const emailService = new EmailService()
