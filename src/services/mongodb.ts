import mongoose from 'mongoose';

import keys from '../config/keys';

export async function connectMONGODB(){
    try{
        await mongoose.connect(keys.DB_URL);
    } catch(err){
        console.log(err);
    }
}

export async function disconnectMONGODB(){
    try{
        await mongoose.disconnect();
    } catch(err){
        console.log(err);
    }
}

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});