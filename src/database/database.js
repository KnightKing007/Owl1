const mongoose = require('mongoose');

module.exports = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    };

    mongoose.connect(process.env.mongo_uri, options);

    mongoose.connection.once('open', () => {
        console.log('MongoDB connection successfully!');

        mongoose.connection.on('connected', () => {
            console.log('MongoDB event connected');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB event disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB event reconnected');
        });

        mongoose.connection.on('error', (error) => {
            console.log(`MongoDB Error: ${error}`);
        });
    });
};