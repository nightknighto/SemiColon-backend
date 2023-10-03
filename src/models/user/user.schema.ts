import mongoose from 'mongoose'
import UserType from '../../types/user'

export const userSchema = new mongoose.Schema<UserType>(
    {
        username: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: /^01\d{9}$/,
        },
        password: {
            type: String,
            required: true,
        },
		committee:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Committee",
			required: false,
		},
        role: {
            type: String,
            required: true,
            enum: ['admin', 'hr', 'member'],
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
)

const User = mongoose.model('User', userSchema)

export default User
