'use strict';

const express = require('express');

const healthRouter = require('./router/healthRouter');
const rideRouter = require('./router/rideRouter');

const app = express();

module.exports = (db) => {
    app.use((req, res, next) => {
        req.db = db;
        next();
    })
    app.use('/health', healthRouter);
    app.use('/rides', rideRouter);

    return app;
};
