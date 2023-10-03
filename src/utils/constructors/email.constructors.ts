import {
    PreferencesEnum,
    StatusEnum,
} from '../../models/participant/participant.schema'
import { Email, EmailBodyOptions } from '../../types/email'
import { participant as ParticipantType } from '../../types/participant'

export enum EmailTypeEnum {
    INITIAL = 'initial',
    INTERVIEW = 'interview',
    ACCEPTANCE = 'acceptance',
    REJECTION = 'rejection',
}

const emailBodyOptions: EmailBodyOptions = {
    [PreferencesEnum.C_PROG]: {
        title: 'C/Embedded C',
        link: 'http://bit.ly/semicolon-interviews',
        startDate: 'the beginning of July',
        endDate: 'June 26, 2023',
    },
    [PreferencesEnum.DIGITAL_DESIGN]: {
        title: 'Digital design',
        link: 'https://shorturl.at/lBFS9',
        startDate: 'the beginning of July',
        endDate: 'June 26, 2023',
    },
    [PreferencesEnum.FULLSTACK]: {
        title: 'Fullstack',
        link: 'https://shorturl.at/koqH2',
        startDate: 'the beginning of July',
        endDate: 'June 26, 2023',
    },
    [PreferencesEnum.FRONTEND]: {
        title: 'Frontend',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.REACT]: {
        title: 'React',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.PYTHON]: {
        title: 'Python',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.AVR]: {
        title: 'AVR',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.ARM]: {
        title: 'ARM',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.NODEJS]: {
        title: 'NodeJS',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.FLUTTER]: {
        title: 'Flutter',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
    [PreferencesEnum.DESKTOP]: {
        title: 'Desktop',
        link: 'Place holder',
        startDate: 'the beginning of August',
        endDate: 'Place holder',
    },
}

function ConstructBulkInitialEmails(participants: ParticipantType[]): Email[] {
    participants = participants.filter(
        (participant) => participant.acceptanceStatus === StatusEnum.PENDING,
    )
    const emails: Email[] = []
    for (const participant of participants) {
        const bodyOptions = emailBodyOptions[participant.firstPreference]
        const emailBody: string = `<html><p>Dear Applicant,</p><div style='width:50%'><p>We would like to extend our appreciation for your interest in applying to Semicolon workshops Program.We are glad to inform you that after reviewing your application, you have passed the filtration phase with the pool of selected applicants who fit our workshop criteria. You will receive another email soon to schedule an interview within the next week.</p><p>The ${participant.firstPreference} workshop will start at ${bodyOptions.startDate}.</p><p>If you have any questions, please contact us through our Facebook page. Please do not reply to this email.</p><p>Best wishes,<br>SemiColon team</p></div></html>`
        const email: Email = {
            to: participant.email,
            subject: 'Semicolon Workshop Application',
            html: emailBody,
            phone: participant.phone,
            type: EmailTypeEnum.INITIAL,
        }
        emails.push(email)
    }
    return emails
}
function ConstructBulkInterviewEmail(participants: ParticipantType[]): Email[] {
    participants = participants.filter((participant) => {
        return (
            participant.acceptanceStatus !== StatusEnum.EMAILED &&
            participant.acceptanceStatus !== StatusEnum.REJECTED &&
            participant.acceptanceStatus !== StatusEnum.FILTERED &&
            participant.acceptanceStatus !== StatusEnum.ACCEPTED
        )
    })
    const emails: Email[] = []

    for (const participant of participants) {
        let bodyOptions =
            emailBodyOptions[participant.firstPreference as PreferencesEnum]
        let emailBody = `<p>Dear ${participant.name},</p><p>We are writing to inform you that the interview schedule for the ${bodyOptions.title} workshop is now available.<br> Please find your designated interview time below: <br> <a href="${bodyOptions.link}"> http://bit.ly/semicolon-interviews</a> <br> </p><p>The interviews will be conducted via Google Meet with your camera on. Please ensure that you have a stable internet connection and a quiet environment during the interview.</p><p>Slots will be added every day, so please check back if you do not see a time that is suitable for you. The last day of interviews is ${bodyOptions.endDate}.</p><p>If you have any questions, please contact us through our Facebook page. Please do not reply to this email.</p><p>Thank you for your interest in the workshop. We look forward to hearing from you soon.</p><p>Best regards,<br>SemiColon team</p>`
        const email: Email = {
            to: participant.email,
            subject: 'Semicolon Workshop Interview',
            html: emailBody,
            phone: participant.phone,
            type: EmailTypeEnum.INTERVIEW,
        }
        emails.push(email)
    }
    return emails
}

function ConstructBulkAcceptanceEmail(
    participants: ParticipantType[],
): Email[] {
    //TODO:: add a new field in participant to indicate if the participant has been emailed or not acceptance or rejection as it won't change status
    participants = participants.filter(
        (participant) => participant.acceptanceStatus === StatusEnum.ACCEPTED,
    )
    const emails: Email[] = []
    //TODO:: generate emails based on template for acceptance
    for (const participant of participants) {
        const bodyOptions = emailBodyOptions[participant.firstPreference]
        let emailBody = `<p>Dear ${participant.name}</p><p>We are pleased to inform you that you have been accepted to the ${bodyOptions.title} workshop.<p>We look forward to hearing from you soon.</p><p>If you have any questions, please contact us through our Facebook page. Please do not reply to this email.</p><p>Best regards,<br>SemiColon team</p>`
        const email: Email = {
            to: participant.email,
            subject: 'Semicolon Workshop Interview',
            html: emailBody,
            phone: participant.phone,
            type: EmailTypeEnum.ACCEPTANCE,
        }
        emails.push(email)
    }
    return emails
}

function ConstructBulkRejectionEmail(participants: ParticipantType[]): Email[] {
    //TODO:: add a new field in participant to indicate if the participant has been emailed or not acceptance or rejection as it won't change status
    participants = participants.filter(
        (participant) => participant.acceptanceStatus === StatusEnum.REJECTED,
    )
    const emails: Email[] = []
    //TODO:: generate emails based on template for acceptance
    for (const participant of participants) {
        const bodyOptions = emailBodyOptions[participant.firstPreference]
        const emailBody = `<p>Dear ${participant.name},</p><p>Thank you for your interest in the ${bodyOptions.title} workshop. Unfortunately, we regret to inform you that you did not pass the second stage of filtrations. The competition was tough, and we received a large number of applications. Possible reasons for your rejection could be but not limited to: overqualification, not meeting the minimum requirements, or not attending the interview.</p><p>We encourage you to continue your learning journey and re-apply to our workshops in the future.</p><p>If you have any questions, please contact us through our Facebook page. Please do not reply to this email.</p><p>Best regards,</p><p>SemiColon team</p>`
        const email: Email = {
            to: participant.email,
            subject: 'Semicolon Workshop Interview',
            html: emailBody,
            phone: participant.phone,
            type: EmailTypeEnum.REJECTION,
        }
        emails.push(email)
    }
    return emails
}
const mailFunc: {
    initial: (participants: ParticipantType[]) => Email[]
    interview: (participants: ParticipantType[]) => Email[]
    acceptance: (participants: ParticipantType[]) => Email[]
    rejection: (participants: ParticipantType[]) => Email[]
} = {
    initial: ConstructBulkInitialEmails,
    interview: ConstructBulkInterviewEmail,
    acceptance: ConstructBulkAcceptanceEmail,
    rejection: ConstructBulkRejectionEmail,
}

export default mailFunc
