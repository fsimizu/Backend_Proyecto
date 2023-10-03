import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program
  .option("--mode <mode>", "Enviroment", 'DEVELOPMENT');
program.parse();

dotenv.config({
  path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production',
});

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  githubSecret: process.env.GITHUB_SECRET,
  githubClient: process.env.GITHUB_CLIENT,
  persistence: process.env.PERSISTENCE,
  apiUrl: process.env.API_URL,
  googleEmail: process.env.GOOGLE_EMAIL,
  googlePass: process.env.GOOGLE_PASS,
  twilioAccount: process.env.TWILIO_ACCOUNT_SID,
  twilioToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_PHONE_NUMBER,
}