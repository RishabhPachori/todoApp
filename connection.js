/**
 * @file connection.js
 * @summary Exposes method for connecting to mongoDB
 * */
const mongoose = require('mongoose');


let mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// const isUsernameAndPasswordExists = !!DB_USER && !!DB_PASSWORD;
// if (isUsernameAndPasswordExists) {
//     mongoOptions = { ...mongoOptions, user: DB_USER, pass: DB_PASSWORD };
// }

const DB_HOST = 'localhost'
const DB_PORT = 27017
const DB_NAME = 'todoApp'

const mongoUri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

/**
 * Method for connecting to mongoDB
*/
const connectToMongoDb = () => {
    mongoose.set('debug', true);
    mongoose.connect(mongoUri, mongoOptions);

    mongoose.connection.on('connected', () => {
        console.log('MongoDb connected on port 27017');
    });
    mongoose.connection.on('error', (err) => {
        console.log(`An error occurred. ERROR: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDb disconnected!');
    });
    return mongoose;
};

module.exports = {
    connectToMongoDb
};
