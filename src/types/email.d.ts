export interface Email {
    to: string;
    subject: string;
    html: string;
    phone: string;
}

export type EmailBodyOptions = {
    [key in PreferencesEnum]: {
        title: string;
        link: string;
        startDate: string;
        endDate: string;
    };
};
