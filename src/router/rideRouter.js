'use strict';

const express = require('express')
const bodyParser = require('body-parser');

const validateRide = require('../../helpers/validateRide');
const logger = require('../../helpers/logger');
const { Errors, generateError } = require('../../constants/errors');

const router = express.Router()
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
    const db = req.db;
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    const rideValidation = validateRide({
        startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle
    })

    if (!rideValidation.isValid) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: rideValidation.errorMessage
        })
    }

    var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

    try {
        const { stmt } = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
        this.lastID = stmt.lastID;
    } catch (err) {
        logger.error(err);
        return res.send(generateError(Errors.SERVER_ERROR));
    }

    try {
        const rows = await db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID);
        res.send(rows[0]);
    } catch (err) {
        console.log('ERORR APA LAGII: ', err);
        logger.error(err);
        return res.send(generateError(Errors.SERVER_ERROR));
    }
});

router.get('/', async (req, res) => {
    const db = req.db;
    const hasQueryParams = Object.keys(req.query).length;
    if (hasQueryParams) {
        try {
            const page = Number(req.query.page);
            const pageLength = Number(req.query.page_len);
            const offset = (page - 1) * pageLength;
            if (!page || !pageLength) {
                return res.send(generateError(Errors.PAGINATION_VALIDATION_ERROR));
            }

            const rows = await db.all('SELECT * FROM Rides LIMIT $limit OFFSET $offset', { $limit: pageLength, $offset: offset });
            if (rows.length === 0) {
                return res.send(generateError(Errors.RIDES_NOT_FOUND_ERROR));
            }
            res.send(rows);
        } catch (err) {
            logger.error(err);
            return res.send(generateError(Errors.SERVER_ERROR));
        }
    } else {
        try {
            const rows = await db.all('SELECT * FROM Rides');
            if (rows.length === 0) {
                return res.send(generateError(Errors.RIDES_NOT_FOUND_ERROR));
            }
            res.send(rows);
        } catch (err) {
            logger.error(err);
            return res.send(generateError(Errors.SERVER_ERROR));
        }
    }
});

router.get('/:id', async (req, res) => {
    const db = req.db;
    try {
        const rows = await db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`);
        if (rows.length === 0) {
            return res.send(generateError(Errors.RIDES_NOT_FOUND_ERROR));
        }
        res.send(rows[0]);
    } catch (err) {
        logger.error(err);
        return res.send(generateError(Errors.SERVER_ERROR));
    }
});

module.exports = router;
