import {createTransport, Transporter} from 'nodemailer';
let transporter: Transporter;

// if(process.env.NODE_ENV === 'production'){
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
// }else{
//     transporter = createTransport({
//         host: 'localhost',
//         port: 1025
//     });
// }


async function sendMail(to: string, subject: string, html: string){
    //TODO: The From must be the same as the user in the transporter
    let info = await transporter.sendMail({
        from: '"Semicolon HR" <hr.semicolon.asu@gmail.com>',
        to: to, 
        subject: subject, 
        html: html, 
      });
}

export default transporter;
export {transporter, sendMail};