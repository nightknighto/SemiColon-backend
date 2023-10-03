import { type } from 'os'

export interface Email {
    to: string
    subject: string
    html: string
    phone: string
    type: EmailTypeEnum
}

export type EmailBodyOptions = {
    [key in PreferencesEnum]: {
        title: string
        link: string
        startDate: string
        endDate: string
    }
}
