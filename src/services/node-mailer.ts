import {createTransport, Transporter} from 'nodemailer';
import { email } from '../types/email';
export let transporter: Transporter;

if(process.env.NODE_ENV === 'production'){
    transporter = createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.PROD_MAIL_USER,
            pass: process.env.PROD_MAIL_APP_PASSWORD
        },
    });
}else{
    transporter = createTransport({
        host: 'localhost',
        port: 1025
    });
}


export async function sendMail(to: string, subject: string, html: string){
    //TODO: The From must be the same as the user in the transporter
    let info = await transporter.sendMail({
        from: '"Semicolon HR" <hr.semicolon.asu@gmail.com>',
        to: to, 
        subject: subject, 
        html: html, 
      });
}

export async function sendBulkEmail(emails: email[]): Promise<void>{
    for (const email of emails) {
      await sendMail(email.to, email.subject, email.html);
    }
  }

export default transporter;
