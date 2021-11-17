const app = require('./app')

const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

// Handle the uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exceptions');
    process.exit(1)
})

// Setting up config file
dotenv.config({ path: 'Backend/config/config.env' })

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})