import {Mongoose} from 'mongoose';

export interface participant {
    _id: Mongoose.types.ObjectId;
    name: string;
    email: string;
    phone: string;
    firstPreference: string;
    secondPreference: string;
    status: string;
    emailed: boolean;
}

export interface updateParticipant {
    name?: string;
    email?: string;
    phone?: string;
    firstPreference?: string;
    secondPreference?: string;
    status?: string;
    emailed?: boolean;
}