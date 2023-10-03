import { createTransport, Transporter } from 'nodemailer'
import { dbUpdateParticipant } from '../models/participant/participant.model'
import { StatusEnum } from '../models/participant/participant.schema'
import { Email } from '../types/email'
import { EmailTypeEnum } from '../utils/constructors/email.constructors'

export let transporter: Transporter

if (process.env.NODE_ENV === 'production') {
    transporter = createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.PROD_MAIL_USER,
            pass: process.env.PROD_MAIL_APP_PASSWORD,
        },
    })
} else {
    transporter = createTransport({
        host: 'localhost',
        port: 1025,
    })
}

export async function sendMail(to: string, subject: string, html: string) {
    //TODO: The From must be the same as the user in the transporter
    await transporter.sendMail({
        from: '"Semicolon HR" <hr.semicolon.asu@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    })
}

export async function sendBulkEmail(emails: Email[]): Promise<void> {
    type EmailTypeToStatusType = {
        [key in EmailTypeEnum]: StatusEnum
    }
    //TODO:: fix initial duplicates problem
    const EmailTypeToStatus: EmailTypeToStatusType = {
        [EmailTypeEnum.INITIAL]: StatusEnum.PENDING,
        [EmailTypeEnum.INTERVIEW]: StatusEnum.EMAILED,
        [EmailTypeEnum.ACCEPTANCE]: StatusEnum.ACCEPTED,
        [EmailTypeEnum.REJECTION]: StatusEnum.REJECTED,
    }
    // TODO:: change status according to email type
    for (const email of emails) {
        await sendMail(email.to, email.subject, email.html)
        await dbUpdateParticipant(
            {
                acceptanceStatus:
                    EmailTypeToStatus[email.type as EmailTypeEnum],
            },
            { phone: email.phone },
        )
    }
}

export default transporter
